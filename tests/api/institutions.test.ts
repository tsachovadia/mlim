// בדיקות API למוסדות אקדמיים - Institutions API Tests
// Academic Program Matching Platform - TDD Approach

import request from 'supertest';
import { PrismaClient } from '@prisma/client';
import app from '../../server/app'; // We'll need to create this

const prisma = new PrismaClient();

describe('Institutions API', () => {
  beforeEach(async () => {
    // Clean database before each test
    await prisma.programRequirement.deleteMany();
    await prisma.programMatch.deleteMany();
    await prisma.bagrutSubject.deleteMany();
    await prisma.userPreference.deleteMany();
    await prisma.academicProfile.deleteMany();
    await prisma.user.deleteMany();
    await prisma.program.deleteMany();
    await prisma.faculty.deleteMany();
    await prisma.institution.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  describe('GET /api/v1/institutions', () => {
    it('should return empty array when no institutions exist', async () => {
      const response = await request(app)
        .get('/api/v1/institutions')
        .expect(200);

      expect(response.body).toEqual({
        success: true,
        message: 'מוסדות אקדמיים נטענו בהצלחה',
        messageEn: 'Institutions loaded successfully',
        data: [],
        count: 0
      });
    });

    it('should return all institutions with their faculties and programs', async () => {
      // Seed test data
      const institution = await prisma.institution.create({
        data: {
          nameHebrew: 'אוניברסיטת תל אביב',
          nameEnglish: 'Tel Aviv University',
          city: 'תל אביב',
          website: 'https://www.tau.ac.il',
          description: 'האוניברסיטה הגדולה והמגוונת ביותר בישראל',
          establishedYear: 1956
        }
      });

      const faculty = await prisma.faculty.create({
        data: {
          nameHebrew: 'בית הספר למדעי המחשב',
          nameEnglish: 'School of Computer Science',
          institutionId: institution.id,
          description: 'בית ספר מוביל למדעי המחשב'
        }
      });

      const program = await prisma.program.create({
        data: {
          nameHebrew: 'תואר ראשון במדעי המחשב',
          nameEnglish: 'Bachelor of Computer Science',
          type: 'COMPUTER_SCIENCE',
          degreeLevel: 'BACHELOR',
          duration: 3,
          isActive: true,
          institutionId: institution.id,
          facultyId: faculty.id
        }
      });

      const response = await request(app)
        .get('/api/v1/institutions')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.count).toBe(1);
      expect(response.body.data).toHaveLength(1);
      expect(response.body.data[0]).toMatchObject({
        nameHebrew: 'אוניברסיטת תל אביב',
        nameEnglish: 'Tel Aviv University',
        city: 'תל אביב'
      });
      expect(response.body.data[0].faculties).toHaveLength(1);
      expect(response.body.data[0].faculties[0].programs).toHaveLength(1);
    });

    it('should order institutions by Hebrew name', async () => {
      await prisma.institution.createMany({
        data: [
          {
            nameHebrew: 'ג - אוניברסיטת בן גוריון',
            nameEnglish: 'Ben-Gurion University',
            city: 'באר שבע'
          },
          {
            nameHebrew: 'א - אוניברסיטת תל אביב',
            nameEnglish: 'Tel Aviv University',
            city: 'תל אביב'
          },
          {
            nameHebrew: 'ב - האוניברסיטה העברית',
            nameEnglish: 'Hebrew University',
            city: 'ירושלים'
          }
        ]
      });

      const response = await request(app)
        .get('/api/v1/institutions')
        .expect(200);

      expect(response.body.data[0].nameHebrew).toBe('א - אוניברסיטת תל אביב');
      expect(response.body.data[1].nameHebrew).toBe('ב - האוניברסיטה העברית');
      expect(response.body.data[2].nameHebrew).toBe('ג - אוניברסיטת בן גוריון');
    });
  });

  describe('GET /api/v1/institutions/:id', () => {
    it('should return 404 for non-existent institution', async () => {
      const response = await request(app)
        .get('/api/v1/institutions/non-existent-id')
        .expect(404);

      expect(response.body).toEqual({
        success: false,
        error: 'מוסד לא נמצא',
        errorEn: 'Institution not found'
      });
    });

    it('should return institution with full details including programs and requirements', async () => {
      const institution = await prisma.institution.create({
        data: {
          nameHebrew: 'אוניברסיטת תל אביב',
          nameEnglish: 'Tel Aviv University',
          city: 'תל אביב',
          website: 'https://www.tau.ac.il'
        }
      });

      const faculty = await prisma.faculty.create({
        data: {
          nameHebrew: 'בית הספר למדעי המחשב',
          nameEnglish: 'School of Computer Science',
          institutionId: institution.id
        }
      });

      const program = await prisma.program.create({
        data: {
          nameHebrew: 'תואר ראשון במדעי המחשב',
          nameEnglish: 'Bachelor of Computer Science',
          type: 'COMPUTER_SCIENCE',
          degreeLevel: 'BACHELOR',
          duration: 3,
          isActive: true,
          institutionId: institution.id,
          facultyId: faculty.id
        }
      });

      const requirement = await prisma.programRequirement.create({
        data: {
          type: 'PSYCHOMETRIC_SCORE',
          minScore: 700,
          isRequired: true,
          programId: program.id
        }
      });

      const response = await request(app)
        .get(`/api/v1/institutions/${institution.id}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toMatchObject({
        nameHebrew: 'אוניברסיטת תל אביב',
        nameEnglish: 'Tel Aviv University'
      });
      expect(response.body.data.faculties[0].programs[0].requirements).toHaveLength(1);
    });
  });

  describe('GET /api/v1/institutions/search', () => {
    beforeEach(async () => {
      // Create test institutions
      const tau = await prisma.institution.create({
        data: {
          nameHebrew: 'אוניברסיטת תל אביב',
          nameEnglish: 'Tel Aviv University',
          city: 'תל אביב',
          description: 'מוסד מחקר מוביל'
        }
      });

      const huji = await prisma.institution.create({
        data: {
          nameHebrew: 'האוניברסיטה העברית',
          nameEnglish: 'Hebrew University',
          city: 'ירושלים',
          description: 'המוסד הראשון בישראל'
        }
      });

      // Create faculty and program for filtering tests
      const faculty = await prisma.faculty.create({
        data: {
          nameHebrew: 'מדעי המחשב',
          nameEnglish: 'Computer Science',
          institutionId: tau.id
        }
      });

      await prisma.program.create({
        data: {
          nameHebrew: 'מדעי המחשב',
          nameEnglish: 'Computer Science',
          type: 'COMPUTER_SCIENCE',
          degreeLevel: 'BACHELOR',
          duration: 3,
          isActive: true,
          institutionId: tau.id,
          facultyId: faculty.id
        }
      });
    });

    it('should search institutions by Hebrew name', async () => {
      const response = await request(app)
        .get('/api/v1/institutions/search?query=תל אביב')
        .expect(200);

      expect(response.body.data).toHaveLength(1);
      expect(response.body.data[0].nameHebrew).toBe('אוניברסיטת תל אביב');
    });

    it('should search institutions by English name', async () => {
      const response = await request(app)
        .get('/api/v1/institutions/search?query=Hebrew')
        .expect(200);

      expect(response.body.data).toHaveLength(1);
      expect(response.body.data[0].nameEnglish).toBe('Hebrew University');
    });

    it('should filter institutions by city', async () => {
      const response = await request(app)
        .get('/api/v1/institutions/search?city=ירושלים')
        .expect(200);

      expect(response.body.data).toHaveLength(1);
      expect(response.body.data[0].city).toBe('ירושלים');
    });

    it('should filter institutions by program type', async () => {
      const response = await request(app)
        .get('/api/v1/institutions/search?programType=COMPUTER_SCIENCE')
        .expect(200);

      expect(response.body.data).toHaveLength(1);
      expect(response.body.data[0].nameHebrew).toBe('אוניברסיטת תל אביב');
    });

    it('should support pagination', async () => {
      const response = await request(app)
        .get('/api/v1/institutions/search?limit=1&offset=1')
        .expect(200);

      expect(response.body.pagination).toEqual({
        limit: 1,
        offset: 1,
        hasMore: false
      });
    });
  });

  describe('GET /api/v1/institutions/stats', () => {
    it('should return institution statistics', async () => {
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

      await prisma.program.create({
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

      const response = await request(app)
        .get('/api/v1/institutions/stats')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.overview).toEqual({
        totalInstitutions: 1,
        totalPrograms: 1,
        totalFaculties: 1,
        citiesCount: { 'תל אביב': 1 }
      });
    });
  });
}); 