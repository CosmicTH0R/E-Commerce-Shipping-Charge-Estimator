import { Location } from '../types';

/**
 * Calculate distance between two geographic points using Haversine formula
 * @param point1 First location with latitude and longitude
 * @param point2 Second location with latitude and longitude
 * @returns Distance in kilometers
 */
export function calculateDistance(point1: Location, point2: Location): number {
  // Validate coordinates
  if (!isValidCoordinate(point1) || !isValidCoordinate(point2)) {
    throw new Error('Invalid coordinates provided');
  }

  // Handle same location
  if (point1.latitude === point2.latitude && point1.longitude === point2.longitude) {
    return 0;
  }

  const R = 6371; // Earth's radius in kilometers
  
  const lat1Rad = toRadians(point1.latitude);
  const lat2Rad = toRadians(point2.latitude);
  const deltaLat = toRadians(point2.latitude - point1.latitude);
  const deltaLon = toRadians(point2.longitude - point1.longitude);

  const a = 
    Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
    Math.cos(lat1Rad) * Math.cos(lat2Rad) *
    Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  
  const distance = R * c;
  
  return Math.round(distance * 100) / 100; // Round to 2 decimal places
}

/**
 * Convert degrees to radians
 */
function toRadians(degrees: number): number {
  return degrees * (Math.PI / 180);
}

/**
 * Validate if coordinates are within valid ranges
 */
function isValidCoordinate(location: Location): boolean {
  return (
    location.latitude >= -90 &&
    location.latitude <= 90 &&
    location.longitude >= -180 &&
    location.longitude <= 180
  );
}
