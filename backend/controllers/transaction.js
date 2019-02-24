const Transaction = require("../models/transaction");

async function findByAccountId(ctx) {
  const transaction = await Transaction.find(
    { accountId: ctx.request.body.accountId },
    { _id: 0 },
    { sort: "-createdAt" }
  );
  ctx.body = transaction;
}

async function createTransaction({
  paymentId,
  accountId,
  transferName,
  receiverName,
  message,
  amount
}) {
  const newTransaction = new Transaction({
    paymentId,
    accountId,
    transferName,
    receiverName,
    message,
    amount
  });
  const savedTransaction = await newTransaction.save();
  return savedTransaction;
}

module.exports = {
  createTransaction,
  findByAccountId
};
