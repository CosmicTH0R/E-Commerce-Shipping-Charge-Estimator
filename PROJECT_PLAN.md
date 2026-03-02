# E-Commerce Shipping Charge Estimator - Project Plan

## Project Overview
Build a B2B e-commerce shipping charge calculator for Kirana stores with APIs to calculate shipping costs based on warehouse proximity, distance, and delivery speed.

## Technology Stack
- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **Database**: PostgreSQL with Prisma ORM
- **Caching**: Redis (for response caching)
- **Testing**: Jest + Supertest
- **Validation**: Zod
- **Documentation**: Swagger/OpenAPI

## Architecture Approach
- **Design Patterns**: 
  - Strategy Pattern (for transport mode selection)
  - Factory Pattern (for shipping calculators)
  - Repository Pattern (for data access)
  - Singleton Pattern (for cache manager)
- **Layered Architecture**: Controller → Service → Repository

---

## Phase 1: Project Setup & Infrastructure (Tasks 1-5)

### Task 1: Initialize Project Structure
- [ ] Create project directory with proper folder structure
- [ ] Initialize npm project with TypeScript
- [ ] Setup tsconfig.json with strict mode
- [ ] Create folder structure: src/{controllers, services, repositories, models, utils, middleware, config}
- [ ] Setup .env.example and .gitignore

### Task 2: Install Core Dependencies
- [ ] Install Express, TypeScript, ts-node, nodemon
- [ ] Install Prisma and PostgreSQL client
- [ ] Install validation library (Zod)
- [ ] Install dotenv for environment variables
- [ ] Setup development scripts in package.json

### Task 3: Database Schema Design
- [ ] Design Prisma schema for Customer entity
- [ ] Design Prisma schema for Seller entity
- [ ] Design Prisma schema for Product entity
- [ ] Design Prisma schema for Warehouse entity
- [ ] Add indexes for location-based queries
- [ ] Create initial migration

### Task 4: Setup Express Server
- [ ] Create Express app with TypeScript
- [ ] Setup middleware (CORS, JSON parser, error handler)
- [ ] Create health check endpoint
- [ ] Setup request logging
- [ ] Configure port and environment settings

### Task 5: Setup Redis Cache (Optional - Good to Have)
- [ ] Install Redis client library
- [ ] Create cache manager singleton
- [ ] Implement cache wrapper utilities
- [ ] Add cache configuration in .env

---

## Phase 2: Core Utilities & Helpers (Tasks 6-9)

### Task 6: Distance Calculation Utility
- [ ] Implement Haversine formula for lat/lng distance
- [ ] Create utility function: `calculateDistance(point1, point2)`
- [ ] Add unit tests for distance calculation
- [ ] Handle edge cases (same location, invalid coordinates)

### Task 7: Transport Mode Strategy Pattern
- [ ] Create TransportMode interface
- [ ] Implement AeroplaneTransport class (500km+, 1 Rs/km/kg)
- [ ] Implement TruckTransport class (100-500km, 2 Rs/km/kg)
- [ ] Implement MiniVanTransport class (0-100km, 3 Rs/km/kg)
- [ ] Create TransportModeFactory to select appropriate mode

### Task 8: Shipping Calculator Service
- [ ] Create ShippingCalculator class
- [ ] Implement method: `calculateShippingCharge(distance, weight, deliverySpeed)`
- [ ] Apply standard courier charge (Rs 10)
- [ ] Apply express charge multiplier (1.2x per kg)
- [ ] Add unit tests for various scenarios

### Task 9: Error Handling & Validation
- [ ] Create custom error classes (NotFoundError, ValidationError)
- [ ] Create global error handler middleware
- [ ] Setup Zod schemas for request validation
- [ ] Create validation middleware

---

## Phase 3: Data Layer - Repositories (Tasks 10-13)

### Task 10: Warehouse Repository
- [ ] Create WarehouseRepository class
- [ ] Implement `findAll()` method
- [ ] Implement `findById(id)` method
- [ ] Implement `findNearest(location)` method using distance calculation
- [ ] Add error handling for no warehouses found

### Task 11: Customer Repository
- [ ] Create CustomerRepository class
- [ ] Implement `findById(id)` method
- [ ] Implement `create(data)` method
- [ ] Validate customer location data
- [ ] Add error handling for customer not found

### Task 12: Seller Repository
- [ ] Create SellerRepository class
- [ ] Implement `findById(id)` method
- [ ] Implement `create(data)` method
- [ ] Validate seller location data
- [ ] Add error handling for seller not found

### Task 13: Product Repository
- [ ] Create ProductRepository class
- [ ] Implement `findById(id)` method
- [ ] Implement `findBySeller(sellerId)` method
- [ ] Validate product attributes (weight, dimensions)
- [ ] Add error handling for product not found

---

## Phase 4: Business Logic - Services (Tasks 14-16)

### Task 14: Warehouse Service
- [ ] Create WarehouseService class
- [ ] Implement `getNearestWarehouse(sellerId, productId)` method
- [ ] Fetch seller location from repository
- [ ] Find nearest warehouse using repository
- [ ] Return warehouse details with location
- [ ] Add caching for warehouse lookups (optional)

