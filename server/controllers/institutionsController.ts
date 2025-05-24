// בקר מוסדות אקדמיים - Institutions Controller
// Academic Program Matching Platform

import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// קבלת כל המוסדות - Get all institutions
export const getAllInstitutions = async (req: Request, res: Response): Promise<void> => {
  try {
    const institutions = await prisma.institution.findMany({
      include: {
        faculties: {
          include: {
            programs: {
              where: { isActive: true },
              select: {
                id: true,
                nameHebrew: true,
                nameEnglish: true,
                type: true,
                degreeLevel: true
              }
            }
          }
        },
        _count: {
          select: {
            programs: { where: { isActive: true } },
            faculties: true
          }
        }
      },
      orderBy: {
        nameHebrew: 'asc'
      }
    });

    res.json({
      success: true,
      message: 'מוסדות אקדמיים נטענו בהצלחה',
      messageEn: 'Institutions loaded successfully',
      data: institutions,
      count: institutions.length
    });
  } catch (error) {
    console.error('Error fetching institutions:', error);
    res.status(500).json({
      success: false,
      error: 'שגיאה בטעינת המוסדות',
      errorEn: 'Error loading institutions',
      details: process.env.NODE_ENV === 'development' ? error : undefined
    });
  }
};

// קבלת מוסד לפי ID - Get institution by ID
export const getInstitutionById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    
    const institution = await prisma.institution.findUnique({
      where: { id },
      include: {
        faculties: {
          include: {
            programs: {
              where: { isActive: true },
              include: {
                requirements: true,
                _count: {
                  select: { matches: true }
                }
              }
            }
          }
        }
      }
    });

    if (!institution) {
      res.status(404).json({
        success: false,
        error: 'מוסד לא נמצא',
        errorEn: 'Institution not found'
      });
      return;
    }

    res.json({
      success: true,
      message: 'מוסד נטען בהצלחה',
      messageEn: 'Institution loaded successfully',
      data: institution
    });
  } catch (error) {
    console.error('Error fetching institution:', error);
    res.status(500).json({
      success: false,
      error: 'שגיאה בטעינת המוסד',
      errorEn: 'Error loading institution',
      details: process.env.NODE_ENV === 'development' ? error : undefined
    });
  }
};

// חיפוש מוסדות - Search institutions
export const searchInstitutions = async (req: Request, res: Response): Promise<void> => {
  try {
    const { 
      query, 
      city, 
      programType, 
      degreeLevel,
      limit = 10,
      offset = 0 
    } = req.query;

    const whereClause: any = {};
    
    // חיפוש טקסט בשם המוסד - SQLite compatible
    if (query) {
      whereClause.OR = [
        { nameHebrew: { contains: query as string } },
        { nameEnglish: { contains: query as string } },
        { description: { contains: query as string } }
      ];
    }

    // סינון לפי עיר - SQLite compatible
    if (city) {
      whereClause.city = { contains: city as string };
    }

    // סינון לפי תוכניות זמינות
    if (programType || degreeLevel) {
      const programFilter: any = { isActive: true };
      if (programType) programFilter.type = programType as string;
      if (degreeLevel) programFilter.degreeLevel = degreeLevel as string;
      
      whereClause.programs = {
        some: programFilter
      };
    }

    const programWhereFilter: any = { isActive: true };
    if (programType) programWhereFilter.type = programType as string;
    if (degreeLevel) programWhereFilter.degreeLevel = degreeLevel as string;

    const limitInt = parseInt(limit as string);
    const offsetInt = parseInt(offset as string);

    const institutions = await prisma.institution.findMany({
      where: whereClause,
      include: {
        faculties: {
          include: {
            programs: {
              where: programWhereFilter,
              select: {
                id: true,
                nameHebrew: true,
                nameEnglish: true,
                type: true,
                degreeLevel: true
              }
            }
          }
        },
        _count: {
          select: {
            programs: { 
              where: programWhereFilter
            }
          }
        }
      },
      orderBy: {
        nameHebrew: 'asc'
      },
      take: limitInt,
      skip: offsetInt
    });

    // Get total count for pagination
    const totalCount = await prisma.institution.count({
      where: whereClause
    });

    res.json({
      success: true,
      message: 'חיפוש הושלם בהצלחה',
      messageEn: 'Search completed successfully',
      data: institutions,
      count: institutions.length,
      pagination: {
        limit: limitInt,
        offset: offsetInt,
        hasMore: offsetInt + institutions.length < totalCount
      }
    });
  } catch (error) {
    console.error('Error searching institutions:', error);
    res.status(500).json({
      success: false,
      error: 'שגיאה בחיפוש מוסדות',
      errorEn: 'Error searching institutions',
      details: process.env.NODE_ENV === 'development' ? error : undefined
    });
  }
};

// סטטיסטיקות מוסדות - Institution statistics
export const getInstitutionStats = async (req: Request, res: Response): Promise<void> => {
  try {
    const stats = await prisma.institution.findMany({
      select: {
        id: true,
        nameHebrew: true,
        nameEnglish: true,
        city: true,
        _count: {
          select: {
            faculties: true,
            programs: { where: { isActive: true } }
          }
        }
      },
      orderBy: {
        nameHebrew: 'asc'
      }
    });

    const totalInstitutions = stats.length;
    const totalPrograms = stats.reduce((sum, inst) => sum + inst._count.programs, 0);
    const totalFaculties = stats.reduce((sum, inst) => sum + inst._count.faculties, 0);
    
    const citiesCount = stats.reduce((acc, inst) => {
      acc[inst.city] = (acc[inst.city] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    res.json({
      success: true,
      message: 'סטטיסטיקות נטענו בהצלחה',
      messageEn: 'Statistics loaded successfully',
      data: {
        overview: {
          totalInstitutions,
          totalPrograms,
          totalFaculties,
          citiesCount
        },
        institutions: stats
      }
    });
  } catch (error) {
    console.error('Error fetching institution stats:', error);
    res.status(500).json({
      success: false,
      error: 'שגיאה בטעינת הסטטיסטיקות',
      errorEn: 'Error loading statistics',
      details: process.env.NODE_ENV === 'development' ? error : undefined
    });
  }
}; 