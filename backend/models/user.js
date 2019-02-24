/* models/user.js */
const mongoose = require("mongoose");

// Declare Schema
const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    userName: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    accountId: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

// Declare Model to mongoose with Schema
const User = mongoose.model("User", UserSchema);

// Export Model to be used in Node
module.exports = mongoose.model("User");
