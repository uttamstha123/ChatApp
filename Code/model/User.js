const mongoose = require("mongoose");
// const { date } = require("joi");
const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model("users", userSchema);
