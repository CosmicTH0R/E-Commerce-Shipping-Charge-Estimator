import { Router } from 'express';
import { WarehouseController } from '../controllers/warehouseController';
import { validate, nearestWarehouseQuerySchema } from '../middleware/validation';

const router = Router();
const warehouseController = new WarehouseController();

/**
 * GET /api/v1/warehouse/nearest
 * Get nearest warehouse for a seller's product
 */
router.get(
  '/nearest',
  validate(nearestWarehouseQuerySchema, 'query'),
  warehouseController.getNearestWarehouse
);

export default router;
