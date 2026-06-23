const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const fs = require('fs');
const path = require('path');

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find().populate('categories');
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Search products
router.get('/search/:query', async (req, res) => {
  try {
    const query = req.params.query;
    const products = await Product.find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } }
      ]
    }).populate('categories');
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get products by category
router.get('/category/:categoryId', async (req, res) => {
  try {
    const products = await Product.find({ categories: req.params.categoryId }).populate('categories');
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get discounted products
router.get('/discounted', async (req, res) => {
  try {
    const products = await Product.find({ discount: { $gt: 0 } }).populate('categories');
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get product by ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('categories');
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create new product
router.post('/', async (req, res) => {
  try {
    const { name, description, price, discount, mainImage, additionalImages, descriptionImages, categories, inStock } = req.body;
    const product = new Product({
      name,
      description,
      price,
      discount,
      mainImage,
      additionalImages,
      descriptionImages,
      categories,
      inStock
    });
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update product
router.put('/:id', async (req, res) => {
  try {
    const { name, description, price, discount, mainImage, additionalImages, descriptionImages, categories, inStock } = req.body;
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name,
        description,
        price,
        discount,
        mainImage,
        additionalImages,
        descriptionImages,
        categories,
        inStock,
        updatedAt: Date.now()
      },
      { new: true }
    ).populate('categories');
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete product and its images
router.delete('/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Delete images from file system
    const imagesDir = path.join(__dirname, '../Images');
    
    // Delete main image
    if (product.mainImage) {
      const mainImagePath = path.join(imagesDir, product.mainImage);
      if (fs.existsSync(mainImagePath)) {
        fs.unlinkSync(mainImagePath);
      }
    }

    // Delete additional images
    product.additionalImages.forEach(img => {
      const imagePath = path.join(imagesDir, img);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    });

    // Delete description images
    product.descriptionImages.forEach(img => {
      const imagePath = path.join(imagesDir, img);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    });

    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
