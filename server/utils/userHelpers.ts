// עוזרי משתמשים - User Helpers
// Academic Program Matching Platform

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Build where clause for user filtering
export const buildUserWhereClause = (filters: {
  city?: string;
  email?: string;
}): any => {
  const whereClause: any = {};
  
  if (filters.city) {
    whereClause.city = { contains: filters.city };
  }
  
  if (filters.email) {
    whereClause.email = filters.email;
  }
  
  return whereClause;
};

// Build where clause for user matches filtering
export const buildUserMatchesWhereClause = (userId: string, filters: {
  confidenceLevel?: string;
}): any => {
  const whereClause: any = { userId };
  
  if (filters.confidenceLevel) {
    whereClause.confidenceLevel = filters.confidenceLevel;
  }
  
  return whereClause;
};

// Check if user exists by ID
export const checkUserExists = async (userId: string): Promise<boolean> => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true }
  });
  return !!user;
};

// Check if email already exists (excluding specific user ID)
export const checkEmailExists = async (email: string, excludeUserId?: string): Promise<boolean> => {
  console.log(`USER HELPER - checkEmailExists called with email: ${email}, excludeUserId: ${excludeUserId}`);
  const whereConditions: any = { email };
  
  if (excludeUserId) {
    whereConditions.id = { not: excludeUserId };
  }
  console.log(`USER HELPER - checkEmailExists - whereConditions:`, JSON.stringify(whereConditions));
  
  const user = await prisma.user.findFirst({ 
    where: whereConditions,
    select: { id: true }
  });
  console.log(`USER HELPER - checkEmailExists - user found:`, user ? user.id : null);
  return !!user;
};

// Get user count with filters
export const getUserCount = async (whereClause: any): Promise<number> => {
  return await prisma.user.count({ where: whereClause });
};

// Get user matches count with filters
export const getUserMatchesCount = async (whereClause: any): Promise<number> => {
  return await prisma.programMatch.count({ where: whereClause });
}; 