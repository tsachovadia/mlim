// בקר תוכניות לימודים - Programs Controller
// Academic Program Matching Platform

import { Request, Response } from 'express';
import { PrismaClient, ProgramType, DegreeLevel } from '@prisma/client';
import { 
  sendSuccessResponse, 
  sendNotFoundResponse, 
  sendServerErrorResponse 
} from '../utils/responseHelpers';
import { 
  DEFAULT_LIMIT, 
  DEFAULT_OFFSET, 
  MAX_MATCHES_DISPLAY,
  MESSAGES,
  INSTITUTION_SELECT,
  FACULTY_SELECT,
  USER_SELECT
} from '../utils/constants';
import { 
  buildProgramWhereClause, 
  parsePaginationParams, 
  calculatePagination,
  ProgramFilters 
} from '../utils/queryHelpers';

const prisma = new PrismaClient();

// קבלת כל התוכניות - Get all programs
export const getAllPrograms = async (req: Request, res: Response): Promise<void> => {
  try {
    const { 
      type, 
      degreeLevel, 
      institutionId, 
      city,
      limit = DEFAULT_LIMIT,
      offset = DEFAULT_OFFSET 
    } = req.query;

    const filters: ProgramFilters = {
      type: type as string,
      degreeLevel: degreeLevel as string,
      institutionId: institutionId as string,
      city: city as string
    };

    const { limit: limitInt, offset: offsetInt } = parsePaginationParams(
      limit as string, 
      offset as string
    );

    const whereClause = buildProgramWhereClause(filters);

    const [programs, totalCount] = await Promise.all([
      prisma.program.findMany({
        where: whereClause,
        include: {
          institution: { select: INSTITUTION_SELECT },
          faculty: { select: FACULTY_SELECT },
          requirements: {
            orderBy: { isRequired: 'desc' }
          },
          _count: {
            select: { matches: true }
          }
        },
        orderBy: [
          { institution: { nameHebrew: 'asc' } },
          { nameHebrew: 'asc' }
        ],
        take: limitInt,
        skip: offsetInt
      }),
      prisma.program.count({ where: whereClause })
    ]);

    const pagination = calculatePagination(limitInt, offsetInt, totalCount);

    sendSuccessResponse(
      res,
      programs,
      MESSAGES.PROGRAMS.LOADED_SUCCESS,
      MESSAGES.PROGRAMS.LOADED_SUCCESS_EN,
      programs.length,
      pagination
    );
  } catch (error) {
    console.error('Error fetching programs:', error);
    sendServerErrorResponse(
      res,
      MESSAGES.PROGRAMS.LOAD_ERROR,
      MESSAGES.PROGRAMS.LOAD_ERROR_EN,
      error
    );
  }
};

// קבלת תוכנית לפי ID - Get program by ID
export const getProgramById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    
    const program = await prisma.program.findUnique({
      where: { id },
      include: {
        institution: true,
        faculty: true,
        requirements: {
          orderBy: [
            { isRequired: 'desc' },
            { type: 'asc' }
          ]
        },
        matches: {
          include: {
            user: { select: USER_SELECT }
          },
          orderBy: { confidenceLevel: 'desc' },
          take: MAX_MATCHES_DISPLAY
        }
      }
    });

    if (!program) {
      sendNotFoundResponse(
        res,
        MESSAGES.PROGRAMS.NOT_FOUND,
        MESSAGES.PROGRAMS.NOT_FOUND_EN
      );
      return;
    }

    sendSuccessResponse(
      res,
      program,
      MESSAGES.PROGRAMS.LOADED_SUCCESS,
      MESSAGES.PROGRAMS.LOADED_SUCCESS_EN
    );
  } catch (error) {
    console.error('Error fetching program:', error);
    sendServerErrorResponse(
      res,
      MESSAGES.PROGRAMS.LOAD_ERROR,
      MESSAGES.PROGRAMS.LOAD_ERROR_EN,
      error
    );
  }
};

