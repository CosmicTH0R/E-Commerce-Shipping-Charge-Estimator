import { WarehouseRepository } from '../repositories/warehouseRepository';
import { CustomerRepository } from '../repositories/customerRepository';
import { ProductRepository } from '../repositories/productRepository';
import { ShippingCalculator } from './shippingCalculator';
import { DeliverySpeed } from '../types';
import { calculateDistance } from '../utils/distance';
import { cacheManager } from '../config/cache';

/**
 * Shipping Charge Service - Business logic for shipping calculations
 */
export class ShippingChargeService {
  private warehouseRepo: WarehouseRepository;
  private customerRepo: CustomerRepository;
  private productRepo: ProductRepository;

  constructor() {
    this.warehouseRepo = new WarehouseRepository();
    this.customerRepo = new CustomerRepository();
    this.productRepo = new ProductRepository();
  }

  /**
   * Calculate shipping charge from warehouse to customer
   * @param warehouseId Warehouse ID
   * @param customerId Customer ID
   * @param productId Product ID (to get weight)
   * @param deliverySpeed Standard or Express
   * @returns Shipping charge
   */
  async calculateShippingCharge(
    warehouseId: string,
    customerId: string,
    productId: string,
    deliverySpeed: DeliverySpeed
  ): Promise<{ shippingCharge: number }> {
    // Check cache first
    const cacheKey = `shipping_charge:${warehouseId}:${customerId}:${productId}:${deliverySpeed}`;
    const cached = await cacheManager.get<any>(cacheKey);
    if (cached) {
      return cached;
    }

    // Fetch warehouse and customer locations
    const warehouse = await this.warehouseRepo.findById(warehouseId);
    const customer = await this.customerRepo.findById(customerId);
    const product = await this.productRepo.findById(productId);

    // Calculate distance
    const distance = calculateDistance(
      { latitude: warehouse.latitude, longitude: warehouse.longitude },
      { latitude: customer.latitude, longitude: customer.longitude }
    );

    // Calculate shipping charge
    const calculation = ShippingCalculator.calculateShippingCharge(
      distance,
      product.weightKg,
      deliverySpeed
    );

    const result = {
      shippingCharge: calculation.totalCharge,
    };

    // Cache the result
    await cacheManager.set(cacheKey, result, 1800); // Cache for 30 minutes

    return result;
  }
}
