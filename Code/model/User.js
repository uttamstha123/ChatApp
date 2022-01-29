const mongoose = require("mongoose");
const { date } = require("joi");
const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  createdAt: {
    type: date,
    default: Date.now(),
  },
});

module.exports = mongoose.model(userSchema, "User");
