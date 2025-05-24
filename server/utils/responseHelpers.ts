// עוזרי תגובות API - API Response Helpers
// Academic Program Matching Platform

import { Response } from 'express';

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  messageEn?: string;
  data?: T;
  count?: number;
  pagination?: {
    limit: number;
    offset: number;
    hasMore: boolean;
  };
  error?: string;
  errorEn?: string;
  details?: any;
}

export const sendSuccessResponse = <T>(
  res: Response,
  data: T,
  message: string,
  messageEn: string,
  count?: number,
  pagination?: { limit: number; offset: number; hasMore: boolean }
): void => {
  const response: ApiResponse<T> = {
    success: true,
    message,
    messageEn,
    data,
    ...(count !== undefined && { count }),
    ...(pagination && { pagination })
  };
  
  res.json(response);
};

export const sendErrorResponse = (
  res: Response,
  statusCode: number,
  error: string,
  errorEn: string,
  details?: any
): void => {
  const response: ApiResponse = {
    success: false,
    error,
    errorEn,
    ...(process.env.NODE_ENV === 'development' && details && { details })
  };
  
  res.status(statusCode).json(response);
};

export const sendNotFoundResponse = (
  res: Response,
  error: string = 'לא נמצא',
  errorEn: string = 'Not found'
): void => {
  sendErrorResponse(res, 404, error, errorEn);
};

export const sendServerErrorResponse = (
  res: Response,
  error: string,
  errorEn: string,
  details?: any
): void => {
  sendErrorResponse(res, 500, error, errorEn, details);
}; 