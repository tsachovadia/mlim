// פלטפורמת התאמת תוכניות אקדמיות - Academic Program Matching Platform
// Main Server Entry Point

import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import app from './app';

// Load environment variables
dotenv.config();

const PORT = process.env.PORT || 3000;
const prisma = new PrismaClient();

// Database connection and server startup
async function startServer() {
  try {
    // Test database connection
    await prisma.$connect();
    console.log('✅ Connected to SQLite database');
    
    // Start server
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`🏥 Health check: http://localhost:${PORT}/health`);
      console.log(`📚 API Documentation: http://localhost:${PORT}/api/v1`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}

startServer(); 