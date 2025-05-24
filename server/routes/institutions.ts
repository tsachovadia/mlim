// נתיבי מוסדות אקדמיים - Institutions Routes
// Academic Program Matching Platform

import { Router } from 'express';
import {
  getAllInstitutions,
  getInstitutionById,
  searchInstitutions,
  getInstitutionStats
} from '../controllers/institutionsController';

const router = Router();

// GET /api/v1/institutions - קבלת כל המוסדות
router.get('/', getAllInstitutions);

// GET /api/v1/institutions/search - חיפוש מוסדות
router.get('/search', searchInstitutions);

// GET /api/v1/institutions/stats - סטטיסטיקות מוסדות
router.get('/stats', getInstitutionStats);

// GET /api/v1/institutions/:id - קבלת מוסד לפי ID
router.get('/:id', getInstitutionById);

export default router; 