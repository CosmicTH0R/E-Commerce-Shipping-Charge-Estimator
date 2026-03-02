import { DeliverySpeed, ShippingCalculation } from '../types';
import { TransportModeFactory } from '../models/TransportMode';

/**
 * Shipping Calculator Service
 * Calculates shipping charges based on distance, weight, and delivery speed
 */
export class ShippingCalculator {
  private static readonly STANDARD_COURIER_CHARGE = 10;
  private static readonly EXPRESS_MULTIPLIER = 1.2;

  /**
   * Calculate total shipping charge
   * @param distance Distance in kilometers
   * @param weight Weight in kilograms
   * @param deliverySpeed Standard or Express
   * @returns Detailed shipping calculation
   */
  static calculateShippingCharge(
    distance: number,
    weight: number,
    deliverySpeed: DeliverySpeed
  ): ShippingCalculation {
    // Validate inputs
    if (distance < 0) {
      throw new Error('Distance cannot be negative');
    }
    if (weight <= 0) {
      throw new Error('Weight must be greater than zero');
    }

    // Get appropriate transport mode
    const transportMode = TransportModeFactory.getTransportMode(distance);

    // Calculate base transport charge
    const transportCharge = transportMode.calculateCharge(distance, weight);

    // Calculate express charge if applicable
    let expressCharge = 0;
    if (deliverySpeed === DeliverySpeed.EXPRESS) {
      expressCharge = weight * this.EXPRESS_MULTIPLIER;
    }

    // Calculate total charge
    const totalCharge = 
      this.STANDARD_COURIER_CHARGE + 
      transportCharge + 
      expressCharge;

    return {
      distance: Math.round(distance * 100) / 100,
      weight,
      transportMode: transportMode.getMode(),
      deliverySpeed,
      baseCharge: this.STANDARD_COURIER_CHARGE,
      transportCharge: Math.round(transportCharge * 100) / 100,
      expressCharge: expressCharge > 0 ? Math.round(expressCharge * 100) / 100 : undefined,
      totalCharge: Math.round(totalCharge * 100) / 100,
    };
  }
}
