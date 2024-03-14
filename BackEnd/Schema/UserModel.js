const mongoose = require("mongoose");

// Define user schema
const userSchema = new mongoose.Schema({
  Username: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  Password: {
    type: String,
    required: true
  },
  Email: { 
    type: String,
    required: true,
    unique: true
  },
  Posts: {
    type: Number,
    default: 0
  },
  Streak: {
    type: Number,
    default: 0
  }
});

const User = mongoose.model("User", userSchema);
module.exports = User;
