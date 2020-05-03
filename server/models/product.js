const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var mongooseLogs = require('mongoose-activitylogs');

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

ProductSchema.plugin(mongooseLogs, {
  schemaName: "Product",
  createAction: "Created",
  updateAction: "Updated",
  deleteAction: "Removed" 
});

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;