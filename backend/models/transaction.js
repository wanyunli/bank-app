/* models/transaction.js */
const mongoose = require("mongoose");

// Declare Schema
const TransactionSchema = new mongoose.Schema(
  {
    paymentId: { type: String },
    accountId: { type: String },
    transferName: { type: String },
    receiverName: { type: String },
    message: { type: String },
    amount: { type: Number }
  },
  { timestamps: true }
);

// Declare Model to mongoose with Schema
const Transaction = mongoose.model("Transaction", TransactionSchema);

// Export Model to be used in Node
module.exports = mongoose.model("Transaction");
