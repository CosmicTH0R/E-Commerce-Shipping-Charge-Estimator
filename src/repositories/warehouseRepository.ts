import { PrismaClient, Warehouse } from '@prisma/client';
import { getPrismaClient } from '../config/database';
import { NotFoundError } from '../middleware/errorHandler';
import { Location } from '../types';
import { calculateDistance } from '../utils/distance';

/**
 * Repository Pattern: Warehouse data access layer
 */
export class WarehouseRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = getPrismaClient();
  }

  /**
   * Find all active warehouses
   */
  async findAll(): Promise<Warehouse[]> {
    return this.prisma.warehouse.findMany({
      where: { isActive: true },
    });
  }

  /**
   * Find warehouse by ID
   */
  async findById(warehouseId: string): Promise<Warehouse> {
    const warehouse = await this.prisma.warehouse.findUnique({
      where: { warehouseId },
    });

    if (!warehouse || !warehouse.isActive) {
      throw new NotFoundError(`Warehouse with ID ${warehouseId} not found`);
    }

    return warehouse;
  }

  /**
   * Find nearest warehouse to a given location
   */
  async findNearest(location: Location): Promise<Warehouse> {
    const warehouses = await this.findAll();

    if (warehouses.length === 0) {
      throw new NotFoundError('No warehouses available');
    }

    let nearestWarehouse = warehouses[0];
    let minDistance = calculateDistance(location, {
      latitude: warehouses[0].latitude,
      longitude: warehouses[0].longitude,
    });

    for (let i = 1; i < warehouses.length; i++) {
      const distance = calculateDistance(location, {
        latitude: warehouses[i].latitude,
        longitude: warehouses[i].longitude,
      });

      if (distance < minDistance) {
        minDistance = distance;
        nearestWarehouse = warehouses[i];
      }
    }

    return nearestWarehouse;
  }
}
