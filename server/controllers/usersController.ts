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
  USER_ACADEMIC_PROFILE_INCLUDE,
  USER_PROGRAM_MATCHES_INCLUDE
} from '../utils/constants';
import { 
  parsePaginationParams, 
  calculatePagination
} from '../utils/queryHelpers';
import {
  validateUserCreation,
  validateUserUpdate,
  sanitizeUserInput,
  isValidEmail
} from '../utils/validationHelpers';
import {
  buildUserWhereClause,
  buildUserMatchesWhereClause,
  checkUserExists,
  checkEmailExists,
  getUserCount,
  getUserMatchesCount
} from '../utils/userHelpers';

const prisma = new PrismaClient();

// יצירת משתמש חדש - Create new user
export const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const userData = req.body;

    // Validate input data
    const validation = validateUserCreation(userData);
    if (!validation.isValid) {
      // Check for specific validation errors
      if (validation.errors.includes('Invalid email format')) {
        sendErrorResponse(
          res,
          400,
          MESSAGES.USERS.INVALID_EMAIL,
          MESSAGES.USERS.INVALID_EMAIL_EN
        );
      } else {
        sendErrorResponse(
          res,
          400,
          MESSAGES.USERS.VALIDATION_ERROR,
          MESSAGES.USERS.VALIDATION_ERROR_EN
        );
      }
      return;
    }

    // Check if email already exists
    const emailExists = await checkEmailExists(userData.email);
    if (emailExists) {
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
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        birthYear: userData.birthYear || null,
        city: userData.city || null,
        phone: userData.phone || null
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

    const whereClause = buildUserWhereClause({ city: city as string });

    const [users, totalCount] = await Promise.all([
      prisma.user.findMany({
        where: whereClause,
        include: {
          academicProfile: {
            include: USER_ACADEMIC_PROFILE_INCLUDE
          }
        },
        orderBy: [
          { firstName: 'asc' },
          { lastName: 'asc' }
        ],
        take: limitInt,
        skip: offsetInt
      }),
      getUserCount(whereClause)
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
          include: USER_ACADEMIC_PROFILE_INCLUDE
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

    // Get program matches separately to maintain proper structure
    const programMatches = await prisma.programMatch.findMany({
      where: { userId: id },
      include: USER_PROGRAM_MATCHES_INCLUDE,
      orderBy: { overallScore: 'desc' }
    });

    const userWithMatches = {
      ...user,
      programMatches
    };

    sendSuccessResponse(
      res,
      userWithMatches,
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
    const rawUpdateData = req.body;

    // Prevent email modification
    if (rawUpdateData.email) {
      sendErrorResponse(
        res,
        400,
        MESSAGES.USERS.EMAIL_MODIFICATION,
        MESSAGES.USERS.EMAIL_MODIFICATION_EN
      );
      return;
    }

    // Check if user exists
    const userExists = await checkUserExists(id);
    if (!userExists) {
      sendNotFoundResponse(
        res,
        MESSAGES.USERS.NOT_FOUND,
        MESSAGES.USERS.NOT_FOUND_EN
      );
      return;
    }

    // Sanitize and validate update data
    const updateData = sanitizeUserInput(rawUpdateData);
    const validation = validateUserUpdate(updateData);
    
    if (!validation.isValid) {
      sendErrorResponse(
        res,
        400,
        validation.errors.join(', '),
        validation.errors.join(', ')
      );
      return;
    }

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
    const userExists = await checkUserExists(id);
    if (!userExists) {
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
    const userExists = await checkUserExists(id);
    if (!userExists) {
      sendNotFoundResponse(
        res,
        MESSAGES.USERS.NOT_FOUND,
        MESSAGES.USERS.NOT_FOUND_EN
      );
      return;
    }

    const whereClause = buildUserMatchesWhereClause(id, {
      confidenceLevel: confidenceLevel as string
    });

    const [matches, totalCount] = await Promise.all([
      prisma.programMatch.findMany({
        where: whereClause,
        include: USER_PROGRAM_MATCHES_INCLUDE,
        orderBy: { overallScore: 'desc' },
        take: limitInt,
        skip: offsetInt
      }),
      getUserMatchesCount(whereClause)
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