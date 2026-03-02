import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // Clear existing data
  await prisma.product.deleteMany();
  await prisma.seller.deleteMany();
  await prisma.customer.deleteMany();
  await prisma.warehouse.deleteMany();

  // Seed Warehouses
  console.log('📦 Seeding warehouses...');
  const warehouses = await Promise.all([
    prisma.warehouse.create({
      data: {
        warehouseId: 'WH-BLR-001',
        name: 'BLR_Warehouse',
        latitude: 12.99999,
        longitude: 37.923273,
        address: 'Bangalore Warehouse Complex',
        city: 'Bangalore',
        state: 'Karnataka',
        capacity: 10000,
      },
    }),
    prisma.warehouse.create({
      data: {
        warehouseId: 'WH-MUMB-001',
        name: 'MUMB_Warehouse',
        latitude: 11.99999,
        longitude: 27.923273,
        address: 'Mumbai Warehouse Complex',
        city: 'Mumbai',
        state: 'Maharashtra',
        capacity: 15000,
      },
    }),
    prisma.warehouse.create({
      data: {
        warehouseId: 'WH-DEL-001',
        name: 'DEL_Warehouse',
        latitude: 28.7041,
        longitude: 77.1025,
        address: 'Delhi Warehouse Complex',
        city: 'Delhi',
        state: 'Delhi',
        capacity: 12000,
      },
    }),
  ]);
  console.log(`✅ Created ${warehouses.length} warehouses`);

  // Seed Sellers
  console.log('🏪 Seeding sellers...');
  const sellers = await Promise.all([
    prisma.seller.create({
      data: {
        sellerId: 'SELLER-NESTLE-001',
        name: 'Nestle',
        phoneNumber: '9876543210',
        latitude: 12.9716,
        longitude: 77.5946,
        address: 'Nestle India Ltd, Bangalore',
        city: 'Bangalore',
        state: 'Karnataka',
      },
    }),
    prisma.seller.create({
      data: {
        sellerId: 'SELLER-RICE-001',
        name: 'Rice Seller',
        phoneNumber: '9876543211',
        latitude: 19.076,
        longitude: 72.8777,
        address: 'Rice Wholesale Market, Mumbai',
        city: 'Mumbai',
        state: 'Maharashtra',
      },
    }),

    prisma.seller.create({
      data: {
        sellerId: 'SELLER-SUGAR-001',
        name: 'Sugar Seller',
        phoneNumber: '9876543212',
        latitude: 28.6139,
        longitude: 77.209,
        address: 'Sugar Trading Co, Delhi',
        city: 'Delhi',
        state: 'Delhi',
      },
    }),
  ]);
  console.log(`✅ Created ${sellers.length} sellers`);

  // Seed Products
  console.log('📦 Seeding products...');
  const products = await Promise.all([
    prisma.product.create({
      data: {
        productId: 'PROD-MAGGIE-001',
        sellerId: 'SELLER-NESTLE-001',
        name: 'Maggie 500g Packet',
        description: 'Instant noodles 500g pack',
        sellingPrice: 10,
        weightKg: 0.5,
        dimensionLength: 10,
        dimensionWidth: 10,
        dimensionHeight: 10,
        category: 'Food',
      },
    }),
    prisma.product.create({
      data: {
        productId: 'PROD-RICE-001',
        sellerId: 'SELLER-RICE-001',
        name: 'Rice Bag 10Kg',
        description: 'Premium Basmati Rice 10kg',
        sellingPrice: 500,
        weightKg: 10,
        dimensionLength: 1000,
        dimensionWidth: 800,
        dimensionHeight: 500,
        category: 'Grains',
      },
    }),
    prisma.product.create({
      data: {
        productId: 'PROD-SUGAR-001',
        sellerId: 'SELLER-SUGAR-001',
        name: 'Sugar Bag 25kg',
        description: 'Refined Sugar 25kg bag',
        sellingPrice: 700,
        weightKg: 25,
        dimensionLength: 1000,
        dimensionWidth: 900,
        dimensionHeight: 600,
        category: 'Groceries',
      },
    }),
  ]);
  console.log(`✅ Created ${products.length} products`);

  // Seed Customers
  console.log('🏬 Seeding customers...');
  const customers = await Promise.all([
    prisma.customer.create({
      data: {
        customerId: 'CUST-123',
        name: 'Shree Kirana Store',
        phoneNumber: '9847000001',
        latitude: 11.232,
        longitude: 23.445495,
        address: 'Shop No 12, Market Road',
        city: 'Pune',
        state: 'Maharashtra',
        pincode: '411001',
      },
    }),
    prisma.customer.create({
      data: {
        customerId: 'CUST-124',
        name: 'Andheri Mini Mart',
        phoneNumber: '9101000002',
        latitude: 17.232,
        longitude: 33.445495,
        address: 'Andheri West, Mumbai',
        city: 'Mumbai',
        state: 'Maharashtra',
        pincode: '400053',
      },
    }),
    prisma.customer.create({
      data: {
        customerId: 'CUST-125',
        name: 'Delhi General Store',
        phoneNumber: '9876000003',
        latitude: 28.7041,
        longitude: 77.1025,
        address: 'Connaught Place, Delhi',
        city: 'Delhi',
        state: 'Delhi',
        pincode: '110001',
      },
    }),
  ]);
  console.log(`✅ Created ${customers.length} customers`);

  console.log('✨ Database seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
