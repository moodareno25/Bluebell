const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    default: ''
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  discount: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  discountedPrice: {
    type: Number,
    default: function() {
      return this.price - (this.price * this.discount / 100);
    }
  },
  mainImage: {
    type: String,
    required: true
  },
  additionalImages: {
    type: [String],
    default: []
  },
  descriptionImages: {
    type: [String],
    default: []
  },
  categories: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Category',
    required: true
  },
  inStock: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Pre-save hook to calculate discounted price
productSchema.pre('save', function(next) {
  this.discountedPrice = this.price - (this.price * this.discount / 100);
  next();
});

module.exports = mongoose.model('Product', productSchema);
