import { WarehouseService } from './warehouseService';
import { ShippingChargeService } from './shippingChargeService';
import { DeliverySpeed } from '../types';
import { cacheManager } from '../config/cache';

/**
 * Combined Shipping Service - Combines warehouse and shipping charge operations
 */
export class CombinedShippingService {
  private warehouseService: WarehouseService;
  private shippingChargeService: ShippingChargeService;

  constructor() {
    this.warehouseService = new WarehouseService();
    this.shippingChargeService = new ShippingChargeService();
  }

  /**
   * Calculate shipping charge for seller to customer
   * Finds nearest warehouse and calculates shipping cost
   * @param sellerId Seller ID
   * @param customerId Customer ID
   * @param productId Product ID
   * @param deliverySpeed Standard or Express
   * @returns Shipping charge and nearest warehouse details
   */
  async calculateShippingForSellerCustomer(
    sellerId: string,
    customerId: string,
    productId: string,
    deliverySpeed: DeliverySpeed
  ): Promise<{
    shippingCharge: number;
    nearestWarehouse: {
      warehouseId: string;
      warehouseLocation: { lat: number; long: number };
      warehouseName: string;
    };
  }> {
    // Check cache first
    const cacheKey = `combined_shipping:${sellerId}:${customerId}:${productId}:${deliverySpeed}`;
    const cached = await cacheManager.get<any>(cacheKey);
    if (cached) {
      return cached;
    }

    try {
      // Step 1: Get nearest warehouse
      const nearestWarehouse = await this.warehouseService.getNearestWarehouse(
        sellerId,
        productId
      );

      // Step 2: Calculate shipping charge
      const { shippingCharge } = await this.shippingChargeService.calculateShippingCharge(
        nearestWarehouse.warehouseId,
        customerId,
        productId,
        deliverySpeed
      );

      const result = {
        shippingCharge,
        nearestWarehouse,
      };

      // Cache the result
      await cacheManager.set(cacheKey, result, 1800); // Cache for 30 minutes

      return result;
    } catch (error) {
      // Log error and rethrow
      console.error('Error in combined shipping calculation:', error);
      throw error;
    }
  }
}
