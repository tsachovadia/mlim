// נתיבי משתמשים - Users Routes
// Academic Program Matching Platform

import express from 'express';
import {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  getUserMatches
} from '../controllers/usersController';

const router = express.Router();

// POST /api/v1/users - יצירת משתמש חדש
router.post('/', createUser);

// GET /api/v1/users - קבלת כל המשתמשים
router.get('/', getAllUsers);

// GET /api/v1/users/:id/matches - קבלת התאמות המשתמש (before /:id to avoid conflict)
router.get('/:id/matches', getUserMatches);

// GET /api/v1/users/:id - קבלת משתמש לפי ID
router.get('/:id', getUserById);

// PUT /api/v1/users/:id - עדכון משתמש
router.put('/:id', updateUser);

// DELETE /api/v1/users/:id - מחיקת משתמש
router.delete('/:id', deleteUser);

export default router; 