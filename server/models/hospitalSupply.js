const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var mongooseLogs = require('mongoose-activitylogs');

const HospitalSupplySchema = new Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
  },
  demand: {
    type: Number,
    required: [true, 'Demand cannot be empty'],
  },
}, {
  timestamps: true,
  versionKey: false,
});

HospitalSupplySchema.plugin(mongooseLogs, {
  schemaName: "Hospital Supply",
  createAction: "Created",
  updateAction: "Updated",
  deleteAction: "Removed" 
});

const HospitalSupply = mongoose.model('HospitalSupply', HospitalSupplySchema);

module.exports = HospitalSupply;