### Task 15: Shipping Charge Service
- [ ] Create ShippingChargeService class
- [ ] Implement `calculateShippingCharge(warehouseId, customerId, deliverySpeed)` method
- [ ] Fetch warehouse and customer locations
- [ ] Calculate distance between warehouse and customer
- [ ] Get product weight from context
- [ ] Use TransportModeFactory to select transport
- [ ] Calculate final charge with delivery speed modifier
- [ ] Add caching for shipping calculations (optional)

### Task 16: Combined Shipping Service
- [ ] Implement `calculateShippingForSellerCustomer(sellerId, customerId, productId, deliverySpeed)` method
- [ ] Call WarehouseService to get nearest warehouse
- [ ] Call ShippingChargeService to calculate charge
- [ ] Return combined response with warehouse and charge
- [ ] Add comprehensive error handling

---

## Phase 5: API Layer - Controllers & Routes (Tasks 17-19)

### Task 17: Nearest Warehouse API
- [ ] Create WarehouseController
- [ ] Implement GET `/api/v1/warehouse/nearest` endpoint
- [ ] Validate query parameters (sellerId, productId)
- [ ] Call WarehouseService
- [ ] Return formatted response
- [ ] Add error handling and status codes

### Task 18: Shipping Charge API
- [ ] Create ShippingChargeController
- [ ] Implement GET `/api/v1/shipping-charge` endpoint
- [ ] Validate query parameters (warehouseId, customerId, deliverySpeed)
- [ ] Call ShippingChargeService
- [ ] Return formatted response
- [ ] Add error handling and status codes

### Task 19: Calculate Shipping API
- [ ] Implement POST `/api/v1/shipping-charge/calculate` endpoint
- [ ] Validate request body (sellerId, customerId, productId, deliverySpeed)
- [ ] Call Combined ShippingService
- [ ] Return formatted response with warehouse and charge
- [ ] Add error handling and status codes

---

## Phase 6: Data Seeding & Testing (Tasks 20-23)

### Task 20: Database Seed Script
- [ ] Create seed script for warehouses (BLR_Warehouse, MUMB_Warehouse, etc.)
- [ ] Create seed script for sellers (Nestle, Rice Seller, Sugar Seller)
- [ ] Create seed script for products (Maggie, Rice Bag, Sugar Bag)
- [ ] Create seed script for customers (Shree Kirana, Andheri Mini Mart)
- [ ] Add npm script to run seeds

### Task 21: Unit Tests - Utilities
- [ ] Test distance calculation utility
- [ ] Test transport mode selection logic
- [ ] Test shipping calculator with various inputs
- [ ] Test edge cases (zero distance, extreme weights)
- [ ] Achieve 90%+ code coverage

### Task 22: Unit Tests - Services
- [ ] Test WarehouseService.getNearestWarehouse()
- [ ] Test ShippingChargeService with different delivery speeds
- [ ] Test error scenarios (invalid IDs, no warehouses)
- [ ] Mock repository dependencies
- [ ] Achieve 90%+ code coverage

### Task 23: Integration Tests - APIs
- [ ] Test GET /api/v1/warehouse/nearest with valid data
- [ ] Test GET /api/v1/shipping-charge with standard/express delivery
- [ ] Test POST /api/v1/shipping-charge/calculate end-to-end
- [ ] Test error responses (400, 404, 500)
- [ ] Test with seeded database data

---

## Phase 7: Documentation & Deployment (Tasks 24-26)

### Task 24: API Documentation
- [ ] Setup Swagger/OpenAPI
- [ ] Document all three endpoints with examples
- [ ] Add request/response schemas
- [ ] Document error responses
- [ ] Add authentication notes (if applicable)

### Task 25: README & Setup Guide
- [ ] Write comprehensive README.md
- [ ] Document environment variables
- [ ] Add setup instructions (DB, Redis, dependencies)
- [ ] Add API usage examples with curl/Postman
- [ ] Document design patterns used

### Task 26: Docker & Deployment
- [ ] Create Dockerfile for application
- [ ] Create docker-compose.yml (app + PostgreSQL + Redis)
- [ ] Add deployment instructions
- [ ] Test containerized deployment
- [ ] Add health check endpoints

---

## Success Criteria Checklist

### Must Have ✓
- [ ] All entities stored in PostgreSQL
- [ ] All 3 APIs implemented and working
- [ ] Proper error handling for all edge cases
- [ ] Clean, modular, well-documented code
- [ ] Input validation on all endpoints

### Good to Have ✓
- [ ] Design patterns implemented (Strategy, Factory, Repository, Singleton)
- [ ] Unit tests with 90%+ coverage
- [ ] Integration tests for all APIs
- [ ] Redis caching for performance
- [ ] Swagger documentation
- [ ] Docker containerization

---

## Estimated Timeline
- **Phase 1**: 2-3 hours
- **Phase 2**: 2-3 hours
- **Phase 3**: 2-3 hours
- **Phase 4**: 3-4 hours
- **Phase 5**: 2-3 hours
- **Phase 6**: 3-4 hours
- **Phase 7**: 2-3 hours

**Total**: 16-23 hours for complete implementation

---

## Next Steps
1. Review and approve this plan
2. Start with Phase 1 - Project Setup
3. Complete tasks sequentially within each phase
4. Test after each phase completion
5. Iterate based on feedback
