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