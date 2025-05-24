// בקר משתמשים - Users Controller
// Academic Program Matching Platform

import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { 
  sendSuccessResponse, 
  sendNotFoundResponse, 
  sendServerErrorResponse,
  sendErrorResponse
} from '../utils/responseHelpers';
import { 
  DEFAULT_LIMIT, 
  DEFAULT_OFFSET,
  MESSAGES,
  INSTITUTION_SELECT,
  FACULTY_SELECT,
  PROGRAM_SELECT
} from '../utils/constants';
import { 
  parsePaginationParams, 
  calculatePagination
} from '../utils/queryHelpers';

const prisma = new PrismaClient();

// Email validation function
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// יצירת משתמש חדש - Create new user
export const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, firstName, lastName, birthYear, city, phone } = req.body;

    // Validate required fields
    if (!email || !firstName || !lastName) {
      sendErrorResponse(
        res,
        400,
        MESSAGES.USERS.VALIDATION_ERROR,
        MESSAGES.USERS.VALIDATION_ERROR_EN
      );
      return;
    }

    // Validate email format
    if (!isValidEmail(email)) {
      sendErrorResponse(
        res,
        400,
        MESSAGES.USERS.INVALID_EMAIL,
        MESSAGES.USERS.INVALID_EMAIL_EN
      );
      return;
    }

    // Check if email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      sendErrorResponse(
        res,
        409,
        MESSAGES.USERS.EMAIL_EXISTS,
        MESSAGES.USERS.EMAIL_EXISTS_EN
      );
      return;
    }

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        firstName,
        lastName,
        birthYear: birthYear || null,
        city: city || null,
        phone: phone || null
      }
    });

    res.status(201);
    sendSuccessResponse(
      res,
      user,
      MESSAGES.USERS.CREATED_SUCCESS,
      MESSAGES.USERS.CREATED_SUCCESS_EN
    );
  } catch (error) {
    console.error('Error creating user:', error);
    sendServerErrorResponse(
      res,
      MESSAGES.USERS.CREATE_ERROR,
      MESSAGES.USERS.CREATE_ERROR_EN,
      error
    );
  }
};

// קבלת כל המשתמשים - Get all users
export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const { 
      city,
      limit = DEFAULT_LIMIT,
      offset = DEFAULT_OFFSET 
    } = req.query;

    const { limit: limitInt, offset: offsetInt } = parsePaginationParams(
      limit as string, 
      offset as string
    );

    const whereClause: any = {};
    
    if (city) {
      whereClause.city = { contains: city as string };
    }

    const [users, totalCount] = await Promise.all([
      prisma.user.findMany({
        where: whereClause,
        include: {
          academicProfile: {
            include: {
              bagrutSubjects: true,
              preferences: true
            }
          }
        },
        orderBy: [
          { firstName: 'asc' },
          { lastName: 'asc' }
        ],
        take: limitInt,
        skip: offsetInt
      }),
      prisma.user.count({ where: whereClause })
    ]);

    const pagination = calculatePagination(limitInt, offsetInt, totalCount);

    sendSuccessResponse(
      res,
      users,
      MESSAGES.USERS.LOADED_SUCCESS,
      MESSAGES.USERS.LOADED_SUCCESS_EN,
      users.length,
      pagination
    );
  } catch (error) {
    console.error('Error fetching users:', error);
    sendServerErrorResponse(
      res,
      MESSAGES.USERS.LOAD_ERROR,
      MESSAGES.USERS.LOAD_ERROR_EN,
      error
    );
  }
};

// קבלת משתמש לפי ID - Get user by ID
export const getUserById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    
    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        academicProfile: {
          include: {
            bagrutSubjects: {
              orderBy: [
                { subjectName: 'desc' }, // מתמטיקה comes before אנגלית in Hebrew alphabetical desc order
                { score: 'desc' }
              ]
            },
            preferences: true
          }
        },
        programMatches: {
          include: {
            program: {
              select: PROGRAM_SELECT
            }
          },
          orderBy: { overallScore: 'desc' }
        }
      }
    });

    if (!user) {
      sendNotFoundResponse(
        res,
        MESSAGES.USERS.NOT_FOUND,
        MESSAGES.USERS.NOT_FOUND_EN
      );
      return;
    }

    sendSuccessResponse(
      res,
      user,
      MESSAGES.USERS.LOADED_SUCCESS,
      MESSAGES.USERS.LOADED_SUCCESS_EN
    );
  } catch (error) {
    console.error('Error fetching user:', error);
    sendServerErrorResponse(
      res,
      MESSAGES.USERS.LOAD_ERROR,
      MESSAGES.USERS.LOAD_ERROR_EN,
      error
    );
  }
};

