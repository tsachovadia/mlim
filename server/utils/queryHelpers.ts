// עוזרי שאילתות - Query Helpers
// Academic Program Matching Platform

import { ProgramType, DegreeLevel } from '@prisma/client';

export interface ProgramFilters {
  type?: string;
  degreeLevel?: string;
  institutionId?: string;
  city?: string;
  query?: string;
  minPsychometric?: string;
  maxPsychometric?: string;
  minBagrut?: string;
  maxBagrut?: string;
}

export interface PaginationParams {
  limit: number;
  offset: number;
}

export const parsePaginationParams = (
  limit?: string | number,
  offset?: string | number
): PaginationParams => {
  const limitInt = typeof limit === 'string' ? parseInt(limit) : (limit || 20);
  const offsetInt = typeof offset === 'string' ? parseInt(offset) : (offset || 0);
  
  return {
    limit: Math.max(1, Math.min(100, limitInt)), // Limit between 1-100
    offset: Math.max(0, offsetInt)
  };
};

export const buildProgramWhereClause = (filters: ProgramFilters): any => {
  const whereClause: any = { isActive: true };
  
  // Basic filters
  if (filters.type) {
    whereClause.type = filters.type as ProgramType;
  }
  
  if (filters.degreeLevel) {
    whereClause.degreeLevel = filters.degreeLevel as DegreeLevel;
  }
  
  if (filters.institutionId) {
    whereClause.institutionId = filters.institutionId;
  }
  
  // City filter
  if (filters.city) {
    whereClause.institution = {
      ...whereClause.institution,
      city: { contains: filters.city }
    };
  }
  
  // Text search
  if (filters.query) {
    whereClause.OR = [
      { nameHebrew: { contains: filters.query } },
      { nameEnglish: { contains: filters.query } },
      { description: { contains: filters.query } },
      { 
        institution: { 
          OR: [
            { nameHebrew: { contains: filters.query } },
            { nameEnglish: { contains: filters.query } }
          ]
        }
      }
    ];
  }
  
  // Psychometric score filtering
  if (filters.minPsychometric) {
    const userScore = parseInt(filters.minPsychometric);
    whereClause.requirements = {
      some: {
        type: 'PSYCHOMETRIC_SCORE',
        minScore: { lte: userScore },
        maxScore: { gte: userScore }
      }
    };
  } else if (filters.maxPsychometric) {
    whereClause.requirements = {
      some: {
        type: 'PSYCHOMETRIC_SCORE',
        maxScore: { gte: parseInt(filters.maxPsychometric) }
      }
    };
  }
  
  return whereClause;
};

export const calculatePagination = (
  limit: number,
  offset: number,
  totalCount: number
): { limit: number; offset: number; hasMore: boolean } => {
  return {
    limit,
    offset,
    hasMore: offset + limit < totalCount
  };
}; 