import express from 'express';
import {
  getVehicles,
  createVehicle,
  updateVehicle,
  deleteVehicle,
  getVehicleById
} from '../controllers/vehicle.controller.js';
import { verifyToken, isAdmin } from '../middleware/verifyToken.js';

const router = express.Router();

router.get('/', verifyToken, getVehicles);
router.get('/:id', verifyToken, getVehicleById);
router.post('/', verifyToken, isAdmin, createVehicle);
router.put('/:id', verifyToken, isAdmin, updateVehicle);
router.delete('/:id', verifyToken, isAdmin, deleteVehicle);

export default router;
