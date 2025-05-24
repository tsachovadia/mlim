// פלטפורמת התאמת תוכניות אקדמיות - Academic Program Matching Platform
// Main Server Entry Point

import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

// Load environment variables
dotenv.config();

// Initialize Express app
const app: Application = express();
const PORT = process.env.PORT || 3000;

// Initialize Prisma client
const prisma = new PrismaClient();

// Middleware
app.use(helmet()); // Security headers
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'],
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'ok',
    message: 'פלטפורמת התאמת תוכניות אקדמיות - Academic Program Matching Platform',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// API Routes
app.get('/api/v1', (req: Request, res: Response) => {
  res.json({
    message: 'ברוך הבא לפלטפורמת התאמת התוכניות האקדמיות',
    messageEn: 'Welcome to Academic Program Matching Platform API',
    version: '1.0.0',
    endpoints: {
      institutions: '/api/v1/institutions',
      programs: '/api/v1/programs', 
      users: '/api/v1/users',
      matching: '/api/v1/matching'
    }
  });
});

// Import route modules (will be created)
// import institutionRoutes from './routes/institutions';
// import programRoutes from './routes/programs';
// import userRoutes from './routes/users';
// import matchingRoutes from './routes/matching';

// Use route modules
// app.use('/api/v1/institutions', institutionRoutes);
// app.use('/api/v1/programs', programRoutes);
// app.use('/api/v1/users', userRoutes);
// app.use('/api/v1/matching', matchingRoutes);

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: any) => {
  console.error('Error:', err);
  res.status(500).json({
    error: 'שגיאה פנימית בשרת',
    errorEn: 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { details: err.message })
  });
});

// 404 handler
app.use('*', (req: Request, res: Response) => {
  res.status(404).json({
    error: 'נתיב לא נמצא',
    errorEn: 'Route not found',
    path: req.originalUrl
  });
});

// Database connection and server startup
async function startServer() {
  try {
    // Test database connection
    await prisma.$connect();
    console.log('✅ Connected to PostgreSQL database');
    
    // Start server
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`🏥 Health check: http://localhost:${PORT}/health`);
      console.log(`📚 API Documentation: http://localhost:${PORT}/api/v1`);
    });
  } catch (error) {
    console.error('❌ Failed to connect to database:', error);
    process.exit(1);
  }
}

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n🔄 Shutting down gracefully...');
  await prisma.$disconnect();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('\n🔄 Shutting down gracefully...');
  await prisma.$disconnect();
  process.exit(0);
});

// Start the server
startServer().catch((error) => {
  console.error('❌ Failed to start server:', error);
  process.exit(1);
});

export default app; 