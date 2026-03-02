import { PrismaClient, Product } from '@prisma/client';
import { getPrismaClient } from '../config/database';
import { NotFoundError, ValidationError } from '../middleware/errorHandler';

/**
 * Repository Pattern: Product data access layer
 */
export class ProductRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = getPrismaClient();
  }

  /**
   * Find product by ID
   */
  async findById(productId: string): Promise<Product> {
    const product = await this.prisma.product.findUnique({
      where: { productId },
      include: { seller: true },
    });

    if (!product || !product.isActive) {
      throw new NotFoundError(`Product with ID ${productId} not found`);
    }

    return product;
  }

  /**
   * Find products by seller ID
   */
  async findBySeller(sellerId: string): Promise<Product[]> {
    return this.prisma.product.findMany({
      where: {
        sellerId,
        isActive: true,
      },
    });
  }

  /**
   * Create a new product
   */
  async create(data: {
    productId: string;
    sellerId: string;
    name: string;
    sellingPrice: number;
    weightKg: number;
    dimensionLength: number;
    dimensionWidth: number;
    dimensionHeight: number;
    description?: string;
    category?: string;
  }): Promise<Product> {
    // Validate product attributes
    if (data.weightKg <= 0) {
      throw new ValidationError('Product weight must be greater than zero');
    }
    if (data.dimensionLength <= 0 || data.dimensionWidth <= 0 || data.dimensionHeight <= 0) {
      throw new ValidationError('Product dimensions must be greater than zero');
    }

    return this.prisma.product.create({
      data,
    });
  }

  /**
   * Find all active products
   */
  async findAll(): Promise<Product[]> {
    return this.prisma.product.findMany({
      where: { isActive: true },
      include: { seller: true },
    });
  }
}
