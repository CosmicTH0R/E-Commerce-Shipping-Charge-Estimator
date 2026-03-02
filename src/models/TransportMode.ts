import { TransportMode as TransportModeEnum } from '../types';

/**
 * Strategy Pattern: Interface for transport modes
 */
export interface ITransportMode {
  getMode(): TransportModeEnum;
  getRatePerKmPerKg(): number;
  getMinDistance(): number;
  getMaxDistance(): number | null;
  canHandle(distance: number): boolean;
  calculateCharge(distance: number, weight: number): number;
}

/**
 * Aeroplane Transport - For distances 500km and above
 * Rate: 1 Rs per km per kg
 */
export class AeroplaneTransport implements ITransportMode {
  getMode(): TransportModeEnum {
    return TransportModeEnum.AEROPLANE;
  }

  getRatePerKmPerKg(): number {
    return 1;
  }

  getMinDistance(): number {
    return 500;
  }

  getMaxDistance(): number | null {
    return null; // No upper limit
  }

  canHandle(distance: number): boolean {
    return distance >= this.getMinDistance();
  }

  calculateCharge(distance: number, weight: number): number {
    return distance * weight * this.getRatePerKmPerKg();
  }
}

/**
 * Truck Transport - For distances 100km to 499km
 * Rate: 2 Rs per km per kg
 */
export class TruckTransport implements ITransportMode {
  getMode(): TransportModeEnum {
    return TransportModeEnum.TRUCK;
  }

  getRatePerKmPerKg(): number {
    return 2;
  }

  getMinDistance(): number {
    return 100;
  }

  getMaxDistance(): number | null {
    return 499;
  }


  canHandle(distance: number): boolean {
    const max = this.getMaxDistance();
    return distance >= this.getMinDistance() && (max === null || distance <= max);
  }

  calculateCharge(distance: number, weight: number): number {
    return distance * weight * this.getRatePerKmPerKg();
  }
}

/**
 * Mini Van Transport - For distances 0 to 99km
 * Rate: 3 Rs per km per kg
 */
export class MiniVanTransport implements ITransportMode {
  getMode(): TransportModeEnum {
    return TransportModeEnum.MINI_VAN;
  }

  getRatePerKmPerKg(): number {
    return 3;
  }

  getMinDistance(): number {
    return 0;
  }

  getMaxDistance(): number | null {
    return 99;
  }

  canHandle(distance: number): boolean {
    const max = this.getMaxDistance();
    return distance >= this.getMinDistance() && (max === null || distance <= max);
  }

  calculateCharge(distance: number, weight: number): number {
    return distance * weight * this.getRatePerKmPerKg();
  }
}

/**
 * Factory Pattern: Select appropriate transport mode based on distance
 */
export class TransportModeFactory {
  private static modes: ITransportMode[] = [
    new MiniVanTransport(),
    new TruckTransport(),
    new AeroplaneTransport(),
  ];

  static getTransportMode(distance: number): ITransportMode {
    for (const mode of this.modes) {
      if (mode.canHandle(distance)) {
        return mode;
      }
    }
    throw new Error(`No transport mode available for distance: ${distance}km`);
  }
}
