// עוזרי אימות - Validation Helpers
// Academic Program Matching Platform

export interface UserValidationResult {
  isValid: boolean;
  errors: string[];
}

export interface UserCreateData {
  email?: string;
  firstName?: string;
  lastName?: string;
  birthYear?: number;
  city?: string;
  phone?: string;
}

export interface UserUpdateData {
  firstName?: string;
  lastName?: string;
  birthYear?: number;
  city?: string;
  phone?: string;
}

// Email validation function
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Phone validation function (Israeli format)
export const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^05\d{8}$/; // Israeli mobile format
  return phoneRegex.test(phone.replace(/[-\s]/g, ''));
};

// Validate user creation data
export const validateUserCreation = (data: UserCreateData): UserValidationResult => {
  const errors: string[] = [];

  // Check required fields
  if (!data.email) {
    errors.push('Email is required');
  } else if (!isValidEmail(data.email)) {
    errors.push('Invalid email format');
  }

  if (!data.firstName) {
    errors.push('First name is required');
  }

  if (!data.lastName) {
    errors.push('Last name is required');
  }

  // Validate optional fields if provided
  if (data.birthYear && (data.birthYear < 1900 || data.birthYear > new Date().getFullYear())) {
    errors.push('Invalid birth year');
  }

  if (data.phone && !isValidPhone(data.phone)) {
    errors.push('Invalid phone format (use Israeli format: 05XXXXXXXX)');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

// Validate user update data
export const validateUserUpdate = (data: UserUpdateData): UserValidationResult => {
  const errors: string[] = [];

  // Validate optional fields if provided
  if (data.birthYear && (data.birthYear < 1900 || data.birthYear > new Date().getFullYear())) {
    errors.push('Invalid birth year');
  }

  if (data.phone && !isValidPhone(data.phone)) {
    errors.push('Invalid phone format (use Israeli format: 05XXXXXXXX)');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

// Sanitize user input for security
export const sanitizeUserInput = (data: any): any => {
  const sanitized = { ...data };
  
  // Remove potentially dangerous fields
  delete sanitized.id;
  delete sanitized.createdAt;
  delete sanitized.updatedAt;
  delete sanitized.email; // Email cannot be modified after creation
  
  // Trim string fields
  if (sanitized.firstName) sanitized.firstName = sanitized.firstName.trim();
  if (sanitized.lastName) sanitized.lastName = sanitized.lastName.trim();
  if (sanitized.city) sanitized.city = sanitized.city.trim();
  if (sanitized.phone) sanitized.phone = sanitized.phone.trim();
  
  return sanitized;
}; 