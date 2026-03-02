import { Request, Response, NextFunction } from 'express';
import { WarehouseService } from '../services/warehouseService';

/**
 * Warehouse Controller - Handles warehouse-related API requests
 */
export class WarehouseController {
  private warehouseService: WarehouseService;

  constructor() {
    this.warehouseService = new WarehouseService();
  }

  /**
   * GET /api/v1/warehouse/nearest
   * Get nearest warehouse for a seller's product
   */
  getNearestWarehouse = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { sellerId, productId } = req.query as {
        sellerId: string;
        productId: string;
      };

      const result = await this.warehouseService.getNearestWarehouse(
        sellerId,
        productId
      );

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };
}
