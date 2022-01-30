const mongoose = require("mongoose");
const userDetailSchema = mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  password1: {
    type: String,
    required: true,
  },
  password2: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    required: true,
    max: 50,
  },
});

module.exports = mongoose.model("userDetails", userDetailSchema);
