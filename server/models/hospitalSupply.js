const mongoose = require('mongoose');

const { Schema } = mongoose;
const mongooseLogs = require('mongoose-activitylogs');

const HospitalSupplySchema = new Schema({
  hospital: {
    type: Schema.Types.ObjectId,
    ref: 'Hospital',
  },
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
  schemaName: 'HospitalSupply',
  createAction: 'created',
  updateAction: 'updated',
  deleteAction: 'removed',
});

const HospitalSupply = mongoose.model('HospitalSupply', HospitalSupplySchema);

module.exports = HospitalSupply;
