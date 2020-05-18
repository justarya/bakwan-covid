const mongoose = require('mongoose');

const { Schema } = mongoose;
const uniqueValidator = require('mongoose-unique-validator');

const HospitalSchema = new Schema({
  users: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],
  supplies: [{
    type: Schema.Types.ObjectId,
    ref: 'HospitalSupply',
  }],
  name: {
    type: String,
    required: [true, 'Name required!'],
  },
  contact_numbers: [{
    type: String,
    required: [true, 'Contact Number required!'],
  }],
  email: {
    type: String,
    unique: true,
    validate: [function (val) {
      return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(val);
    }, 'Email not valid'],
  },
  location: {
    type: String,
  },
}, {
  timestamps: true,
  versionKey: false,
});

const Hospital = mongoose.model('Hospital', HospitalSchema);

HospitalSchema.plugin(uniqueValidator);

module.exports = Hospital;
