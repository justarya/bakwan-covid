const mongoose = require('mongoose');

const { Schema } = mongoose;

const ProductSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Product Name is required'],
  },
  unit: {
    type: String,
    default: '',
  },
}, {
  timestamps: true,
  versionKey: false,
});

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;
