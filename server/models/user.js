const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { hashPassword } = require('../helper/bcryptjs');
const uniqueValidator = require('mongoose-unique-validator');
const mongooseLogs = require('mongoose-activitylogs');

const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: [true, 'Username required!'],
    min: [10, 'Minimum username length is 10 character!'],
    validate: [(val) => {
      if (val.includes(' ') || val.includes('@') || val.includes('.')) {
        return false;
      }
      return true;
    }, `Username must not contain '@', ' ', '.'`]
  },
  password: {
    type: String,
    minlength: [8, `Password must have min length 8`],
    required: [true, `Password required!`],
  },
  role: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
  versionKey: false,
});

UserSchema.plugin(mongooseLogs, {
  schemaName: 'User',
  createAction: 'created',
  updateAction: 'updated',
  deleteAction: 'removed',
});

UserSchema.pre('save', function() {
  this.password = hashPassword(this.password);
});

UserSchema.plugin(uniqueValidator);

const User = mongoose.model('User', UserSchema);
module.exports = User;
