const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongooseLogs = require('mongoose-activitylogs');

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