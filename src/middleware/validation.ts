import { Request, Response, NextFunction } from 'express';
import { z, ZodSchema } from 'zod';
import { ValidationError } from './errorHandler';

/**
 * Validation schemas using Zod
 */

// Delivery speed enum
export const deliverySpeedSchema = z.enum(['standard', 'express'], {
  errorMap: () => ({ message: 'Delivery speed must be either "standard" or "express"' }),
});

// Query parameters for nearest warehouse endpoint
export const nearestWarehouseQuerySchema = z.object({
  sellerId: z.string().min(1, 'Seller ID is required'),
  productId: z.string().min(1, 'Product ID is required'),
});

// Query parameters for shipping charge endpoint
export const shippingChargeQuerySchema = z.object({
  warehouseId: z.string().min(1, 'Warehouse ID is required'),
  customerId: z.string().min(1, 'Customer ID is required'),
  productId: z.string().min(1, 'Product ID is required'),
  deliverySpeed: deliverySpeedSchema,
});

// Request body for calculate shipping endpoint
export const calculateShippingBodySchema = z.object({
  sellerId: z.string().min(1, 'Seller ID is required'),
  customerId: z.string().min(1, 'Customer ID is required'),
  productId: z.string().min(1, 'Product ID is required'),
  deliverySpeed: deliverySpeedSchema,
});

/**
 * Middleware factory for validating requests
 */
export const validate = (schema: ZodSchema, source: 'query' | 'body' = 'body') => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      const data = source === 'query' ? req.query : req.body;
      const validated = schema.parse(data);
      
      // Replace request data with validated data
      if (source === 'query') {
        req.query = validated as any;
      } else {
        req.body = validated;
      }
      
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const messages = error.errors.map(err => `${err.path.join('.')}: ${err.message}`);
        next(new ValidationError(messages.join(', ')));
      } else {
        next(error);
      }
    }
  };
};
