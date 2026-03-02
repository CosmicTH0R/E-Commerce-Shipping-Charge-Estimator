import { Request, Response, NextFunction } from 'express';
import { ShippingChargeService } from '../services/shippingChargeService';
import { CombinedShippingService } from '../services/combinedShippingService';
import { DeliverySpeed } from '../types';

/**
 * Shipping Charge Controller - Handles shipping charge API requests
 */
export class ShippingChargeController {
  private shippingChargeService: ShippingChargeService;
  private combinedShippingService: CombinedShippingService;

  constructor() {
    this.shippingChargeService = new ShippingChargeService();
    this.combinedShippingService = new CombinedShippingService();
  }

  /**
   * GET /api/v1/shipping-charge
   * Calculate shipping charge from warehouse to customer
   */
  getShippingCharge = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { warehouseId, customerId, productId, deliverySpeed } = req.query as {
        warehouseId: string;
        customerId: string;
        productId: string;
        deliverySpeed: DeliverySpeed;
      };

      const result = await this.shippingChargeService.calculateShippingCharge(
        warehouseId,
        customerId,
        productId,
        deliverySpeed
      );

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };

  /**
   * POST /api/v1/shipping-charge/calculate
   * Calculate shipping charge for seller to customer (combined operation)
   */
  calculateShipping = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { sellerId, customerId, productId, deliverySpeed } = req.body;

      const result = await this.combinedShippingService.calculateShippingForSellerCustomer(
        sellerId,
        customerId,
        productId,
        deliverySpeed
      );

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };
}
