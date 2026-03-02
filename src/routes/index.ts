import { Router } from 'express';
import warehouseRoutes from './warehouseRoutes';
import shippingChargeRoutes from './shippingChargeRoutes';

const router = Router();

// Mount routes
router.use('/warehouse', warehouseRoutes);
router.use('/shipping-charge', shippingChargeRoutes);

export default router;
