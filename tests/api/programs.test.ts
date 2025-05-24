// בדיקות API לתוכניות לימודים - Programs API Tests
// Academic Program Matching Platform - TDD Approach

import request from 'supertest';
import { PrismaClient } from '@prisma/client';
import app from '../../server/app';

const prisma = new PrismaClient();

describe('Programs API', () => {
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

  describe('GET /api/v1/programs', () => {
    it('should return empty array when no programs exist', async () => {
      const response = await request(app)
        .get('/api/v1/programs')
        .expect(200);

      expect(response.body).toEqual({
        success: true,
        message: 'תוכניות לימודים נטענו בהצלחה',
        messageEn: 'Programs loaded successfully',
        data: [],
        count: 0,
        pagination: {
          limit: 20,
          offset: 0,
          hasMore: false
        }
      });
    });

    it('should return all programs with institution and faculty details', async () => {
      // Seed test data
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
        .get('/api/v1/programs')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.count).toBe(1);
      expect(response.body.data).toHaveLength(1);
      expect(response.body.data[0]).toMatchObject({
        nameHebrew: 'תואר ראשון במדעי המחשב',
        nameEnglish: 'Bachelor of Computer Science',
        type: 'COMPUTER_SCIENCE',
        degreeLevel: 'BACHELOR'
      });
      expect(response.body.data[0].institution).toMatchObject({
        nameHebrew: 'אוניברסיטת תל אביב',
        city: 'תל אביב'
      });
      expect(response.body.data[0].faculty).toMatchObject({
        nameHebrew: 'בית הספר למדעי המחשב'
      });
      expect(response.body.data[0].requirements).toHaveLength(1);
    });

    it('should filter programs by type', async () => {
      const institution = await prisma.institution.create({
        data: {
          nameHebrew: 'אוניברסיטת תל אביב',
          nameEnglish: 'Tel Aviv University',
          city: 'תל אביב'
        }
      });

      const faculty = await prisma.faculty.create({
        data: {
          nameHebrew: 'פקולטה',
          nameEnglish: 'Faculty',
          institutionId: institution.id
        }
      });

      await prisma.program.createMany({
        data: [
          {
            nameHebrew: 'מדעי המחשב',
            nameEnglish: 'Computer Science',
            type: 'COMPUTER_SCIENCE',
            degreeLevel: 'BACHELOR',
            duration: 3,
            isActive: true,
            institutionId: institution.id,
            facultyId: faculty.id
          },
          {
            nameHebrew: 'פסיכולוגיה',
            nameEnglish: 'Psychology',
            type: 'PSYCHOLOGY',
            degreeLevel: 'BACHELOR',
            duration: 3,
            isActive: true,
            institutionId: institution.id,
            facultyId: faculty.id
          }
        ]
      });

      const response = await request(app)
        .get('/api/v1/programs?type=COMPUTER_SCIENCE')
        .expect(200);

      expect(response.body.data).toHaveLength(1);
      expect(response.body.data[0].type).toBe('COMPUTER_SCIENCE');
    });

    it('should filter programs by degree level', async () => {
      const institution = await prisma.institution.create({
        data: {
          nameHebrew: 'אוניברסיטת תל אביב',
          nameEnglish: 'Tel Aviv University',
          city: 'תל אביב'
        }
      });

      const faculty = await prisma.faculty.create({
        data: {
          nameHebrew: 'פקולטה',
          nameEnglish: 'Faculty',
          institutionId: institution.id
        }
      });

      await prisma.program.createMany({
        data: [
          {
            nameHebrew: 'תואר ראשון',
            nameEnglish: 'Bachelor',
            type: 'COMPUTER_SCIENCE',
            degreeLevel: 'BACHELOR',
            duration: 3,
            isActive: true,
            institutionId: institution.id,
            facultyId: faculty.id
          },
          {
            nameHebrew: 'תואר שני',
            nameEnglish: 'Master',
            type: 'COMPUTER_SCIENCE',
            degreeLevel: 'MASTER',
            duration: 2,
            isActive: true,
            institutionId: institution.id,
            facultyId: faculty.id
          }
        ]
      });

      const response = await request(app)
        .get('/api/v1/programs?degreeLevel=MASTER')
        .expect(200);

      expect(response.body.data).toHaveLength(1);
      expect(response.body.data[0].degreeLevel).toBe('MASTER');
    });

    it('should support pagination', async () => {
      const institution = await prisma.institution.create({
        data: {
          nameHebrew: 'אוניברסיטת תל אביב',
          nameEnglish: 'Tel Aviv University',
          city: 'תל אביב'
        }
      });

      const faculty = await prisma.faculty.create({
        data: {
          nameHebrew: 'פקולטה',
          nameEnglish: 'Faculty',
          institutionId: institution.id
        }
      });

      // Create multiple programs
      for (let i = 1; i <= 5; i++) {
        await prisma.program.create({
          data: {
            nameHebrew: `תוכנית ${i}`,
            nameEnglish: `Program ${i}`,
            type: 'COMPUTER_SCIENCE',
            degreeLevel: 'BACHELOR',
            duration: 3,
            isActive: true,
            institutionId: institution.id,
            facultyId: faculty.id
          }
        });
      }

      const response = await request(app)
        .get('/api/v1/programs?limit=2&offset=1')
        .expect(200);

      expect(response.body.pagination).toEqual({
        limit: 2,
        offset: 1,
        hasMore: true
      });
      expect(response.body.data).toHaveLength(2);
    });
  });

  describe('GET /api/v1/programs/:id', () => {
    it('should return 404 for non-existent program', async () => {
      const response = await request(app)
        .get('/api/v1/programs/non-existent-id')
        .expect(404);

      expect(response.body).toEqual({
        success: false,
        error: 'תוכנית לא נמצאה',
        errorEn: 'Program not found'
      });
    });

    it('should return program with full details including requirements and matches', async () => {
      const institution = await prisma.institution.create({
        data: {
          nameHebrew: 'אוניברסיטת תל אביב',
          nameEnglish: 'Tel Aviv University',
          city: 'תל אביב'
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
          description: 'תוכנית מובילה במדעי המחשב',
          isActive: true,
          institutionId: institution.id,
          facultyId: faculty.id
        }
      });

      const requirement = await prisma.programRequirement.create({
        data: {
          type: 'PSYCHOMETRIC_SCORE',
          minScore: 700,
          maxScore: 800,
          isRequired: true,
          description: 'ציון פסיכומטרי מינימלי',
          programId: program.id
        }
      });

      const response = await request(app)
        .get(`/api/v1/programs/${program.id}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toMatchObject({
        nameHebrew: 'תואר ראשון במדעי המחשב',
        nameEnglish: 'Bachelor of Computer Science',
        type: 'COMPUTER_SCIENCE',
        degreeLevel: 'BACHELOR',
        description: 'תוכנית מובילה במדעי המחשב'
      });
      expect(response.body.data.institution).toMatchObject({
        nameHebrew: 'אוניברסיטת תל אביב'
      });
      expect(response.body.data.faculty).toMatchObject({
        nameHebrew: 'בית הספר למדעי המחשב'
      });
      expect(response.body.data.requirements).toHaveLength(1);
      expect(response.body.data.requirements[0]).toMatchObject({
        type: 'PSYCHOMETRIC_SCORE',
        minScore: 700,
        maxScore: 800,
        isRequired: true
      });
    });
  });

  describe('GET /api/v1/programs/search', () => {
    beforeEach(async () => {
      // Create test data for search
      const tau = await prisma.institution.create({
        data: {
          nameHebrew: 'אוניברסיטת תל אביב',
          nameEnglish: 'Tel Aviv University',
          city: 'תל אביב'
        }
      });

      const huji = await prisma.institution.create({
        data: {
          nameHebrew: 'האוניברסיטה העברית',
          nameEnglish: 'Hebrew University',
          city: 'ירושלים'
        }
      });

      const csFaculty = await prisma.faculty.create({
        data: {
          nameHebrew: 'מדעי המחשב',
          nameEnglish: 'Computer Science',
          institutionId: tau.id
        }
      });

      const psychFaculty = await prisma.faculty.create({
        data: {
          nameHebrew: 'פסיכולוגיה',
          nameEnglish: 'Psychology',
          institutionId: huji.id
        }
      });

      await prisma.program.create({
        data: {
          nameHebrew: 'מדעי המחשב תל אביב',
          nameEnglish: 'Computer Science Tel Aviv',
          type: 'COMPUTER_SCIENCE',
          degreeLevel: 'BACHELOR',
          duration: 3,
          description: 'תוכנית מדעי המחשב מובילה',
          isActive: true,
          institutionId: tau.id,
          facultyId: csFaculty.id
        }
      });

      await prisma.program.create({
        data: {
          nameHebrew: 'פסיכולוגיה ירושלים',
          nameEnglish: 'Psychology Jerusalem',
          type: 'PSYCHOLOGY',
          degreeLevel: 'BACHELOR',
          duration: 3,
          description: 'תוכנית פסיכולוגיה מובילה',
          isActive: true,
          institutionId: huji.id,
          facultyId: psychFaculty.id
        }
      });
    });

    it('should search programs by Hebrew name', async () => {
      const response = await request(app)
        .get('/api/v1/programs/search?query=מדעי המחשב')
        .expect(200);

      expect(response.body.data).toHaveLength(1);
      expect(response.body.data[0].nameHebrew).toBe('מדעי המחשב תל אביב');
    });

    it('should search programs by English name', async () => {
      const response = await request(app)
        .get('/api/v1/programs/search?query=Psychology')
        .expect(200);

      expect(response.body.data).toHaveLength(1);
      expect(response.body.data[0].nameEnglish).toBe('Psychology Jerusalem');
    });

    it('should search programs by institution name', async () => {
      const response = await request(app)
        .get('/api/v1/programs/search?query=תל אביב')
        .expect(200);

      expect(response.body.data).toHaveLength(1);
      expect(response.body.data[0].institution.nameHebrew).toBe('אוניברסיטת תל אביב');
    });

    it('should filter programs by city', async () => {
      const response = await request(app)
        .get('/api/v1/programs/search?city=ירושלים')
        .expect(200);

      expect(response.body.data).toHaveLength(1);
      expect(response.body.data[0].institution.city).toBe('ירושלים');
    });

    it('should filter programs by psychometric score range', async () => {
      // Add requirements first
      const programs = await prisma.program.findMany();
      
      await prisma.programRequirement.create({
        data: {
          type: 'PSYCHOMETRIC_SCORE',
          minScore: 650,
          maxScore: 750,
          isRequired: true,
          programId: programs[0].id
        }
      });

      await prisma.programRequirement.create({
        data: {
          type: 'PSYCHOMETRIC_SCORE',
          minScore: 600,
          maxScore: 700,
          isRequired: true,
          programId: programs[1].id
        }
      });

      const response = await request(app)
        .get('/api/v1/programs/search?minPsychometric=680')
        .expect(200);

      expect(response.body.data).toHaveLength(1);
      expect(response.body.data[0].requirements[0].minScore).toBeLessThanOrEqual(680);
    });
  });

  describe('GET /api/v1/programs/:id/requirements', () => {
    it('should return program requirements', async () => {
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

      await prisma.programRequirement.createMany({
        data: [
          {
            type: 'PSYCHOMETRIC_SCORE',
            minScore: 700,
            isRequired: true,
            description: 'ציון פסיכומטרי מינימלי',
            programId: program.id
          },
          {
            type: 'BAGRUT_AVERAGE',
            minScore: 85,
            isRequired: true,
            description: 'ממוצע בגרות מינימלי',
            programId: program.id
          },
          {
            type: 'BAGRUT_SUBJECT',
            subjectName: 'מתמטיקה',
            minScore: 90,
            requiredLevel: '5 יחידות',
            isRequired: true,
            programId: program.id
          }
        ]
      });

      const response = await request(app)
        .get(`/api/v1/programs/${program.id}/requirements`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveLength(3);
      expect(response.body.data[0].program).toMatchObject({
        nameHebrew: 'מדעי המחשב',
        institution: {
          nameHebrew: 'אוניברסיטת תל אביב'
        }
      });
      
      // Check that required requirements come first
      expect(response.body.data.every((req: any) => req.isRequired)).toBe(true);
      
      // Check requirement types
      const types = response.body.data.map((req: any) => req.type);
      expect(types).toContain('PSYCHOMETRIC_SCORE');
      expect(types).toContain('BAGRUT_AVERAGE');
      expect(types).toContain('BAGRUT_SUBJECT');
    });
  });

  describe('GET /api/v1/programs/stats', () => {
    it('should return program statistics', async () => {
      const institution = await prisma.institution.create({
        data: {
          nameHebrew: 'אוניברסיטת תל אביב',
          nameEnglish: 'Tel Aviv University',
          city: 'תל אביב'
        }
      });

      const faculty = await prisma.faculty.create({
        data: {
          nameHebrew: 'פקולטה',
          nameEnglish: 'Faculty',
          institutionId: institution.id
        }
      });

      await prisma.program.createMany({
        data: [
          {
            nameHebrew: 'מדעי המחשב בוקר',
            nameEnglish: 'Computer Science Morning',
            type: 'COMPUTER_SCIENCE',
            degreeLevel: 'BACHELOR',
            duration: 3,
            isActive: true,
            institutionId: institution.id,
            facultyId: faculty.id
          },
          {
            nameHebrew: 'מדעי המחשב ערב',
            nameEnglish: 'Computer Science Evening',
            type: 'COMPUTER_SCIENCE',
            degreeLevel: 'MASTER',
            duration: 2,
            isActive: true,
            institutionId: institution.id,
            facultyId: faculty.id
          },
          {
            nameHebrew: 'פסיכולוגיה',
            nameEnglish: 'Psychology',
            type: 'PSYCHOLOGY',
            degreeLevel: 'BACHELOR',
            duration: 3,
            isActive: true,
            institutionId: institution.id,
            facultyId: faculty.id
          }
        ]
      });

      const response = await request(app)
        .get('/api/v1/programs/stats')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.overview.totalPrograms).toBe(3);
      expect(response.body.data.programsByType).toHaveLength(2); // CS and Psychology
      expect(response.body.data.institutionStats).toHaveLength(1);
      
      // Check grouping by type and degree level
      const csPrograms = response.body.data.programsByType.find(
        (stat: any) => stat.type === 'COMPUTER_SCIENCE'
      );
      expect(csPrograms._count.id).toBe(2);
    });
  });
}); 