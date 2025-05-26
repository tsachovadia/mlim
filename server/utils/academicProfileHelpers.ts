// עוזרי פרופיל אקדמי - Academic Profile Helpers
// Academic Program Matching Platform

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Database query builders for Academic Profiles
export const checkAcademicProfileExists = async (profileId: string): Promise<boolean> => {
  const profile = await prisma.academicProfile.findUnique({
    where: { id: profileId }
  });
  return !!profile;
};

export const checkUserHasProfile = async (userId: string): Promise<boolean> => {
  const profile = await prisma.academicProfile.findUnique({
    where: { userId: userId }
  });
  return !!profile;
};

export const getAcademicProfileWithIncludes = async (userId: string) => {
  return await prisma.academicProfile.findUnique({
    where: { userId: userId },
    include: {
      user: {
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          birthYear: true,
          city: true,
          phone: true
        }
      },
      bagrutSubjects: {
        orderBy: { createdAt: 'asc' }
      }
    }
  });
};

export const createAcademicProfileWithData = async (profileData: any) => {
  return await prisma.academicProfile.create({
    data: {
      userId: profileData.userId,
      psychometricScore: profileData.psychometricScore,
      bagrutAverage: profileData.bagrutAverage,
      psychometricYear: profileData.psychometricYear,
      bagrutYear: profileData.bagrutYear,
      englishLevel: profileData.englishLevel,
      mathLevel: profileData.mathLevel
    },
    include: {
      user: true,
      bagrutSubjects: true
    }
  });
};

export const updateAcademicProfileWithData = async (profileId: string, updateData: any) => {
  return await prisma.academicProfile.update({
    where: { id: profileId },
    data: {
      psychometricScore: updateData.psychometricScore,
      bagrutAverage: updateData.bagrutAverage,
      psychometricYear: updateData.psychometricYear,
      bagrutYear: updateData.bagrutYear,
      englishLevel: updateData.englishLevel,
      mathLevel: updateData.mathLevel
    },
    include: {
      user: true,
      bagrutSubjects: true
    }
  });
};

export const getBagrutSubjectsForProfile = async (profileId: string) => {
  return await prisma.bagrutSubject.findMany({
    where: { profileId: profileId },
    orderBy: { createdAt: 'asc' }
  });
};

export const createBagrutSubjectForProfile = async (profileId: string, subjectData: any) => {
  return await prisma.bagrutSubject.create({
    data: {
      profileId: profileId,
      subjectName: subjectData.subjectName,
      score: subjectData.score,
      units: subjectData.units
    }
  });
}; 