# E-Commerce Shipping Charge Estimator

A B2B e-commerce shipping charge calculator API for Kirana stores. This system calculates shipping costs based on warehouse proximity, distance, transport mode, and delivery speed.

## Features

- 🏭 Find nearest warehouse for sellers
- 📦 Calculate shipping charges based on distance and weight
- 🚚 Multiple transport modes (Aeroplane, Truck, Mini Van)
- ⚡ Standard and Express delivery options
- 🎯 Clean architecture with design patterns
- ✅ Comprehensive testing
- 🚀 Redis caching for performance

## Tech Stack

- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **Database**: PostgreSQL with Prisma ORM
- **Caching**: Redis
- **Testing**: Jest + Supertest
- **Validation**: Zod

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- PostgreSQL (v14 or higher)
- Redis (optional, for caching)

### Installation

1. Clone the repository
```bash
git clone https://github.com/CosmicTH0R/E-Commerce-Shipping-Charge-Estimator.git
cd E-Commerce-Shipping-Charge-Estimator
```

2. Install dependencies
```bash
npm install
```

3. Setup environment variables
```bash
cp .env.example .env
# Edit .env with your database credentials
```

4. Setup database
```bash
npm run prisma:migrate
npm run prisma:seed
```

5. Start development server
```bash
npm run dev
```

## API Endpoints

### 1. Get Nearest Warehouse
```
GET /api/v1/warehouse/nearest?sellerId=123&productId=456
```

### 2. Get Shipping Charge
```
GET /api/v1/shipping-charge?warehouseId=789&customerId=456&deliverySpeed=standard
```

### 3. Calculate Shipping Charge (Combined)
```
POST /api/v1/shipping-charge/calculate
{
  "sellerId": 123,
  "customerId": 456,
  "productId": 789,
  "deliverySpeed": "express"
}
```

## Project Structure

```
src/
├── config/          # Configuration files
├── controllers/     # API controllers
├── services/        # Business logic
├── repositories/    # Data access layer
├── models/          # Domain models
├── utils/           # Utility functions
├── middleware/      # Express middleware
└── index.ts         # Application entry point
```

## Design Patterns

- **Strategy Pattern**: Transport mode selection
- **Factory Pattern**: Shipping calculators
- **Repository Pattern**: Data access abstraction
- **Singleton Pattern**: Cache manager

## Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch
```

## License

MIT

---

## Project Status

✅ All phases completed successfully!

- Phase 1: Project setup and infrastructure
- Phase 2: Core utilities and helpers
- Phase 3: Repository pattern implementation
- Phase 4: Business logic services
- Phase 5: API controllers and routes
- Phase 6: Database seeding and testing
- Phase 7: Docker setup and documentation

## Quick Links

- [Setup Guide](SETUP_GUIDE.md) - Detailed installation instructions
- [API Documentation](API_DOCUMENTATION.md) - Complete API reference
- [Implementation Summary](IMPLEMENTATION_SUMMARY.md) - Technical details
- [Project Plan](PROJECT_PLAN.md) - Development roadmap

## Key Features Implemented

✅ All 3 required APIs  
✅ PostgreSQL database with Prisma ORM  
✅ Redis caching for performance  
✅ Design patterns (Strategy, Factory, Repository, Singleton)  
✅ Comprehensive error handling  
✅ Input validation with Zod  
✅ Unit tests with Jest  
✅ Docker deployment ready  
✅ Complete documentation  

## Sample API Calls

```bash
# Get nearest warehouse
curl "http://localhost:3000/api/v1/warehouse/nearest?sellerId=SELLER-NESTLE-001&productId=PROD-MAGGIE-001"

# Calculate shipping charge
curl "http://localhost:3000/api/v1/shipping-charge?warehouseId=WH-BLR-001&customerId=CUST-123&productId=PROD-MAGGIE-001&deliverySpeed=standard"

# Combined calculation
curl -X POST http://localhost:3000/api/v1/shipping-charge/calculate \
  -H "Content-Type: application/json" \
  -d '{"sellerId":"SELLER-NESTLE-001","customerId":"CUST-123","productId":"PROD-MAGGIE-001","deliverySpeed":"express"}'
```
