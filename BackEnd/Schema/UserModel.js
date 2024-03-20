const mongoose = require("mongoose");

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
<<<<<<< Updated upstream
=======
userSchema.pre('save', async function(next) {
  const user = this;
  if (!user.isModified('Password')) return next();

  try {
    const hashedPassword = await bcrypt.hash(user.Password, 10);
    user.Password = hashedPassword;
    next();
  } catch (error) {
    return next(error);
  }
});
>>>>>>> Stashed changes

const User = mongoose.model("User", userSchema);
module.exports = User;
