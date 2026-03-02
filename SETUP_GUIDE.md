# Setup Guide - E-Commerce Shipping Charge Estimator

## Prerequisites

- Node.js v18 or higher
- PostgreSQL v14 or higher
- Redis (optional, for caching)
- Docker & Docker Compose (optional, for containerized deployment)

## Local Development Setup

### 1. Clone the Repository

```bash
git clone https://github.com/CosmicTH0R/E-Commerce-Shipping-Charge-Estimator.git
cd E-Commerce-Shipping-Charge-Estimator
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Configuration

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Update the `.env` file with your configuration:

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# Database Configuration
DATABASE_URL="postgresql://postgres:password@localhost:5432/shipping_estimator?schema=public"

# Redis Configuration (Optional)
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=
ENABLE_CACHE=true
CACHE_TTL=3600

# API Configuration
API_VERSION=v1
```

### 4. Database Setup

#### Create Database

```bash
# Using psql
createdb shipping_estimator

# Or using PostgreSQL client
psql -U postgres
CREATE DATABASE shipping_estimator;
\q
```

#### Run Migrations

```bash
npm run prisma:generate
npm run prisma:migrate
```

#### Seed Database

```bash
npm run prisma:seed
```

### 5. Start Development Server

```bash
npm run dev
```

The server will start on `http://localhost:3000`

### 6. Verify Installation

Check health endpoint:
```bash
curl http://localhost:3000/health
```

## Docker Deployment

### Using Docker Compose (Recommended)

This will start PostgreSQL, Redis, and the application:

```bash
docker-compose up -d
```

The application will be available at `http://localhost:3000`

### Using Docker Only

Build the image:
```bash
docker build -t shipping-estimator .
```

Run the container:
```bash
docker run -p 3000:3000 \
  -e DATABASE_URL="your_database_url" \
  -e REDIS_HOST="your_redis_host" \
  shipping-estimator
```

## Testing

### Run All Tests

```bash
npm test
```

### Run Tests in Watch Mode

```bash
npm run test:watch
```

### View Coverage Report

```bash
npm test
# Coverage report will be in ./coverage directory
```

## API Testing

### Using cURL

1. Get Nearest Warehouse:
```bash
curl "http://localhost:3000/api/v1/warehouse/nearest?sellerId=SELLER-NESTLE-001&productId=PROD-MAGGIE-001"
```

2. Get Shipping Charge:
```bash
curl "http://localhost:3000/api/v1/shipping-charge?warehouseId=WH-BLR-001&customerId=CUST-123&productId=PROD-MAGGIE-001&deliverySpeed=standard"
```

3. Calculate Shipping (Combined):
```bash
curl -X POST http://localhost:3000/api/v1/shipping-charge/calculate \
  -H "Content-Type: application/json" \
  -d '{
    "sellerId": "SELLER-NESTLE-001",
    "customerId": "CUST-123",
    "productId": "PROD-MAGGIE-001",
    "deliverySpeed": "express"
  }'
```

## Database Management

### View Database with Prisma Studio

```bash
npm run prisma:studio
```

This opens a GUI at `http://localhost:5555`

### Reset Database

```bash
npx prisma migrate reset
npm run prisma:seed
```

## Troubleshooting

### Port Already in Use

Change the PORT in `.env` file or kill the process:
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:3000 | xargs kill -9
```

### Database Connection Issues

- Verify PostgreSQL is running
- Check DATABASE_URL in `.env`
- Ensure database exists

### Redis Connection Issues

- If Redis is not available, set `ENABLE_CACHE=false` in `.env`
- The application will work without caching

## Production Deployment

### Build for Production

```bash
npm run build
```

### Start Production Server

```bash
npm start
```

### Environment Variables for Production

Ensure these are set:
- `NODE_ENV=production`
- `DATABASE_URL` (production database)
- `REDIS_HOST` (production Redis)
- `PORT` (default: 3000)

## Additional Commands

```bash
# Generate Prisma Client
npm run prisma:generate

# Create new migration
npm run prisma:migrate

# View Prisma Studio
npm run prisma:studio

# Lint code
npm run lint

# Build TypeScript
npm run build
```

## Support

For issues or questions, please open an issue on GitHub.
