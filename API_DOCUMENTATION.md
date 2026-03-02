# API Documentation

## Base URL
```
http://localhost:3000/api/v1
```

## Endpoints

### 1. Get Nearest Warehouse

Find the nearest warehouse for a seller's product.

**Endpoint:** `GET /warehouse/nearest`

**Query Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| sellerId | string | Yes | Unique seller identifier |
| productId | string | Yes | Unique product identifier |

**Success Response (200 OK):**
```json
{
  "warehouseId": "WH-BLR-001",
  "warehouseLocation": {
    "lat": 12.99999,
    "long": 37.923273
  },
  "warehouseName": "BLR_Warehouse"
}
```

**Error Responses:**

400 Bad Request - Invalid parameters
```json
{
  "status": "error",
  "message": "sellerId: Seller ID is required"
}
```

404 Not Found - Seller/Product not found
```json
{
  "status": "error",
  "message": "Seller with ID SELLER-XXX not found"
}
```

**Example:**
```bash
curl "http://localhost:3000/api/v1/warehouse/nearest?sellerId=SELLER-NESTLE-001&productId=PROD-MAGGIE-001"
```

---

### 2. Get Shipping Charge

Calculate shipping charge from a warehouse to a customer.

**Endpoint:** `GET /shipping-charge`

**Query Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| warehouseId | string | Yes | Unique warehouse identifier |
| customerId | string | Yes | Unique customer identifier |
| productId | string | Yes | Unique product identifier (for weight) |
| deliverySpeed | string | Yes | "standard" or "express" |

**Success Response (200 OK):**
```json
{
  "shippingCharge": 150.00
}
```

**Delivery Speed Options:**
- `standard`: Rs 10 base charge + transport charge
- `express`: Rs 10 base charge + transport charge + Rs 1.2 per kg extra

**Transport Modes (Auto-selected by distance):**
| Mode | Distance Range | Rate |
|------|---------------|------|
| Mini Van | 0-99 km | 3 Rs/km/kg |
| Truck | 100-499 km | 2 Rs/km/kg |
| Aeroplane | 500+ km | 1 Rs/km/kg |

**Error Responses:**

400 Bad Request
```json
{
  "status": "error",
  "message": "deliverySpeed: Delivery speed must be either \"standard\" or \"express\""
}
```

404 Not Found
```json
{
  "status": "error",
  "message": "Warehouse with ID WH-XXX not found"
}
```

**Example:**
```bash
curl "http://localhost:3000/api/v1/shipping-charge?warehouseId=WH-BLR-001&customerId=CUST-123&productId=PROD-MAGGIE-001&deliverySpeed=standard"
```

---

### 3. Calculate Shipping Charge (Combined)

Calculate shipping charge for a seller-to-customer delivery. This endpoint combines finding the nearest warehouse and calculating the shipping charge.

**Endpoint:** `POST /shipping-charge/calculate`

**Request Body:**
```json
{
  "sellerId": "SELLER-NESTLE-001",
  "customerId": "CUST-123",
  "productId": "PROD-MAGGIE-001",
  "deliverySpeed": "express"
}
```

**Request Body Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| sellerId | string | Yes | Unique seller identifier |
| customerId | string | Yes | Unique customer identifier |
| productId | string | Yes | Unique product identifier |
| deliverySpeed | string | Yes | "standard" or "express" |

**Success Response (200 OK):**
```json
{
  "shippingCharge": 180.00,
  "nearestWarehouse": {
    "warehouseId": "WH-BLR-001",
    "warehouseLocation": {
      "lat": 12.99999,
      "long": 37.923273
    },
    "warehouseName": "BLR_Warehouse"
  }
}
```

**Error Responses:**

400 Bad Request
```json
{
  "status": "error",
  "message": "sellerId: Seller ID is required"
}
```

404 Not Found
```json
{
  "status": "error",
  "message": "Product with ID PROD-XXX not found"
}
```

**Example:**
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

---

## Health Check

**Endpoint:** `GET /health`

**Success Response (200 OK):**
```json
{
  "status": "ok",
  "timestamp": "2026-03-02T15:30:00.000Z",
  "uptime": 123.456
}
```

---

## Error Handling

All endpoints follow a consistent error response format:

```json
{
  "status": "error",
  "message": "Error description"
}
```

### HTTP Status Codes

| Code | Description |
|------|-------------|
| 200 | Success |
| 400 | Bad Request - Invalid parameters |
| 404 | Not Found - Resource doesn't exist |
| 500 | Internal Server Error |

---

## Seeded Test Data

### Warehouses
- `WH-BLR-001` - Bangalore (12.99999, 37.923273)
- `WH-MUMB-001` - Mumbai (11.99999, 27.923273)
- `WH-DEL-001` - Delhi (28.7041, 77.1025)

### Sellers
- `SELLER-NESTLE-001` - Nestle (Bangalore)
- `SELLER-RICE-001` - Rice Seller (Mumbai)
- `SELLER-SUGAR-001` - Sugar Seller (Delhi)

### Products
- `PROD-MAGGIE-001` - Maggie 500g (0.5 kg)
- `PROD-RICE-001` - Rice Bag 10kg (10 kg)
- `PROD-SUGAR-001` - Sugar Bag 25kg (25 kg)

### Customers
- `CUST-123` - Shree Kirana Store (11.232, 23.445495)
- `CUST-124` - Andheri Mini Mart (17.232, 33.445495)
- `CUST-125` - Delhi General Store (28.7041, 77.1025)

---

## Caching

Responses are cached using Redis (if enabled) with the following TTLs:
- Nearest warehouse: 1 hour
- Shipping charge: 30 minutes
- Combined calculation: 30 minutes

Cache can be disabled by setting `ENABLE_CACHE=false` in environment variables.

---

## Rate Limiting

Currently, no rate limiting is implemented. Consider adding rate limiting for production deployments.

---

## Authentication

Currently, no authentication is required. For production, implement API key or JWT-based authentication.
