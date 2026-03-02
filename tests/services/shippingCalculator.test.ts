import { ShippingCalculator } from '../../src/services/shippingCalculator';
import { DeliverySpeed, TransportMode } from '../../src/types';

describe('ShippingCalculator', () => {
  describe('calculateShippingCharge', () => {
    it('should calculate standard delivery charge for short distance', () => {
      const result = ShippingCalculator.calculateShippingCharge(
        50,
        10,
        DeliverySpeed.STANDARD
      );

      expect(result.distance).toBe(50);
      expect(result.weight).toBe(10);
      expect(result.transportMode).toBe(TransportMode.MINI_VAN);
      expect(result.deliverySpeed).toBe(DeliverySpeed.STANDARD);
      expect(result.baseCharge).toBe(10);
      expect(result.transportCharge).toBe(1500); // 50 * 10 * 3
      expect(result.expressCharge).toBeUndefined();
      expect(result.totalCharge).toBe(1510); // 10 + 1500
    });

    it('should calculate express delivery charge with multiplier', () => {
      const result = ShippingCalculator.calculateShippingCharge(
        50,
        10,
        DeliverySpeed.EXPRESS
      );

      expect(result.expressCharge).toBe(12); // 10 * 1.2
      expect(result.totalCharge).toBe(1522); // 10 + 1500 + 12
    });

    it('should calculate charge for medium distance (truck)', () => {
      const result = ShippingCalculator.calculateShippingCharge(
        200,
        5,
        DeliverySpeed.STANDARD
      );

      expect(result.transportMode).toBe(TransportMode.TRUCK);
      expect(result.transportCharge).toBe(2000); // 200 * 5 * 2
      expect(result.totalCharge).toBe(2010); // 10 + 2000
    });

    it('should calculate charge for long distance (aeroplane)', () => {
      const result = ShippingCalculator.calculateShippingCharge(
        600,
        5,
        DeliverySpeed.STANDARD
      );

      expect(result.transportMode).toBe(TransportMode.AEROPLANE);
      expect(result.transportCharge).toBe(3000); // 600 * 5 * 1
      expect(result.totalCharge).toBe(3010); // 10 + 3000
    });

    it('should throw error for negative distance', () => {
      expect(() =>
        ShippingCalculator.calculateShippingCharge(-10, 5, DeliverySpeed.STANDARD)
      ).toThrow('Distance cannot be negative');
    });

    it('should throw error for zero or negative weight', () => {
      expect(() =>
        ShippingCalculator.calculateShippingCharge(50, 0, DeliverySpeed.STANDARD)
      ).toThrow('Weight must be greater than zero');

      expect(() =>
        ShippingCalculator.calculateShippingCharge(50, -5, DeliverySpeed.STANDARD)
      ).toThrow('Weight must be greater than zero');
    });

    it('should round charges to 2 decimal places', () => {
      const result = ShippingCalculator.calculateShippingCharge(
        50.555,
        10.333,
        DeliverySpeed.EXPRESS
      );

      expect(result.distance.toString().split('.')[1]?.length || 0).toBeLessThanOrEqual(2);
      expect(result.transportCharge.toString().split('.')[1]?.length || 0).toBeLessThanOrEqual(2);
      expect(result.totalCharge.toString().split('.')[1]?.length || 0).toBeLessThanOrEqual(2);
    });
  });
});
