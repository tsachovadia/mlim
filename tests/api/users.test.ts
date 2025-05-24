// בדיקות API למשתמשים - Users API Tests
// Academic Program Matching Platform - TDD Approach

import request from 'supertest';
import { PrismaClient } from '@prisma/client';
import app from '../../server/app';

const prisma = new PrismaClient();

describe('Users API', () => {
  beforeEach(async () => {
    // Clean database before each test
    await prisma.programMatch.deleteMany();
    await prisma.userPreference.deleteMany();
    await prisma.bagrutSubject.deleteMany();
    await prisma.academicProfile.deleteMany();
    await prisma.user.deleteMany();
    await prisma.programRequirement.deleteMany();
    await prisma.program.deleteMany();
    await prisma.faculty.deleteMany();
    await prisma.institution.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  describe('POST /api/v1/users', () => {
    it('should create a new user with valid data', async () => {
      const userData = {
        email: 'test@example.com',
        firstName: 'דוד',
        lastName: 'כהן',
        birthYear: 2000,
        city: 'תל אביב',
        phone: '0501234567'
      };

      const response = await request(app)
        .post('/api/v1/users')
        .send(userData)
        .expect(201);

      expect(response.body).toEqual({
        success: true,
        message: 'משתמש נוצר בהצלחה',
        messageEn: 'User created successfully',
        data: expect.objectContaining({
          id: expect.any(String),
          email: 'test@example.com',
          firstName: 'דוד',
          lastName: 'כהן',
          birthYear: 2000,
          city: 'תל אביב',
          phone: '0501234567',
          createdAt: expect.any(String),
          updatedAt: expect.any(String)
        })
      });
    });

    it('should create user with minimal required data only', async () => {
      const userData = {
        email: 'minimal@example.com',
        firstName: 'שרה',
        lastName: 'לוי'
      };

      const response = await request(app)
        .post('/api/v1/users')
        .send(userData)
        .expect(201);

      expect(response.body.data).toMatchObject({
        email: 'minimal@example.com',
        firstName: 'שרה',
        lastName: 'לוי',
        birthYear: null,
        city: null,
        phone: null
      });
    });

    it('should return 400 for missing required fields', async () => {
      const response = await request(app)
        .post('/api/v1/users')
        .send({
          email: 'incomplete@example.com'
          // Missing firstName and lastName
        })
        .expect(400);

      expect(response.body).toEqual({
        success: false,
        error: 'שדות חובה חסרים',
        errorEn: 'Required fields missing'
      });
    });

    it('should return 400 for invalid email format', async () => {
      const response = await request(app)
        .post('/api/v1/users')
        .send({
          email: 'invalid-email',
          firstName: 'יוסי',
          lastName: 'אברהם'
        })
        .expect(400);

      expect(response.body).toEqual({
        success: false,
        error: 'כתובת אימייל לא תקינה',
        errorEn: 'Invalid email format'
      });
    });

    it('should return 409 for duplicate email', async () => {
      // Create first user
      await prisma.user.create({
        data: {
          email: 'duplicate@example.com',
          firstName: 'ראש',
          lastName: 'ראשון'
        }
      });

      const response = await request(app)
        .post('/api/v1/users')
        .send({
          email: 'duplicate@example.com',
          firstName: 'שני',
          lastName: 'שנוי'
        })
        .expect(409);

      expect(response.body).toEqual({
        success: false,
        error: 'כתובת אימייל כבר קיימת במערכת',
        errorEn: 'Email already exists'
      });
    });
  });

  describe('GET /api/v1/users', () => {
    it('should return empty array when no users exist', async () => {
      const response = await request(app)
        .get('/api/v1/users')
        .expect(200);

      expect(response.body).toEqual({
        success: true,
        message: 'משתמשים נטענו בהצלחה',
        messageEn: 'Users loaded successfully',
        data: [],
        count: 0,
        pagination: {
          limit: 20,
          offset: 0,
          hasMore: false
        }
      });
    });

    it('should return all users with their academic profiles', async () => {
      // Create test user with academic profile
      const user = await prisma.user.create({
        data: {
          email: 'profile@example.com',
          firstName: 'מיכל',
          lastName: 'רוזן',
          city: 'חיפה'
        }
      });

      await prisma.academicProfile.create({
        data: {
          userId: user.id,
          psychometricScore: 720,
          bagrutAverage: 95.5,
          englishLevel: '5 יחידות',
          mathLevel: '5 יחידות'
        }
      });

      const response = await request(app)
        .get('/api/v1/users')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveLength(1);
      expect(response.body.data[0]).toMatchObject({
        email: 'profile@example.com',
        firstName: 'מיכל',
        lastName: 'רוזן',
        city: 'חיפה'
      });
      expect(response.body.data[0].academicProfile).toMatchObject({
        psychometricScore: 720,
        bagrutAverage: 95.5,
        englishLevel: '5 יחידות',
        mathLevel: '5 יחידות'
      });
    });

    it('should support pagination', async () => {
      // Create multiple users
      for (let i = 1; i <= 5; i++) {
        await prisma.user.create({
          data: {
            email: `user${i}@example.com`,
            firstName: `משתמש`,
            lastName: `${i}`
          }
        });
      }

      const response = await request(app)
        .get('/api/v1/users?limit=2&offset=1')
        .expect(200);

      expect(response.body.pagination).toEqual({
        limit: 2,
        offset: 1,
        hasMore: true
      });
      expect(response.body.data).toHaveLength(2);
    });

    it('should filter users by city', async () => {
      await prisma.user.createMany({
        data: [
          {
            email: 'tlv@example.com',
            firstName: 'תל',
            lastName: 'אביב',
            city: 'תל אביב'
          },
          {
            email: 'jlm@example.com',
            firstName: 'ירו',
            lastName: 'שלים',
            city: 'ירושלים'
          }
        ]
      });

      const response = await request(app)
        .get('/api/v1/users?city=תל אביב')
        .expect(200);

      expect(response.body.data).toHaveLength(1);
      expect(response.body.data[0].city).toBe('תל אביב');
    });
  });

  describe('GET /api/v1/users/:id', () => {
    it('should return 404 for non-existent user', async () => {
      const response = await request(app)
        .get('/api/v1/users/non-existent-id')
        .expect(404);

      expect(response.body).toEqual({
        success: false,
        error: 'משתמש לא נמצא',
        errorEn: 'User not found'
      });
    });

    it('should return user with complete profile and program matches', async () => {
      // Create institution and program for matching
      const institution = await prisma.institution.create({
        data: {
          nameHebrew: 'אוניברסיטת תל אביב',
          nameEnglish: 'Tel Aviv University',
          city: 'תל אביב'
        }
      });

      const faculty = await prisma.faculty.create({
        data: {
          nameHebrew: 'מדעי המחשב',
          nameEnglish: 'Computer Science',
          institutionId: institution.id
        }
      });

      const program = await prisma.program.create({
        data: {
          nameHebrew: 'מדעי המחשב',
          nameEnglish: 'Computer Science',
          type: 'COMPUTER_SCIENCE',
          degreeLevel: 'BACHELOR',
          duration: 3,
          isActive: true,
          institutionId: institution.id,
          facultyId: faculty.id
        }
      });

      // Create user with complete profile
      const user = await prisma.user.create({
        data: {
          email: 'complete@example.com',
          firstName: 'אור',
          lastName: 'כהן',
          birthYear: 1999,
          city: 'תל אביב',
          phone: '0509876543'
        }
      });

      const profile = await prisma.academicProfile.create({
        data: {
          userId: user.id,
          psychometricScore: 750,
          bagrutAverage: 92.8,
          englishLevel: '5 יחידות',
          mathLevel: '5 יחידות'
        }
      });

      // Add bagrut subjects
      await prisma.bagrutSubject.createMany({
        data: [
          {
            profileId: profile.id,
            subjectName: 'מתמטיקה',
            score: 95,
            units: 5
          },
          {
            profileId: profile.id,
            subjectName: 'אנגלית',
            score: 90,
            units: 5
          }
        ]
      });

      // Add program match
      await prisma.programMatch.create({
        data: {
          userId: user.id,
          programId: program.id,
          overallScore: 87.5,
          confidenceLevel: 'HIGH_CHANCE',
          psychometricScore: 90.0,
          bagrutScore: 85.0,
          calculatedAt: new Date()
        }
      });

      const response = await request(app)
        .get(`/api/v1/users/${user.id}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toMatchObject({
        email: 'complete@example.com',
        firstName: 'אור',
        lastName: 'כהן',
        birthYear: 1999,
        city: 'תל אביב',
        phone: '0509876543'
      });

      // Check academic profile
      expect(response.body.data.academicProfile).toMatchObject({
        psychometricScore: 750,
        bagrutAverage: 92.8,
        englishLevel: '5 יחידות',
        mathLevel: '5 יחידות'
      });

      // Check bagrut subjects
      expect(response.body.data.academicProfile.bagrutSubjects).toHaveLength(2);
      expect(response.body.data.academicProfile.bagrutSubjects[0]).toMatchObject({
        subjectName: 'מתמטיקה',
        score: 95,
        units: 5
      });

      // Check program matches
      expect(response.body.data.programMatches).toHaveLength(1);
      expect(response.body.data.programMatches[0]).toMatchObject({
        overallScore: 87.5,
        confidenceLevel: 'HIGH_CHANCE',
        program: {
          nameHebrew: 'מדעי המחשב',
          institution: {
            nameHebrew: 'אוניברסיטת תל אביב'
          }
        }
      });
    });
  });

  describe('PUT /api/v1/users/:id', () => {
    it('should update user information', async () => {
      const user = await prisma.user.create({
        data: {
          email: 'update@example.com',
          firstName: 'ישן',
          lastName: 'שם',
          city: 'חיפה'
        }
      });

      const updateData = {
        firstName: 'חדש',
        lastName: 'שם',
        city: 'תל אביב',
        phone: '0501112233'
      };

      const response = await request(app)
        .put(`/api/v1/users/${user.id}`)
        .send(updateData)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toMatchObject({
        firstName: 'חדש',
        lastName: 'שם',
        city: 'תל אביב',
        phone: '0501112233'
      });
    });

    it('should return 404 for non-existent user', async () => {
      const response = await request(app)
        .put('/api/v1/users/non-existent-id')
        .send({ firstName: 'חדש' })
        .expect(404);

      expect(response.body).toEqual({
        success: false,
        error: 'משתמש לא נמצא',
        errorEn: 'User not found'
      });
    });

    it('should prevent email modification', async () => {
      const user = await prisma.user.create({
        data: {
          email: 'original@example.com',
          firstName: 'שם',
          lastName: 'משפחה'
        }
      });

      const response = await request(app)
        .put(`/api/v1/users/${user.id}`)
        .send({
          email: 'new@example.com',
          firstName: 'שם חדש'
        })
        .expect(400);

      expect(response.body).toEqual({
        success: false,
        error: 'לא ניתן לשנות כתובת אימייל',
        errorEn: 'Email modification not allowed'
      });
    });
  });

  describe('DELETE /api/v1/users/:id', () => {
    it('should delete user and all related data', async () => {
      const user = await prisma.user.create({
        data: {
          email: 'delete@example.com',
          firstName: 'למחוק',
          lastName: 'משתמש'
        }
      });

      const response = await request(app)
        .delete(`/api/v1/users/${user.id}`)
        .expect(200);

      expect(response.body).toEqual({
        success: true,
        message: 'משתמש נמחק בהצלחה',
        messageEn: 'User deleted successfully'
      });

      // Verify user is deleted
      const deletedUser = await prisma.user.findUnique({
        where: { id: user.id }
      });
      expect(deletedUser).toBeNull();
    });

    it('should return 404 for non-existent user', async () => {
      const response = await request(app)
        .delete('/api/v1/users/non-existent-id')
        .expect(404);

      expect(response.body).toEqual({
        success: false,
        error: 'משתמש לא נמצא',
        errorEn: 'User not found'
      });
    });
  });

  describe('GET /api/v1/users/:id/matches', () => {
    it('should return user program matches with pagination', async () => {
      // Create test data
      const institution = await prisma.institution.create({
        data: {
          nameHebrew: 'אוניברסיטת תל אביב',
          nameEnglish: 'Tel Aviv University',
          city: 'תל אביב'
        }
      });

      const faculty = await prisma.faculty.create({
        data: {
          nameHebrew: 'מדעי המחשב',
          nameEnglish: 'Computer Science',
          institutionId: institution.id
        }
      });

      const program = await prisma.program.create({
        data: {
          nameHebrew: 'מדעי המחשב',
          nameEnglish: 'Computer Science',
          type: 'COMPUTER_SCIENCE',
          degreeLevel: 'BACHELOR',
          duration: 3,
          isActive: true,
          institutionId: institution.id,
          facultyId: faculty.id
        }
      });

      const user = await prisma.user.create({
        data: {
          email: 'matches@example.com',
          firstName: 'משתמש',
          lastName: 'התאמות'
        }
      });

      await prisma.programMatch.create({
        data: {
          userId: user.id,
          programId: program.id,
          overallScore: 92.5,
          confidenceLevel: 'HIGH_CHANCE',
          calculatedAt: new Date()
        }
      });

      const response = await request(app)
        .get(`/api/v1/users/${user.id}/matches`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveLength(1);
      expect(response.body.data[0]).toMatchObject({
        overallScore: 92.5,
        confidenceLevel: 'HIGH_CHANCE',
        program: {
          nameHebrew: 'מדעי המחשב',
          institution: {
            nameHebrew: 'אוניברסיטת תל אביב'
          }
        }
      });
    });

    it('should filter matches by confidence level', async () => {
      const user = await prisma.user.create({
        data: {
          email: 'filter@example.com',
          firstName: 'סינון',
          lastName: 'התאמות'
        }
      });

      const response = await request(app)
        .get(`/api/v1/users/${user.id}/matches?confidenceLevel=HIGH_CHANCE`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toEqual([]);
    });
  });
}); 