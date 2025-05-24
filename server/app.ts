// Express App Configuration
// Academic Program Matching Platform

import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import institutionsRouter from './routes/institutions';
import programsRouter from './routes/programs';

const app: Application = express();

// Security middleware
app.use(helmet());
app.use(cors());

// JSON parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'פלטפורמת התאמת תוכניות אקדמיות פועלת',
    messageEn: 'Academic Program Matching Platform is running',
    timestamp: new Date().toISOString()
  });
});

// API Documentation
app.get('/api/v1', (req, res) => {
  res.json({
    name: 'פלטפורמת התאמת תוכניות אקדמיות',
    nameEn: 'Academic Program Matching Platform',
    version: '1.0.0',
    description: 'API for matching Israeli university programs',
    endpoints: {
      institutions: '/api/v1/institutions',
      programs: '/api/v1/programs',
      health: '/health'
    }
  });
});

// API Routes
app.use('/api/v1/institutions', institutionsRouter);
app.use('/api/v1/programs', programsRouter);

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Error:', err);
  res.status(500).json({
    error: 'שגיאה פנימית בשרת',
    errorEn: 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { details: err.message })
  });
});

export default app; 