import { WarehouseRepository } from '../repositories/warehouseRepository';
import { SellerRepository } from '../repositories/sellerRepository';
import { ProductRepository } from '../repositories/productRepository';
import { cacheManager } from '../config/cache';

/**
 * Warehouse Service - Business logic for warehouse operations
 */
export class WarehouseService {
  private warehouseRepo: WarehouseRepository;
  private sellerRepo: SellerRepository;
  private productRepo: ProductRepository;

  constructor() {
    this.warehouseRepo = new WarehouseRepository();
    this.sellerRepo = new SellerRepository();
    this.productRepo = new ProductRepository();
  }

  /**
   * Get nearest warehouse for a seller's product
   * @param sellerId Seller ID
   * @param productId Product ID
   * @returns Nearest warehouse with location
   */
  async getNearestWarehouse(
    sellerId: string,
    productId: string
  ): Promise<{
    warehouseId: string;
    warehouseLocation: { lat: number; long: number };
    warehouseName: string;
  }> {
    // Check cache first
    const cacheKey = `nearest_warehouse:${sellerId}:${productId}`;
    const cached = await cacheManager.get<any>(cacheKey);
    if (cached) {
      return cached;
    }

    // Verify product belongs to seller
    const product = await this.productRepo.findById(productId);
    if (product.sellerId !== sellerId) {
      throw new Error(`Product ${productId} does not belong to seller ${sellerId}`);
    }

    // Get seller location
    const seller = await this.sellerRepo.findById(sellerId);

    // Find nearest warehouse
    const warehouse = await this.warehouseRepo.findNearest({
      latitude: seller.latitude,
      longitude: seller.longitude,
    });

    const result = {
      warehouseId: warehouse.warehouseId,
      warehouseLocation: {
        lat: warehouse.latitude,
        long: warehouse.longitude,
      },
      warehouseName: warehouse.name,
    };

    // Cache the result
    await cacheManager.set(cacheKey, result, 3600); // Cache for 1 hour

    return result;
  }
}
