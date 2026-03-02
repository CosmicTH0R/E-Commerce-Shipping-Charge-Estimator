import { Router } from 'express';
import { ShippingChargeController } from '../controllers/shippingChargeController';
import {
  validate,
  shippingChargeQuerySchema,
  calculateShippingBodySchema,
} from '../middleware/validation';

const router = Router();
const shippingChargeController = new ShippingChargeController();

/**
 * GET /api/v1/shipping-charge
 * Calculate shipping charge from warehouse to customer
 */
router.get(
  '/',
  validate(shippingChargeQuerySchema, 'query'),
  shippingChargeController.getShippingCharge
);

/**
 * POST /api/v1/shipping-charge/calculate
 * Calculate shipping charge for seller to customer (combined)
 */
router.post(
  '/calculate',
  validate(calculateShippingBodySchema, 'body'),
  shippingChargeController.calculateShipping
);

export default router;
