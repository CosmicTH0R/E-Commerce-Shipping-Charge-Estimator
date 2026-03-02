import { PrismaClient, Seller } from '@prisma/client';
import { getPrismaClient } from '../config/database';
import { NotFoundError } from '../middleware/errorHandler';

/**
 * Repository Pattern: Seller data access layer
 */
export class SellerRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = getPrismaClient();
  }

  /**
   * Find seller by ID
   */
  async findById(sellerId: string): Promise<Seller> {
    const seller = await this.prisma.seller.findUnique({
      where: { sellerId },
    });

    if (!seller || !seller.isActive) {
      throw new NotFoundError(`Seller with ID ${sellerId} not found`);
    }

    return seller;
  }

  /**
   * Create a new seller
   */
  async create(data: {
    sellerId: string;
    name: string;
    latitude: number;
    longitude: number;
    phoneNumber?: string;
    address?: string;
    city?: string;
    state?: string;
  }): Promise<Seller> {
    return this.prisma.seller.create({
      data,
    });
  }

  /**
   * Find all active sellers
   */
  async findAll(): Promise<Seller[]> {
    return this.prisma.seller.findMany({
      where: { isActive: true },
    });
  }
}
