import express from 'express';
import {
  createAcademicProfile,
  getAcademicProfileByUserId,
  updateAcademicProfile,
  deleteAcademicProfile,
  getBagrutSubjects,
  addBagrutSubject
} from '../controllers/academicProfilesController';

const router = express.Router();

// Academic Profile CRUD operations
router.post('/', createAcademicProfile);
router.get('/:userId', getAcademicProfileByUserId);
router.put('/:id', updateAcademicProfile);
router.delete('/:id', deleteAcademicProfile);

// Bagrut Subjects management
router.get('/:id/bagrut-subjects', getBagrutSubjects);
router.post('/:id/bagrut-subjects', addBagrutSubject);

export default router; 