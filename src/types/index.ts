// Common types and interfaces

export interface Location {
  latitude: number;
  longitude: number;
}

export interface WarehouseLocation extends Location {
  warehouseId: string;
}

export enum DeliverySpeed {
  STANDARD = 'standard',
  EXPRESS = 'express',
}

export enum TransportMode {
  AEROPLANE = 'aeroplane',
  TRUCK = 'truck',
  MINI_VAN = 'mini_van',
}

export interface ShippingCalculation {
  distance: number;
  weight: number;
  transportMode: TransportMode;
  deliverySpeed: DeliverySpeed;
  baseCharge: number;
  transportCharge: number;
  expressCharge?: number;
  totalCharge: number;
}