// עדכון משתמש - Update user
export const updateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Prevent email modification
    if (updateData.email) {
      sendErrorResponse(
        res,
        400,
        MESSAGES.USERS.EMAIL_MODIFICATION,
        MESSAGES.USERS.EMAIL_MODIFICATION_EN
      );
      return;
    }

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { id }
    });

    if (!existingUser) {
      sendNotFoundResponse(
        res,
        MESSAGES.USERS.NOT_FOUND,
        MESSAGES.USERS.NOT_FOUND_EN
      );
      return;
    }

    // Remove email from update data if somehow included
    delete updateData.email;
    delete updateData.id;
    delete updateData.createdAt;
    delete updateData.updatedAt;

    const updatedUser = await prisma.user.update({
      where: { id },
      data: updateData,
      include: {
        academicProfile: true
      }
    });

    sendSuccessResponse(
      res,
      updatedUser,
      MESSAGES.USERS.UPDATED_SUCCESS,
      MESSAGES.USERS.UPDATED_SUCCESS_EN
    );
  } catch (error) {
    console.error('Error updating user:', error);
    sendServerErrorResponse(
      res,
      MESSAGES.USERS.UPDATE_ERROR,
      MESSAGES.USERS.UPDATE_ERROR_EN,
      error
    );
  }
};

// מחיקת משתמש - Delete user
export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { id }
    });

    if (!existingUser) {
      sendNotFoundResponse(
        res,
        MESSAGES.USERS.NOT_FOUND,
        MESSAGES.USERS.NOT_FOUND_EN
      );
      return;
    }

    // Delete user (CASCADE will handle related data)
    await prisma.user.delete({
      where: { id }
    });

    // Send response without data field for delete operation
    res.json({
      success: true,
      message: MESSAGES.USERS.DELETED_SUCCESS,
      messageEn: MESSAGES.USERS.DELETED_SUCCESS_EN
    });
  } catch (error) {
    console.error('Error deleting user:', error);
    sendServerErrorResponse(
      res,
      MESSAGES.USERS.DELETE_ERROR,
      MESSAGES.USERS.DELETE_ERROR_EN,
      error
    );
  }
};

// קבלת התאמות המשתמש - Get user matches
export const getUserMatches = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const {
      confidenceLevel,
      limit = DEFAULT_LIMIT,
      offset = DEFAULT_OFFSET
    } = req.query;

    const { limit: limitInt, offset: offsetInt } = parsePaginationParams(
      limit as string, 
      offset as string
    );

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { id }
    });

    if (!user) {
      sendNotFoundResponse(
        res,
        MESSAGES.USERS.NOT_FOUND,
        MESSAGES.USERS.NOT_FOUND_EN
      );
      return;
    }

    const whereClause: any = { userId: id };
    
    if (confidenceLevel) {
      whereClause.confidenceLevel = confidenceLevel;
    }

    const [matches, totalCount] = await Promise.all([
      prisma.programMatch.findMany({
        where: whereClause,
        include: {
          program: {
            select: PROGRAM_SELECT
          }
        },
        orderBy: { overallScore: 'desc' },
        take: limitInt,
        skip: offsetInt
      }),
      prisma.programMatch.count({ where: whereClause })
    ]);

    const pagination = calculatePagination(limitInt, offsetInt, totalCount);

    sendSuccessResponse(
      res,
      matches,
      MESSAGES.MATCHES.LOADED_SUCCESS,
      MESSAGES.MATCHES.LOADED_SUCCESS_EN,
      matches.length,
      pagination
    );
  } catch (error) {
    console.error('Error fetching user matches:', error);
    sendServerErrorResponse(
      res,
      MESSAGES.MATCHES.LOAD_ERROR,
      MESSAGES.MATCHES.LOAD_ERROR_EN,
      error
    );
  }
}; 