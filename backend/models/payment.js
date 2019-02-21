/* models/payment.js */
const mongoose = require("mongoose");

// Declare Schema
const PaymentSchema = new mongoose.Schema(
  {
    transferAccountId: { type: String },
    receiverAccountId: { type: String },
    transferName: { type: String },
    receiverName: { type: String },
    message: { type: String },
    amount: { type: Number }
  },
  { timestamps: true }
);

// Declare Model to mongoose with Schema
const Payment = mongoose.model("Payment", PaymentSchema);

// Export Model to be used in Node
module.exports = mongoose.model("Payment");
