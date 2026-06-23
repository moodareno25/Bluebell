const mongoose = require('mongoose');
require('dotenv').config();

const Category = require('../models/Category');
const Product = require('../models/Product');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/bluebell';

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB for seeding');

    // Clear existing data
    await Category.deleteMany({});
    await Product.deleteMany({});

    // Create categories
    const categoriesData = [
      { name: 'Phones', description: 'Smartphones and mobile devices' },
      { name: 'Laptops', description: 'Laptops and notebooks' },
      { name: 'Tablets', description: 'Tablets and e-readers' },
      { name: 'Audio', description: 'Headphones, speakers and audio gear' },
      { name: 'Cameras', description: 'Digital cameras and accessories' },
      { name: 'Wearables', description: 'Smartwatches and fitness trackers' },
      { name: 'Accessories', description: 'Chargers, cables and cases' },
      { name: 'Gaming', description: 'Consoles, controllers and gaming gear' }
    ];

    const createdCategories = await Category.insertMany(categoriesData);
    console.log(`🗂️  Inserted ${createdCategories.length} categories`);

    // Helper to get category ids by name
    const catMap = {};
    createdCategories.forEach(c => { catMap[c.name] = c._id; });

    // Create products
    const productsData = [
      {
        name: 'SuperPhone X1',
        description: 'A flagship smartphone with excellent camera and battery',
        price: 999,
        discount: 10,
        mainImage: 'phone1.jpg',
        additionalImages: ['phone1-1.jpg', 'phone1-2.jpg'],
        descriptionImages: [],
        categories: [catMap['Phones']],
        inStock: true
      },
      {
        name: 'UltraBook Pro 14',
        description: 'Lightweight laptop for professionals',
        price: 1299,
        discount: 15,
        mainImage: 'laptop1.jpg',
        additionalImages: ['laptop1-1.jpg'],
        descriptionImages: [],
        categories: [catMap['Laptops']],
        inStock: true
      },
      {
        name: 'TabView 10',
        description: '10-inch tablet great for reading and media',
        price: 399,
        discount: 5,
        mainImage: 'tablet1.jpg',
        additionalImages: [],
        descriptionImages: [],
        categories: [catMap['Tablets']],
        inStock: true
      },
      {
        name: 'Studio Headphones',
        description: 'Over-ear studio headphones with noise isolation',
        price: 199,
        discount: 0,
        mainImage: 'audio1.jpg',
        additionalImages: [],
        descriptionImages: [],
        categories: [catMap['Audio']],
        inStock: true
      },
      {
        name: 'ActionCam 4K',
        description: 'Rugged 4K action camera',
        price: 249,
        discount: 20,
        mainImage: 'camera1.jpg',
        additionalImages: [],
        descriptionImages: [],
        categories: [catMap['Cameras']],
        inStock: true
      },
      {
        name: 'FitWatch S3',
        description: 'Fitness smartwatch with heart-rate and GPS',
        price: 149,
        discount: 0,
        mainImage: 'wearable1.jpg',
        additionalImages: [],
        descriptionImages: [],
        categories: [catMap['Wearables']],
        inStock: true
      },
      {
        name: 'FastCharge USB-C 65W',
        description: 'High-speed USB-C charger',
        price: 39,
        discount: 0,
        mainImage: 'accessory1.jpg',
        additionalImages: [],
        descriptionImages: [],
        categories: [catMap['Accessories']],
        inStock: true
      },
      {
        name: 'Pro Gaming Controller',
        description: 'Ergonomic controller for serious gamers',
        price: 69,
        discount: 10,
        mainImage: 'gaming1.jpg',
        additionalImages: [],
        descriptionImages: [],
        categories: [catMap['Gaming']],
        inStock: true
      }
    ];

    const createdProducts = await Product.insertMany(productsData);
    console.log(`🛍️  Inserted ${createdProducts.length} products`);

    console.log('✅ Seeding completed.');
    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error('❌ Seeding error:', err);
    await mongoose.disconnect();
    process.exit(1);
  }
}

seed();
