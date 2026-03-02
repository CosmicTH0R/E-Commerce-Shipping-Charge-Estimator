import { PrismaClient, Customer } from '@prisma/client';
import { getPrismaClient } from '../config/database';
import { NotFoundError } from '../middleware/errorHandler';

/**
 * Repository Pattern: Customer data access layer
 */
export class CustomerRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = getPrismaClient();
  }

  /**
   * Find customer by ID
   */
  async findById(customerId: string): Promise<Customer> {
    const customer = await this.prisma.customer.findUnique({
      where: { customerId },
    });

    if (!customer || !customer.isActive) {
      throw new NotFoundError(`Customer with ID ${customerId} not found`);
    }

    return customer;
  }

  /**
   * Create a new customer
   */
  async create(data: {
    customerId: string;
    name: string;
    phoneNumber: string;
    latitude: number;
    longitude: number;
    address?: string;
    city?: string;
    state?: string;
    pincode?: string;
  }): Promise<Customer> {
    return this.prisma.customer.create({
      data,
    });
  }

  /**
   * Find all active customers
   */
  async findAll(): Promise<Customer[]> {
    return this.prisma.customer.findMany({
      where: { isActive: true },
    });
  }
}
