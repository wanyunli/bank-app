/* models/account.js */
const mongoose = require("mongoose");

// Declare Schema
const AccountSchema = new mongoose.Schema(
  {
    accountId: { type: String },
    firstName: { type: String },
    lastName: { type: String },
    balance: { type: Number },
    isLocked: { type: Boolean }
  },
  { timestamps: true }
);

// Declare Model to mongoose with Schema
const Account = mongoose.model("Account", AccountSchema);

// Export Model to be used in Node
module.exports = mongoose.model("Account");
