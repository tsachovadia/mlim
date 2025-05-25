import request from 'supertest';
import app from '../../server/app';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

describe('Academic Profiles API', () => {
  beforeEach(async () => {
    // Clean up academic profiles before each test
    await prisma.academicProfile.deleteMany({});
    
    // Ensure we have test users available
    const existingUser = await prisma.user.findFirst({
      where: { email: 'test@example.com' }
    });
    
    if (!existingUser) {
      await prisma.user.create({
        data: {
          firstName: 'Test',
          lastName: 'User',
          email: 'test@example.com',
          phone: '052-1234567',
          birthYear: 2000,
          city: 'Tel Aviv'
        }
      });
    }
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  describe('POST /api/v1/academic-profiles', () => {
    it('should create a new academic profile with valid data', async () => {
      const user = await prisma.user.findFirst({ where: { email: 'test@example.com' } });
      if (!user) throw new Error('Test user not found');
      
      const profileData = {
        userId: user.id,
        psychometricScore: 650,
        bagrutAverage: 85.5,
        academicLevel: 'BACHELOR',
        preferredStudyMode: 'FULL_TIME',
        preferredLanguage: 'HEBREW',
        targetAcademicYear: 2024
      };

      const response = await request(app)
        .post('/api/v1/academic-profiles')
        .send(profileData)
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.data.psychometricScore).toBe(650);
      expect(response.body.data.bagrutAverage).toBe(85.5);
      expect(response.body.data.academicLevel).toBe('BACHELOR');
    });

    it('should validate psychometric score range (200-800)', async () => {
      const user = await prisma.user.findFirst({ where: { email: 'test@example.com' } });
      if (!user) throw new Error('Test user not found');
      
      const invalidData = {
        userId: user.id,
        psychometricScore: 900, // Invalid - too high
        bagrutAverage: 85.5,
        academicLevel: 'BACHELOR'
      };

      const response = await request(app)
        .post('/api/v1/academic-profiles')
        .send(invalidData)
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain('psychometric');
    });

    it('should validate bagrut average range (0-100)', async () => {
      const user = await prisma.user.findFirst({ where: { email: 'test@example.com' } });
      if (!user) throw new Error('Test user not found');
      
      const invalidData = {
        userId: user.id,
        psychometricScore: 650,
        bagrutAverage: 105, // Invalid - too high
        academicLevel: 'BACHELOR'
      };

      const response = await request(app)
        .post('/api/v1/academic-profiles')
        .send(invalidData)
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain('bagrut');
    });

    it('should require valid academic level', async () => {
      const user = await prisma.user.findFirst({ where: { email: 'test@example.com' } });
      if (!user) throw new Error('Test user not found');
      
      const invalidData = {
        userId: user.id,
        psychometricScore: 650,
        bagrutAverage: 85.5,
        academicLevel: 'INVALID_LEVEL'
      };

      const response = await request(app)
        .post('/api/v1/academic-profiles')
        .send(invalidData)
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain('academic level');
    });

    it('should prevent duplicate profiles for same user', async () => {
      const user = await prisma.user.findFirst({ where: { email: 'test@example.com' } });
      if (!user) throw new Error('Test user not found');
      
      // Create first profile
      await prisma.academicProfile.create({
        data: {
          userId: user.id,
          psychometricScore: 650,
          bagrutAverage: 85.5
        }
      });

      const duplicateData = {
        userId: user.id,
        psychometricScore: 700,
        bagrutAverage: 90,
        academicLevel: 'MASTER'
      };

      const response = await request(app)
        .post('/api/v1/academic-profiles')
        .send(duplicateData)
        .expect(409);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain('already exists');
    });
  });

  describe('GET /api/v1/academic-profiles/:userId', () => {
    it('should get academic profile by user ID', async () => {
      const user = await prisma.user.findFirst({ where: { email: 'test@example.com' } });
      if (!user) throw new Error('Test user not found');
      
      // Create profile first
      await prisma.academicProfile.create({
        data: {
          userId: user.id,
          psychometricScore: 650,
          bagrutAverage: 85.5
        }
      });

      const response = await request(app)
        .get(`/api/v1/academic-profiles/${user.id}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.psychometricScore).toBe(650);
      expect(response.body.data.bagrutAverage).toBe(85.5);
      expect(response.body.data.user).toBeDefined();
      expect(response.body.data.user.firstName).toBe('Test');
    });

    it('should return 404 for non-existent user profile', async () => {
      const response = await request(app)
        .get('/api/v1/academic-profiles/99999')
        .expect(404);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain('not found');
    });

    it('should include bagrut subjects in response', async () => {
      const user = await prisma.user.findFirst({ where: { email: 'test@example.com' } });
      if (!user) throw new Error('Test user not found');
      
      const profile = await prisma.academicProfile.create({
        data: {
          userId: user.id,
          psychometricScore: 650,
          bagrutAverage: 85.5
        }
      });

      // Add some bagrut subjects
      await prisma.bagrutSubject.createMany({
        data: [
          { profileId: profile.id, subjectName: 'Mathematics', score: 90, units: 5 },
          { profileId: profile.id, subjectName: 'English', score: 85, units: 4 }
        ]
      });

      const response = await request(app)
        .get(`/api/v1/academic-profiles/${user.id}`)
        .expect(200);

      expect(response.body.data.bagrutSubjects).toBeDefined();
      expect(response.body.data.bagrutSubjects).toHaveLength(2);
      expect(response.body.data.bagrutSubjects[0].subjectName).toBe('Mathematics');
    });
  });

  describe('PUT /api/v1/academic-profiles/:id', () => {
    it('should update academic profile with valid data', async () => {
      const user = await prisma.user.findFirst({ where: { email: 'test@example.com' } });
      if (!user) throw new Error('Test user not found');
      
      const profile = await prisma.academicProfile.create({
        data: {
          userId: user.id,
          psychometricScore: 650,
          bagrutAverage: 85.5
        }
      });

      const updateData = {
        psychometricScore: 700,
        bagrutAverage: 90,
        englishLevel: '5',
        mathLevel: '5'
      };

      const response = await request(app)
        .put(`/api/v1/academic-profiles/${profile.id}`)
        .send(updateData)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.psychometricScore).toBe(700);
      expect(response.body.data.englishLevel).toBe('5');
    });

    it('should validate update data', async () => {
      const user = await prisma.user.findFirst({ where: { email: 'test@example.com' } });
      if (!user) throw new Error('Test user not found');
      
      const profile = await prisma.academicProfile.create({
        data: {
          userId: user.id,
          psychometricScore: 650,
          bagrutAverage: 85.5
        }
      });

      const invalidData = {
        psychometricScore: 150 // Invalid - too low
      };

      const response = await request(app)
        .put(`/api/v1/academic-profiles/${profile.id}`)
        .send(invalidData)
        .expect(400);

      expect(response.body.success).toBe(false);
    });

    it('should return 404 for non-existent profile', async () => {
      const updateData = {
        psychometricScore: 700
      };

      const response = await request(app)
        .put('/api/v1/academic-profiles/99999')
        .send(updateData)
        .expect(404);

      expect(response.body.success).toBe(false);
    });
  });

  describe('DELETE /api/v1/academic-profiles/:id', () => {
    it('should delete academic profile', async () => {
      const user = await prisma.user.findFirst({ where: { email: 'test@example.com' } });
      if (!user) throw new Error('Test user not found');
      
      const profile = await prisma.academicProfile.create({
        data: {
          userId: user.id,
          psychometricScore: 650,
          bagrutAverage: 85.5
        }
      });

      const response = await request(app)
        .delete(`/api/v1/academic-profiles/${profile.id}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.message).toContain('deleted');

      // Verify profile is actually deleted
      const deletedProfile = await prisma.academicProfile.findUnique({
        where: { id: profile.id }
      });
      expect(deletedProfile).toBeNull();
    });

    it('should cascade delete bagrut subjects', async () => {
      const user = await prisma.user.findFirst({ where: { email: 'test@example.com' } });
      if (!user) throw new Error('Test user not found');
      
      const profile = await prisma.academicProfile.create({
        data: {
          userId: user.id,
          psychometricScore: 650,
          bagrutAverage: 85.5
        }
      });

      // Add bagrut subjects
      await prisma.bagrutSubject.createMany({
        data: [
          { profileId: profile.id, subjectName: 'Mathematics', score: 90, units: 5 },
          { profileId: profile.id, subjectName: 'English', score: 85, units: 4 }
        ]
      });

      await request(app)
        .delete(`/api/v1/academic-profiles/${profile.id}`)
        .expect(200);

      // Verify bagrut subjects are also deleted
      const subjects = await prisma.bagrutSubject.findMany({
        where: { profileId: profile.id }
      });
      expect(subjects).toHaveLength(0);
    });

    it('should return 404 for non-existent profile', async () => {
      const response = await request(app)
        .delete('/api/v1/academic-profiles/99999')
        .expect(404);

      expect(response.body.success).toBe(false);
    });
  });

  describe('GET /api/v1/academic-profiles/:id/bagrut-subjects', () => {
    it('should get bagrut subjects for profile', async () => {
      const user = await prisma.user.findFirst({ where: { email: 'test@example.com' } });
      if (!user) throw new Error('Test user not found');
      
      const profile = await prisma.academicProfile.create({
        data: {
          userId: user.id,
          psychometricScore: 650,
          bagrutAverage: 85.5
        }
      });

      await prisma.bagrutSubject.createMany({
        data: [
          { profileId: profile.id, subjectName: 'Mathematics', score: 90, units: 5 },
          { profileId: profile.id, subjectName: 'English', score: 85, units: 4 },
          { profileId: profile.id, subjectName: 'Physics', score: 88, units: 5 }
        ]
      });

      const response = await request(app)
        .get(`/api/v1/academic-profiles/${profile.id}/bagrut-subjects`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveLength(3);
      expect(response.body.data[0].subjectName).toBe('Mathematics');
      expect(response.body.data[0].score).toBe(90);
      expect(response.body.data[0].units).toBe(5);
    });

    it('should return empty array for profile with no subjects', async () => {
      const user = await prisma.user.findFirst({ where: { email: 'test@example.com' } });
      if (!user) throw new Error('Test user not found');
      
      const profile = await prisma.academicProfile.create({
        data: {
          userId: user.id,
          psychometricScore: 650,
          bagrutAverage: 85.5
        }
      });

      const response = await request(app)
        .get(`/api/v1/academic-profiles/${profile.id}/bagrut-subjects`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveLength(0);
    });
  });

  describe('POST /api/v1/academic-profiles/:id/bagrut-subjects', () => {
    it('should add bagrut subject to profile', async () => {
      const user = await prisma.user.findFirst({ where: { email: 'test@example.com' } });
      if (!user) throw new Error('Test user not found');
      
      const profile = await prisma.academicProfile.create({
        data: {
          userId: user.id,
          psychometricScore: 650,
          bagrutAverage: 85.5
        }
      });

      const subjectData = {
        subjectName: 'Mathematics',
        score: 90,
        units: 5
      };

      const response = await request(app)
        .post(`/api/v1/academic-profiles/${profile.id}/bagrut-subjects`)
        .send(subjectData)
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.data.subjectName).toBe('Mathematics');
      expect(response.body.data.score).toBe(90);
      expect(response.body.data.units).toBe(5);
    });

    it('should validate subject score range (0-100)', async () => {
      const user = await prisma.user.findFirst({ where: { email: 'test@example.com' } });
      if (!user) throw new Error('Test user not found');
      
      const profile = await prisma.academicProfile.create({
        data: {
          userId: user.id,
          psychometricScore: 650,
          bagrutAverage: 85.5
        }
      });

      const invalidData = {
        subjectName: 'Mathematics',
        score: 105, // Invalid - too high
        units: 5
      };

      const response = await request(app)
        .post(`/api/v1/academic-profiles/${profile.id}/bagrut-subjects`)
        .send(invalidData)
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain('score');
    });

    it('should validate units range (1-5)', async () => {
      const user = await prisma.user.findFirst({ where: { email: 'test@example.com' } });
      if (!user) throw new Error('Test user not found');
      
      const profile = await prisma.academicProfile.create({
        data: {
          userId: user.id,
          psychometricScore: 650,
          bagrutAverage: 85.5
        }
      });

      const invalidData = {
        subjectName: 'Mathematics',
        score: 90,
        units: 6 // Invalid - too high
      };

      const response = await request(app)
        .post(`/api/v1/academic-profiles/${profile.id}/bagrut-subjects`)
        .send(invalidData)
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain('units');
    });

    it('should return 404 for non-existent profile', async () => {
      const subjectData = {
        subjectName: 'Mathematics',
        score: 90,
        units: 5
      };

      const response = await request(app)
        .post('/api/v1/academic-profiles/99999/bagrut-subjects')
        .send(subjectData)
        .expect(404);

      expect(response.body.success).toBe(false);
    });
  });
}); 