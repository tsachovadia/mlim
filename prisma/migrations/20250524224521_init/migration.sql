-- CreateTable
CREATE TABLE "institutions" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name_hebrew" TEXT NOT NULL,
    "name_english" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "website" TEXT,
    "logo_url" TEXT,
    "description" TEXT,
    "established_year" INTEGER,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "faculties" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name_hebrew" TEXT NOT NULL,
    "name_english" TEXT NOT NULL,
    "description" TEXT,
    "website" TEXT,
    "institution_id" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "faculties_institution_id_fkey" FOREIGN KEY ("institution_id") REFERENCES "institutions" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "programs" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name_hebrew" TEXT NOT NULL,
    "name_english" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "degree_level" TEXT NOT NULL,
    "description" TEXT,
    "duration" INTEGER NOT NULL,
    "website" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "institution_id" TEXT NOT NULL,
    "faculty_id" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "programs_institution_id_fkey" FOREIGN KEY ("institution_id") REFERENCES "institutions" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "programs_faculty_id_fkey" FOREIGN KEY ("faculty_id") REFERENCES "faculties" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "program_requirements" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "type" TEXT NOT NULL,
    "subject_name" TEXT,
    "min_score" REAL,
    "max_score" REAL,
    "required_level" TEXT,
    "description" TEXT,
    "is_required" BOOLEAN NOT NULL DEFAULT true,
    "weight" REAL,
    "program_id" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "program_requirements_program_id_fkey" FOREIGN KEY ("program_id") REFERENCES "programs" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "birth_year" INTEGER,
    "city" TEXT,
    "phone" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "academic_profiles" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "user_id" TEXT NOT NULL,
    "psychometric_score" INTEGER,
    "psychometric_year" INTEGER,
    "bagrut_average" REAL,
    "bagrut_year" INTEGER,
    "english_level" TEXT,
    "math_level" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "academic_profiles_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "bagrut_subjects" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "profile_id" TEXT NOT NULL,
    "subject_name" TEXT NOT NULL,
    "score" INTEGER NOT NULL,
    "units" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "bagrut_subjects_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "academic_profiles" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "user_preferences" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "profile_id" TEXT NOT NULL,
    "preferred_city" TEXT,
    "max_distance" INTEGER,
    "program_type" TEXT,
    "degree_level" TEXT,
    "language_preference" TEXT,
    "campus_size" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "user_preferences_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "academic_profiles" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "program_matches" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "user_id" TEXT NOT NULL,
    "program_id" TEXT NOT NULL,
    "overall_score" REAL NOT NULL,
    "confidence_level" TEXT NOT NULL,
    "psychometric_subscore" REAL,
    "bagrut_subscore" REAL,
    "subject_subscore" REAL,
    "preference_subscore" REAL,
    "missing_requirements" TEXT,
    "recommendations" TEXT,
    "calculated_at" DATETIME NOT NULL,
    CONSTRAINT "program_matches_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "program_matches_program_id_fkey" FOREIGN KEY ("program_id") REFERENCES "programs" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "academic_profiles_user_id_key" ON "academic_profiles"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "program_matches_user_id_program_id_key" ON "program_matches"("user_id", "program_id");
