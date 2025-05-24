"use strict";
// נקודת כניסה לזריעת בסיס הנתונים - Database Seeding Entry Point
// Academic Program Matching Platform
const { PrismaClient } = require('../../src/generated/prisma');
const { institutionsData, facultiesData, programsData, requirementsData } = require('./universities-data');
const prisma = new PrismaClient();
async function main() {
    console.log('🌱 Starting database seeding...');
    console.log('🏛️ Seeding Israeli Universities Data');
    try {
        // Clear existing data in reverse dependency order
        console.log('🧹 Cleaning existing data...');
        await prisma.programRequirement.deleteMany();
        await prisma.programMatch.deleteMany();
        await prisma.bagrutSubject.deleteMany();
        await prisma.userPreference.deleteMany();
        await prisma.academicProfile.deleteMany();
        await prisma.user.deleteMany();
        await prisma.program.deleteMany();
        await prisma.faculty.deleteMany();
        await prisma.institution.deleteMany();
        // Seed institutions
        console.log('🏛️ Seeding institutions...');
        const createdInstitutions = [];
        for (const institutionData of institutionsData) {
            const institution = await prisma.institution.create({
                data: {
                    nameHebrew: institutionData.nameHebrew,
                    nameEnglish: institutionData.nameEnglish,
                    city: institutionData.city,
                    website: institutionData.website,
                    logoUrl: institutionData.logoUrl,
                    description: institutionData.description,
                    establishedYear: institutionData.establishedYear
                }
            });
            createdInstitutions.push(institution);
        }
        console.log(`✅ Created ${createdInstitutions.length} institutions`);
        // Seed faculties
        console.log('🏫 Seeding faculties...');
        const createdFaculties = [];
        for (const facultyData of facultiesData) {
            const faculty = await prisma.faculty.create({
                data: {
                    nameHebrew: facultyData.nameHebrew,
                    nameEnglish: facultyData.nameEnglish,
                    description: facultyData.description,
                    website: facultyData.website,
                    institutionId: facultyData.institutionId
                }
            });
            createdFaculties.push(faculty);
        }
        console.log(`✅ Created ${createdFaculties.length} faculties`);
        // Seed programs
        console.log('📚 Seeding academic programs...');
        const createdPrograms = [];
        for (const programData of programsData) {
            const program = await prisma.program.create({
                data: {
                    nameHebrew: programData.nameHebrew,
                    nameEnglish: programData.nameEnglish,
                    type: programData.type,
                    degreeLevel: programData.degreeLevel,
                    description: programData.description,
                    duration: programData.duration,
                    website: programData.website,
                    isActive: programData.isActive,
                    institutionId: programData.institutionId,
                    facultyId: programData.facultyId
                }
            });
            createdPrograms.push(program);
        }
        console.log(`✅ Created ${createdPrograms.length} academic programs`);
        // Seed requirements
        console.log('📋 Seeding admission requirements...');
        const createdRequirements = [];
        for (const requirementData of requirementsData) {
            const requirement = await prisma.programRequirement.create({
                data: {
                    type: requirementData.type,
                    subjectName: requirementData.subjectName || null,
                    minScore: requirementData.minScore || null,
                    maxScore: requirementData.maxScore || null,
                    requiredLevel: requirementData.requiredLevel || null,
                    description: requirementData.description || null,
                    isRequired: requirementData.isRequired,
                    weight: requirementData.weight || null,
                    programId: requirementData.programId
                }
            });
            createdRequirements.push(requirement);
        }
        console.log(`✅ Created ${createdRequirements.length} admission requirements`);
        // Create sample test users for development
        console.log('👥 Creating sample test users...');
        const testUser1 = await prisma.user.create({
            data: {
                email: 'test.student1@example.com',
                firstName: 'אליה',
                lastName: 'כהן',
                birthYear: 2005,
                city: 'תל אביב',
                academicProfile: {
                    create: {
                        psychometricScore: 720,
                        psychometricYear: 2023,
                        bagrutAverage: 88.5,
                        bagrutYear: 2023,
                        englishLevel: '5 יחידות',
                        mathLevel: '5 יחידות',
                        bagrutSubjects: {
                            create: [
                                { subjectName: 'מתמטיקה', score: 90, units: 5 },
                                { subjectName: 'פיזיקה', score: 88, units: 5 },
                                { subjectName: 'אנגלית', score: 85, units: 5 },
                                { subjectName: 'מדעי המחשב', score: 95, units: 5 }
                            ]
                        },
                        preferences: {
                            create: {
                                preferredCity: 'תל אביב',
                                maxDistance: 50,
                                programType: 'COMPUTER_SCIENCE',
                                degreeLevel: 'BACHELOR',
                                languagePreference: 'עברית',
                                campusSize: 'גדול'
                            }
                        }
                    }
                }
            }
        });
        const testUser2 = await prisma.user.create({
            data: {
                email: 'test.student2@example.com',
                firstName: 'שרה',
                lastName: 'לוי',
                birthYear: 2005,
                city: 'ירושלים',
                academicProfile: {
                    create: {
                        psychometricScore: 650,
                        psychometricYear: 2023,
                        bagrutAverage: 82.0,
                        bagrutYear: 2023,
                        englishLevel: '4 יחידות',
                        mathLevel: '4 יחידות',
                        bagrutSubjects: {
                            create: [
                                { subjectName: 'מתמטיקה', score: 80, units: 4 },
                                { subjectName: 'ביולוגיה', score: 85, units: 5 },
                                { subjectName: 'אנגלית', score: 82, units: 4 },
                                { subjectName: 'פסיכולוגיה', score: 90, units: 5 }
                            ]
                        },
                        preferences: {
                            create: {
                                preferredCity: 'ירושלים',
                                maxDistance: 30,
                                programType: 'PSYCHOLOGY',
                                degreeLevel: 'BACHELOR',
                                languagePreference: 'עברית',
                                campusSize: 'בינוני'
                            }
                        }
                    }
                }
            }
        });
        console.log(`✅ Created 2 test users with academic profiles`);
        // Summary
        console.log('\n🎉 Database seeding completed successfully!');
        console.log('📊 Summary:');
        console.log(`   • ${createdInstitutions.length} institutions (מוסדות אקדמיים)`);
        console.log(`   • ${createdFaculties.length} faculties (פקולטטות)`);
        console.log(`   • ${createdPrograms.length} academic programs (תוכניות לימודים)`);
        console.log(`   • ${createdRequirements.length} admission requirements (דרישות קבלה)`);
        console.log(`   • 2 test users with profiles (משתמשי בדיקה)`);
        console.log('\n🌟 Israeli Universities Included:');
        institutionsData.forEach((inst) => {
            console.log(`   • ${inst.nameHebrew} (${inst.nameEnglish})`);
        });
    }
    catch (error) {
        console.error('❌ Error during seeding:', error);
        throw error;
    }
    finally {
        await prisma.$disconnect();
    }
}
main()
    .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
});
//# sourceMappingURL=index.js.map