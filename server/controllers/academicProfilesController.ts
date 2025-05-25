import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { MESSAGES } from '../utils/constants';

const prisma = new PrismaClient();

// Simple response helpers for this controller
const createSuccessResponse = (data: any, message?: string) => ({
  success: true,
  data,
  message: message || 'Operation successful'
});

const createErrorResponse = (message: string) => ({
  success: false,
  message
});

// Validation helper for academic profile data
const validateAcademicProfileData = (data: any) => {
  const errors = [];

  // Validate psychometric score
  if (data.psychometricScore !== undefined) {
    if (typeof data.psychometricScore !== 'number' || 
        data.psychometricScore < 200 || 
        data.psychometricScore > 800) {
      errors.push('Psychometric score must be between 200 and 800');
    }
  }

  // Validate bagrut average
  if (data.bagrutAverage !== undefined) {
    if (typeof data.bagrutAverage !== 'number' || 
        data.bagrutAverage < 0 || 
        data.bagrutAverage > 100) {
      errors.push('Bagrut average must be between 0 and 100');
    }
  }

  return errors;
};

// Validation helper for bagrut subject data
const validateBagrutSubjectData = (data: any) => {
  const errors = [];

  // Validate score
  if (data.score !== undefined) {
    if (typeof data.score !== 'number' || data.score < 0 || data.score > 100) {
      errors.push('Subject score must be between 0 and 100');
    }
  }

  // Validate units
  if (data.units !== undefined) {
    if (typeof data.units !== 'number' || data.units < 1 || data.units > 5) {
      errors.push('Units must be between 1 and 5');
    }
  }

  // Validate subject name
  if (!data.subjectName || typeof data.subjectName !== 'string') {
    errors.push('Subject name is required');
  }

  return errors;
};

// Create Academic Profile
export const createAcademicProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const profileData = req.body;

    // Validate required userId
    if (!profileData.userId) {
      res.status(400).json(
        createErrorResponse('User ID is required')
      );
      return;
    }

    // Validate profile data
    const validationErrors = validateAcademicProfileData(profileData);
    if (validationErrors.length > 0) {
      res.status(400).json(
        createErrorResponse(validationErrors.join(', '))
      );
      return;
    }

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { id: profileData.userId }
    });

    if (!user) {
      res.status(404).json(
        createErrorResponse('User not found')
      );
      return;
    }

    // Check if profile already exists for this user
    const existingProfile = await prisma.academicProfile.findUnique({
      where: { userId: profileData.userId }
    });

    if (existingProfile) {
      res.status(409).json(
        createErrorResponse('Academic profile already exists for this user')
      );
      return;
    }

    // Create the academic profile
    const academicProfile = await prisma.academicProfile.create({
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

    res.status(201).json(
      createSuccessResponse(academicProfile, 'Academic profile created successfully')
    );

  } catch (error) {
    console.error('Error creating academic profile:', error);
    res.status(500).json(
      createErrorResponse('Internal server error')
    );
  }
};

// Get Academic Profile by User ID
export const getAcademicProfileByUserId = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.params;

    const academicProfile = await prisma.academicProfile.findUnique({
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

    if (!academicProfile) {
      res.status(404).json(
        createErrorResponse('Academic profile not found')
      );
      return;
    }

    res.status(200).json(
      createSuccessResponse(academicProfile, 'Academic profile retrieved successfully')
    );

  } catch (error) {
    console.error('Error fetching academic profile:', error);
    res.status(500).json(
      createErrorResponse('Internal server error')
    );
  }
};

// Update Academic Profile
export const updateAcademicProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Validate update data
    const validationErrors = validateAcademicProfileData(updateData);
    if (validationErrors.length > 0) {
      res.status(400).json(
        createErrorResponse(validationErrors.join(', '))
      );
      return;
    }

    // Check if profile exists
    const existingProfile = await prisma.academicProfile.findUnique({
      where: { id: id }
    });

    if (!existingProfile) {
      res.status(404).json(
        createErrorResponse('Academic profile not found')
      );
      return;
    }

    // Update the profile
    const updatedProfile = await prisma.academicProfile.update({
      where: { id: id },
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

    res.status(200).json(
      createSuccessResponse(updatedProfile, 'Academic profile updated successfully')
    );

  } catch (error) {
    console.error('Error updating academic profile:', error);
    res.status(500).json(
      createErrorResponse('Internal server error')
    );
  }
};

// Delete Academic Profile
export const deleteAcademicProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    // Check if profile exists
    const existingProfile = await prisma.academicProfile.findUnique({
      where: { id: id }
    });

    if (!existingProfile) {
      res.status(404).json(
        createErrorResponse('Academic profile not found')
      );
      return;
    }

    // Delete the profile (cascades to bagrut subjects)
    await prisma.academicProfile.delete({
      where: { id: id }
    });

    res.status(200).json(
      createSuccessResponse(null, 'Academic profile deleted successfully')
    );

  } catch (error) {
    console.error('Error deleting academic profile:', error);
    res.status(500).json(
      createErrorResponse('Internal server error')
    );
  }
};

// Get Bagrut Subjects for Profile
export const getBagrutSubjects = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    // Check if profile exists
    const profile = await prisma.academicProfile.findUnique({
      where: { id: id }
    });

    if (!profile) {
      res.status(404).json(
        createErrorResponse('Academic profile not found')
      );
      return;
    }

    const bagrutSubjects = await prisma.bagrutSubject.findMany({
      where: { profileId: id },
      orderBy: { createdAt: 'asc' }
    });

    res.status(200).json(
      createSuccessResponse(bagrutSubjects, 'Bagrut subjects retrieved successfully')
    );

  } catch (error) {
    console.error('Error fetching bagrut subjects:', error);
    res.status(500).json(
      createErrorResponse('Internal server error')
    );
  }
};

// Add Bagrut Subject to Profile
export const addBagrutSubject = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const subjectData = req.body;

    // Validate subject data
    const validationErrors = validateBagrutSubjectData(subjectData);
    if (validationErrors.length > 0) {
      res.status(400).json(
        createErrorResponse(validationErrors.join(', '))
      );
      return;
    }

    // Check if profile exists
    const profile = await prisma.academicProfile.findUnique({
      where: { id: id }
    });

    if (!profile) {
      res.status(404).json(
        createErrorResponse('Academic profile not found')
      );
      return;
    }

    // Create the bagrut subject
    const bagrutSubject = await prisma.bagrutSubject.create({
      data: {
        profileId: id,
        subjectName: subjectData.subjectName,
        score: subjectData.score,
        units: subjectData.units
      }
    });

    res.status(201).json(
      createSuccessResponse(bagrutSubject, 'Bagrut subject added successfully')
    );

  } catch (error) {
    console.error('Error adding bagrut subject:', error);
    res.status(500).json(
      createErrorResponse('Internal server error')
    );
  }
}; 