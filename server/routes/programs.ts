// נתיבי תוכניות לימודים - Programs Routes
// Academic Program Matching Platform

import express from 'express';
import {
  getAllPrograms,
  getProgramById,
  searchPrograms,
  getProgramRequirements,
  getProgramStats
} from '../controllers/programsController';

const router = express.Router();

// GET /api/v1/programs - קבלת כל התוכניות
router.get('/', getAllPrograms);

// GET /api/v1/programs/search - חיפוש תוכניות
router.get('/search', searchPrograms);

// GET /api/v1/programs/stats - סטטיסטיקות תוכניות
router.get('/stats', getProgramStats);

// GET /api/v1/programs/:id - קבלת תוכנית לפי ID
router.get('/:id', getProgramById);

// GET /api/v1/programs/:id/requirements - קבלת דרישות תוכנית
router.get('/:id/requirements', getProgramRequirements);

export default router; 