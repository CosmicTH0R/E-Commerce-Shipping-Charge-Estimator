import { calculateDistance } from '../../src/utils/distance';

describe('Distance Calculation Utility', () => {
  describe('calculateDistance', () => {
    it('should calculate distance between two points correctly', () => {
      const point1 = { latitude: 12.9716, longitude: 77.5946 }; // Bangalore
      const point2 = { latitude: 19.076, longitude: 72.8777 }; // Mumbai
      
      const distance = calculateDistance(point1, point2);
      
      // Distance between Bangalore and Mumbai is approximately 840 km
      expect(distance).toBeGreaterThan(800);
      expect(distance).toBeLessThan(900);
    });

    it('should return 0 for same location', () => {
      const point = { latitude: 12.9716, longitude: 77.5946 };
      
      const distance = calculateDistance(point, point);
      
      expect(distance).toBe(0);
    });

    it('should throw error for invalid latitude', () => {
      const point1 = { latitude: 91, longitude: 77.5946 }; // Invalid latitude
      const point2 = { latitude: 19.076, longitude: 72.8777 };
      
      expect(() => calculateDistance(point1, point2)).toThrow('Invalid coordinates');
    });

    it('should throw error for invalid longitude', () => {
      const point1 = { latitude: 12.9716, longitude: 181 }; // Invalid longitude
      const point2 = { latitude: 19.076, longitude: 72.8777 };
      
      expect(() => calculateDistance(point1, point2)).toThrow('Invalid coordinates');
    });

    it('should handle negative coordinates', () => {
      const point1 = { latitude: -33.8688, longitude: 151.2093 }; // Sydney
      const point2 = { latitude: 51.5074, longitude: -0.1278 }; // London
      
      const distance = calculateDistance(point1, point2);
      
      expect(distance).toBeGreaterThan(0);
    });

    it('should round distance to 2 decimal places', () => {
      const point1 = { latitude: 12.9716, longitude: 77.5946 };
      const point2 = { latitude: 12.9726, longitude: 77.5956 };
      
      const distance = calculateDistance(point1, point2);
      
      // Check that result has at most 2 decimal places
      expect(distance.toString().split('.')[1]?.length || 0).toBeLessThanOrEqual(2);
    });
  });
});
