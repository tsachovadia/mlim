// Jest Test Setup
// Academic Program Matching Platform

import { PrismaClient } from '@prisma/client';

// Set test environment
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'test';
}

// Global test timeout
jest.setTimeout(30000);

// Mock console methods in tests to keep output clean
global.console = {
  ...console,
  log: jest.fn(),
  debug: jest.fn(),
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
}; 