// חיפוש תוכניות - Search programs
export const searchPrograms = async (req: Request, res: Response): Promise<void> => {
  try {
    const { 
      query, 
      type, 
      degreeLevel, 
      city,
      minPsychometric,
      maxPsychometric,
      minBagrut,
      maxBagrut,
      limit = DEFAULT_LIMIT,
      offset = DEFAULT_OFFSET 
    } = req.query;

    const filters: ProgramFilters = {
      query: query as string,
      type: type as string,
      degreeLevel: degreeLevel as string,
      city: city as string,
      minPsychometric: minPsychometric as string,
      maxPsychometric: maxPsychometric as string,
      minBagrut: minBagrut as string,
      maxBagrut: maxBagrut as string
    };

    const { limit: limitInt, offset: offsetInt } = parsePaginationParams(
      limit as string, 
      offset as string
    );

    const whereClause = buildProgramWhereClause(filters);

    const [programs, totalCount] = await Promise.all([
      prisma.program.findMany({
        where: whereClause,
        include: {
          institution: { select: INSTITUTION_SELECT },
          faculty: { select: FACULTY_SELECT },
          requirements: {
            where: {
              OR: [
                { type: 'PSYCHOMETRIC_SCORE' },
                { type: 'BAGRUT_AVERAGE' }
              ]
            },
            orderBy: { isRequired: 'desc' }
          },
          _count: {
            select: { matches: true }
          }
        },
        orderBy: [
          { institution: { nameHebrew: 'asc' } },
          { nameHebrew: 'asc' }
        ],
        take: limitInt,
        skip: offsetInt
      }),
      prisma.program.count({ where: whereClause })
    ]);

    const pagination = calculatePagination(limitInt, offsetInt, totalCount);

    sendSuccessResponse(
      res,
      programs,
      MESSAGES.PROGRAMS.SEARCH_SUCCESS,
      MESSAGES.PROGRAMS.SEARCH_SUCCESS_EN,
      programs.length,
      pagination
    );
  } catch (error) {
    console.error('Error searching programs:', error);
    sendServerErrorResponse(
      res,
      MESSAGES.PROGRAMS.SEARCH_ERROR,
      MESSAGES.PROGRAMS.SEARCH_ERROR_EN,
      error
    );
  }
};

// קבלת דרישות תוכנית - Get program requirements
export const getProgramRequirements = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    
    const requirements = await prisma.programRequirement.findMany({
      where: { programId: id },
      include: {
        program: {
          select: {
            id: true,
            nameHebrew: true,
            nameEnglish: true,
            institution: {
              select: {
                nameHebrew: true,
                nameEnglish: true
              }
            }
          }
        }
      },
      orderBy: [
        { isRequired: 'desc' },
        { type: 'asc' }
      ]
    });

    sendSuccessResponse(
      res,
      requirements,
      MESSAGES.REQUIREMENTS.LOADED_SUCCESS,
      MESSAGES.REQUIREMENTS.LOADED_SUCCESS_EN,
      requirements.length
    );
  } catch (error) {
    console.error('Error fetching program requirements:', error);
    sendServerErrorResponse(
      res,
      MESSAGES.REQUIREMENTS.LOAD_ERROR,
      MESSAGES.REQUIREMENTS.LOAD_ERROR_EN,
      error
    );
  }
};

// סטטיסטיקות תוכניות - Program statistics
export const getProgramStats = async (req: Request, res: Response): Promise<void> => {
  try {
    const [stats, institutionStats, totalPrograms, totalMatches] = await Promise.all([
      prisma.program.groupBy({
        by: ['type'],
        where: { isActive: true },
        _count: {
          id: true
        },
        orderBy: {
          type: 'asc'
        }
      }),
      prisma.institution.findMany({
        select: {
          id: true,
          nameHebrew: true,
          city: true,
          _count: {
            select: {
              programs: { where: { isActive: true } }
            }
          }
        },
        orderBy: {
          nameHebrew: 'asc'
        }
      }),
      prisma.program.count({ where: { isActive: true } }),
      prisma.programMatch.count()
    ]);

    const statsData = {
      overview: {
        totalPrograms,
        totalMatches
      },
      programsByType: stats,
      institutionStats
    };

    sendSuccessResponse(
      res,
      statsData,
      MESSAGES.STATS.LOADED_SUCCESS,
      MESSAGES.STATS.LOADED_SUCCESS_EN
    );
  } catch (error) {
    console.error('Error fetching program stats:', error);
    sendServerErrorResponse(
      res,
      MESSAGES.STATS.LOAD_ERROR,
      MESSAGES.STATS.LOAD_ERROR_EN,
      error
    );
  }
}; 