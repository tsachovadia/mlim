// בקר תוכניות לימודים - Programs Controller
// Academic Program Matching Platform

import { Request, Response } from 'express';
import { PrismaClient, ProgramType, DegreeLevel } from '@prisma/client';

const prisma = new PrismaClient();

// קבלת כל התוכניות - Get all programs
export const getAllPrograms = async (req: Request, res: Response): Promise<void> => {
  try {
    const { 
      type, 
      degreeLevel, 
      institutionId, 
      city,
      limit = 20,
      offset = 0 
    } = req.query;

    const whereClause: any = { isActive: true };
    
    if (type) whereClause.type = type as ProgramType;
    if (degreeLevel) whereClause.degreeLevel = degreeLevel as DegreeLevel;
    if (institutionId) whereClause.institutionId = institutionId as string;
    if (city) {
      whereClause.institution = {
        city: { contains: city as string }
      };
    }

    const limitInt = parseInt(limit as string);
    const offsetInt = parseInt(offset as string);

    const programs = await prisma.program.findMany({
      where: whereClause,
      include: {
        institution: {
          select: {
            id: true,
            nameHebrew: true,
            nameEnglish: true,
            city: true,
            logoUrl: true
          }
        },
        faculty: {
          select: {
            id: true,
            nameHebrew: true,
            nameEnglish: true
          }
        },
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
    });

    // Get total count for pagination
    const totalCount = await prisma.program.count({
      where: whereClause
    });

    res.json({
      success: true,
      message: 'תוכניות לימודים נטענו בהצלחה',
      messageEn: 'Programs loaded successfully',
      data: programs,
      count: programs.length,
      pagination: {
        limit: limitInt,
        offset: offsetInt,
        hasMore: offsetInt + programs.length < totalCount
      }
    });
  } catch (error) {
    console.error('Error fetching programs:', error);
    res.status(500).json({
      success: false,
      error: 'שגיאה בטעינת התוכניות',
      errorEn: 'Error loading programs',
      details: process.env.NODE_ENV === 'development' ? error : undefined
    });
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
            user: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                academicProfile: {
                  select: {
                    psychometricScore: true,
                    bagrutAverage: true
                  }
                }
              }
            }
          },
          orderBy: { confidenceLevel: 'desc' },
          take: 10
        }
      }
    });

    if (!program) {
      res.status(404).json({
        success: false,
        error: 'תוכנית לא נמצאה',
        errorEn: 'Program not found'
      });
      return;
    }

    res.json({
      success: true,
      message: 'תוכנית נטענה בהצלחה',
      messageEn: 'Program loaded successfully',
      data: program
    });
  } catch (error) {
    console.error('Error fetching program:', error);
    res.status(500).json({
      success: false,
      error: 'שגיאה בטעינת התוכנית',
      errorEn: 'Error loading program',
      details: process.env.NODE_ENV === 'development' ? error : undefined
    });
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
      limit = 20,
      offset = 0 
    } = req.query;

    const whereClause: any = { isActive: true };
    
    // חיפוש טקסט - SQLite compatible
    if (query) {
      whereClause.OR = [
        { nameHebrew: { contains: query as string } },
        { nameEnglish: { contains: query as string } },
        { description: { contains: query as string } },
        { institution: { 
          OR: [
            { nameHebrew: { contains: query as string } },
            { nameEnglish: { contains: query as string } }
          ]
        }}
      ];
    }

    // סינונים
    if (type) whereClause.type = type as ProgramType;
    if (degreeLevel) whereClause.degreeLevel = degreeLevel as DegreeLevel;
    if (city) {
      whereClause.institution = {
        ...whereClause.institution,
        city: { contains: city as string }
      };
    }

    // סינון לפי דרישות פסיכומטרי
    if (minPsychometric || maxPsychometric) {
      if (minPsychometric) {
        // User has this score, find programs where user's score is within acceptable range
        const userScore = parseInt(minPsychometric as string);
        whereClause.requirements = {
          some: {
            type: 'PSYCHOMETRIC_SCORE',
            minScore: { lte: userScore },
            maxScore: { gte: userScore }
          }
        };
      } else if (maxPsychometric) {
        // User's max score, so find programs where max requirement is >= user's score
        whereClause.requirements = {
          some: {
            type: 'PSYCHOMETRIC_SCORE',
            maxScore: { gte: parseInt(maxPsychometric as string) }
          }
        };
      }
    }

    const limitInt = parseInt(limit as string);
    const offsetInt = parseInt(offset as string);

    const programs = await prisma.program.findMany({
      where: whereClause,
      include: {
        institution: {
          select: {
            id: true,
            nameHebrew: true,
            nameEnglish: true,
            city: true,
            logoUrl: true
          }
        },
        faculty: {
          select: {
            id: true,
            nameHebrew: true,
            nameEnglish: true
          }
        },
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
    });

    // Get total count for pagination
    const totalCount = await prisma.program.count({
      where: whereClause
    });

    res.json({
      success: true,
      message: 'חיפוש הושלם בהצלחה',
      messageEn: 'Search completed successfully',
      data: programs,
      count: programs.length,
      pagination: {
        limit: limitInt,
        offset: offsetInt,
        hasMore: offsetInt + programs.length < totalCount
      }
    });
  } catch (error) {
    console.error('Error searching programs:', error);
    res.status(500).json({
      success: false,
      error: 'שגיאה בחיפוש תוכניות',
      errorEn: 'Error searching programs',
      details: process.env.NODE_ENV === 'development' ? error : undefined
    });
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

    res.json({
      success: true,
      message: 'דרישות התוכנית נטענו בהצלחה',
      messageEn: 'Program requirements loaded successfully',
      data: requirements,
      count: requirements.length
    });
  } catch (error) {
    console.error('Error fetching program requirements:', error);
    res.status(500).json({
      success: false,
      error: 'שגיאה בטעינת דרישות התוכנית',
      errorEn: 'Error loading program requirements',
      details: process.env.NODE_ENV === 'development' ? error : undefined
    });
  }
};

// סטטיסטיקות תוכניות - Program statistics
export const getProgramStats = async (req: Request, res: Response): Promise<void> => {
  try {
    const stats = await prisma.program.groupBy({
      by: ['type'],
      where: { isActive: true },
      _count: {
        id: true
      },
      orderBy: {
        type: 'asc'
      }
    });

    const institutionStats = await prisma.institution.findMany({
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
    });

    const totalPrograms = await prisma.program.count({ where: { isActive: true } });
    const totalMatches = await prisma.programMatch.count();

    res.json({
      success: true,
      message: 'סטטיסטיקות נטענו בהצלחה',
      messageEn: 'Statistics loaded successfully',
      data: {
        overview: {
          totalPrograms,
          totalMatches
        },
        programsByType: stats,
        institutionStats
      }
    });
  } catch (error) {
    console.error('Error fetching program stats:', error);
    res.status(500).json({
      success: false,
      error: 'שגיאה בטעינת הסטטיסטיקות',
      errorEn: 'Error loading statistics',
      details: process.env.NODE_ENV === 'development' ? error : undefined
    });
  }
}; 