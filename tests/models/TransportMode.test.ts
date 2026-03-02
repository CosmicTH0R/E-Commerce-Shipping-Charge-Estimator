import {
  AeroplaneTransport,
  TruckTransport,
  MiniVanTransport,
  TransportModeFactory,
} from '../../src/models/TransportMode';
import { TransportMode } from '../../src/types';

describe('Transport Mode', () => {
  describe('MiniVanTransport', () => {
    const miniVan = new MiniVanTransport();

    it('should handle distances 0-99 km', () => {
      expect(miniVan.canHandle(0)).toBe(true);
      expect(miniVan.canHandle(50)).toBe(true);
      expect(miniVan.canHandle(99)).toBe(true);
      expect(miniVan.canHandle(100)).toBe(false);
    });

    it('should calculate charge at 3 Rs per km per kg', () => {
      const charge = miniVan.calculateCharge(50, 10);
      expect(charge).toBe(1500); // 50 * 10 * 3
    });

    it('should return correct mode', () => {
      expect(miniVan.getMode()).toBe(TransportMode.MINI_VAN);
    });
  });

  describe('TruckTransport', () => {
    const truck = new TruckTransport();

    it('should handle distances 100-499 km', () => {
      expect(truck.canHandle(99)).toBe(false);
      expect(truck.canHandle(100)).toBe(true);
      expect(truck.canHandle(300)).toBe(true);
      expect(truck.canHandle(499)).toBe(true);
      expect(truck.canHandle(500)).toBe(false);
    });

    it('should calculate charge at 2 Rs per km per kg', () => {
      const charge = truck.calculateCharge(200, 10);
      expect(charge).toBe(4000); // 200 * 10 * 2
    });

    it('should return correct mode', () => {
      expect(truck.getMode()).toBe(TransportMode.TRUCK);
    });
  });

  describe('AeroplaneTransport', () => {
    const aeroplane = new AeroplaneTransport();

    it('should handle distances 500+ km', () => {
      expect(aeroplane.canHandle(499)).toBe(false);
      expect(aeroplane.canHandle(500)).toBe(true);
      expect(aeroplane.canHandle(1000)).toBe(true);
      expect(aeroplane.canHandle(5000)).toBe(true);
    });

    it('should calculate charge at 1 Rs per km per kg', () => {
      const charge = aeroplane.calculateCharge(600, 10);
      expect(charge).toBe(6000); // 600 * 10 * 1
    });

    it('should return correct mode', () => {
      expect(aeroplane.getMode()).toBe(TransportMode.AEROPLANE);
    });
  });

  describe('TransportModeFactory', () => {
    it('should return MiniVan for short distances', () => {
      const mode = TransportModeFactory.getTransportMode(50);
      expect(mode.getMode()).toBe(TransportMode.MINI_VAN);
    });

    it('should return Truck for medium distances', () => {
      const mode = TransportModeFactory.getTransportMode(250);
      expect(mode.getMode()).toBe(TransportMode.TRUCK);
    });

    it('should return Aeroplane for long distances', () => {
      const mode = TransportModeFactory.getTransportMode(800);
      expect(mode.getMode()).toBe(TransportMode.AEROPLANE);
    });

    it('should handle boundary cases correctly', () => {
      expect(TransportModeFactory.getTransportMode(99).getMode()).toBe(TransportMode.MINI_VAN);
      expect(TransportModeFactory.getTransportMode(100).getMode()).toBe(TransportMode.TRUCK);
      expect(TransportModeFactory.getTransportMode(499).getMode()).toBe(TransportMode.TRUCK);
      expect(TransportModeFactory.getTransportMode(500).getMode()).toBe(TransportMode.AEROPLANE);
    });
  });
});
