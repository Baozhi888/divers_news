import { Router } from 'express';
import { getDrivers, createDriver, updateDriver, deleteDriver, batchDeleteDrivers } 
  from '../controllers/driverController.js';
import { auth } from '../middleware/auth.js';

const router = Router();

router.use(auth);

router.get('/', getDrivers);
router.post('/', createDriver);
router.put('/:id', updateDriver);
router.delete('/:id', deleteDriver);
router.post('/batch-delete', batchDeleteDrivers);

export default router;
