const mongoose = require("mongoose");

// Define user schema
const userSchema = new mongoose.Schema({
  UserID: {
    type: Number,
    required: true,
    unique: true
  },
  Username: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true,
    // unique: true
  },
  Password: {
    type: String,
    required: true
  },
  Posts: {
    type: Number,
    required: true
  },
  Streak:{
    type: Number,
    required: true
  }
});

const User = mongoose.model("User", userSchema);
module.exports = User;