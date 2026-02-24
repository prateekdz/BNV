import express from 'express';
import {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  searchUsers,
  exportUsers,
} from '../controllers/user.controller.js';

const router = express.Router();

router.post('/', createUser);
router.get('/', getAllUsers);
router.get('/search', searchUsers);
router.get('/export', exportUsers);
router.get('/:id', getUserById);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;
