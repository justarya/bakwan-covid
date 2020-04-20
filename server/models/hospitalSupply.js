const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HospitalSupplySchema = new Schema({
  product_name: {
    type: String,
    required: [true, 'Product name cannot be empty'],
  },
  demand: {
    type: Number,
    required: [true, 'Demand cannot be empty'],
  },
  demand_unit: {
    type: String,
  },
}, {
  timestamps: true,
  versionKey: false,
});

const HospitalSupply = mongoose.model('HospitalSupply', HospitalSupplySchema);

module.exports = HospitalSupply;