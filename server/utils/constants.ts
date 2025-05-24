// קבועים - Constants
// Academic Program Matching Platform

// Pagination defaults
export const DEFAULT_LIMIT = 20;
export const DEFAULT_OFFSET = 0;
export const MAX_MATCHES_DISPLAY = 10;

// Messages
export const MESSAGES = {
  PROGRAMS: {
    LOADED_SUCCESS: 'תוכניות לימודים נטענו בהצלחה',
    LOADED_SUCCESS_EN: 'Programs loaded successfully',
    LOAD_ERROR: 'שגיאה בטעינת התוכניות',
    LOAD_ERROR_EN: 'Error loading programs',
    NOT_FOUND: 'תוכנית לא נמצאה',
    NOT_FOUND_EN: 'Program not found',
    SEARCH_SUCCESS: 'חיפוש הושלם בהצלחה',
    SEARCH_SUCCESS_EN: 'Search completed successfully',
    SEARCH_ERROR: 'שגיאה בחיפוש תוכניות',
    SEARCH_ERROR_EN: 'Error searching programs'
  },
  REQUIREMENTS: {
    LOADED_SUCCESS: 'דרישות התוכנית נטענו בהצלחה',
    LOADED_SUCCESS_EN: 'Program requirements loaded successfully',
    LOAD_ERROR: 'שגיאה בטעינת דרישות התוכנית',
    LOAD_ERROR_EN: 'Error loading program requirements'
  },
  STATS: {
    LOADED_SUCCESS: 'סטטיסטיקות נטענו בהצלחה',
    LOADED_SUCCESS_EN: 'Statistics loaded successfully',
    LOAD_ERROR: 'שגיאה בטעינת הסטטיסטיקות',
    LOAD_ERROR_EN: 'Error loading statistics'
  },
  USERS: {
    CREATED_SUCCESS: 'משתמש נוצר בהצלחה',
    CREATED_SUCCESS_EN: 'User created successfully',
    LOADED_SUCCESS: 'משתמשים נטענו בהצלחה',
    LOADED_SUCCESS_EN: 'Users loaded successfully',
    UPDATED_SUCCESS: 'משתמש עודכן בהצלחה',
    UPDATED_SUCCESS_EN: 'User updated successfully',
    DELETED_SUCCESS: 'משתמש נמחק בהצלחה',
    DELETED_SUCCESS_EN: 'User deleted successfully',
    NOT_FOUND: 'משתמש לא נמצא',
    NOT_FOUND_EN: 'User not found',
    LOAD_ERROR: 'שגיאה בטעינת המשתמשים',
    LOAD_ERROR_EN: 'Error loading users',
    CREATE_ERROR: 'שגיאה ביצירת המשתמש',
    CREATE_ERROR_EN: 'Error creating user',
    UPDATE_ERROR: 'שגיאה בעדכון המשתמש',
    UPDATE_ERROR_EN: 'Error updating user',
    DELETE_ERROR: 'שגיאה במחיקת המשתמש',
    DELETE_ERROR_EN: 'Error deleting user',
    VALIDATION_ERROR: 'שדות חובה חסרים',
    VALIDATION_ERROR_EN: 'Required fields missing',
    INVALID_EMAIL: 'כתובת אימייל לא תקינה',
    INVALID_EMAIL_EN: 'Invalid email format',
    EMAIL_EXISTS: 'כתובת אימייל כבר קיימת במערכת',
    EMAIL_EXISTS_EN: 'Email already exists',
    EMAIL_MODIFICATION: 'לא ניתן לשנות כתובת אימייל',
    EMAIL_MODIFICATION_EN: 'Email modification not allowed'
  },
  MATCHES: {
    LOADED_SUCCESS: 'התאמות נטענו בהצלחה',
    LOADED_SUCCESS_EN: 'Matches loaded successfully',
    LOAD_ERROR: 'שגיאה בטעינת ההתאמות',
    LOAD_ERROR_EN: 'Error loading matches'
  }
};

// Database field selections
export const INSTITUTION_SELECT = {
  id: true,
  nameHebrew: true,
  nameEnglish: true,
  city: true,
  logoUrl: true
};

export const FACULTY_SELECT = {
  id: true,
  nameHebrew: true,
  nameEnglish: true
};

export const USER_SELECT = {
  id: true,
  firstName: true,
  lastName: true,
  academicProfile: {
    select: {
      psychometricScore: true,
      bagrutAverage: true
    }
  }
};

export const PROGRAM_SELECT = {
  id: true,
  nameHebrew: true,
  nameEnglish: true,
  type: true,
  degreeLevel: true,
  duration: true,
  institution: {
    select: INSTITUTION_SELECT
  },
  faculty: {
    select: FACULTY_SELECT
  }
};

// User-specific database selections
export const USER_ACADEMIC_PROFILE_INCLUDE = {
  bagrutSubjects: {
    orderBy: [
      { subjectName: 'desc' as const },
      { score: 'desc' as const }
    ]
  },
  preferences: true
};

export const USER_PROGRAM_MATCHES_INCLUDE = {
  program: {
    select: PROGRAM_SELECT
  }
}; 