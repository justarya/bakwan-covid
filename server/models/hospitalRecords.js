const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HospitalRecordsSchema = new Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
  },
  demand_before: {
    type: Number,
  },
  demand_after: {
    type: Number,
  },
  description: {
    type: String,
  }
}, {
  timestamps: true,
  versionKey: false,
});

const HospitalRecords = mongoose.model('HospitalRecords', HospitalRecordsSchema);

module.exports = HospitalRecords;