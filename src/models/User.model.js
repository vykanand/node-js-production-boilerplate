const mongoose = require('mongoose');
// const validator = require('validator');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const { toJSON, paginate } = require('./plugins');

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 8,
      private: true, // used by the toJSON plugin
    },
    firstname: {
      type: String,
      required: false,
      trim: true
    },
    lastname: {
      type: String,
      required: false,
      trim: true
    },
    virtualmail: {
      type: String,
      required: false,
      trim: true
    },
    virtualcc: {
      type: String,
      required: false,
      trim: true
    },
    token: {
      type: String,
      required: false,
      trim: true
    },
    role: {
      type: String,
      default: 'user',
      trim: true
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
// userSchema.plugin(toJSON);
// userSchema.plugin(paginate);

module.exports = mongoose.model('User', userSchema);
