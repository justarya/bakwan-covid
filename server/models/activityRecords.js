const mongoose = require('mongoose');

const { Schema } = mongoose;

const ActivityRecordsSchema = new Schema({
  collectionType: {
    type: String,
  },
  referenceDocument: {
    type: Object,
  },
  action: {
    type: String,
  },
}, {
  timestamps: true,
  versionKey: false,
});

const ActivityRecords = mongoose.model('ActivityLogs', ActivityRecordsSchema);

module.exports = ActivityRecords;
