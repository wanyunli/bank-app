const Payment = require("../models/payment");
const {
  findByAccountId,
  deductBalance,
  addBalance,
  unlockAccounts,
  lockAccounts
} = require("./account");
const { verifyPwdByAccountId } = require("./user");
const { createTransaction, amount } = require("./transaction");

async function create(ctx) {
  const {
    transferAccountId,
    receiverAccountId,
    amount,
    accountId,
    password
  } = ctx.request.body;
  if (receiverAccountId === transferAccountId) {
    ctx.status = 400;
    ctx.body = { error: "Can't transfer money to your own account." };
    return;
  }
  const result = await findByAccountId(receiverAccountId);
  if (!result.isSuccess) {
    ctx.status = 400;
    ctx.body = result;
    return;
  }
  //check the password match
  const pwdVerifyResuted = await verifyPwdByAccountId(password, accountId);
  if (!pwdVerifyResuted.isSuccess) {
    ctx.status = 400;
    ctx.body = pwdVerifyResuted;
    return;
  }
  //lock both transfer account and receiver account
  const lockResult = await lockAccounts([transferAccountId, receiverAccountId]);
  if (!lockResult.isSuccess) {
    ctx.status = 400;
    ctx.body = lockResult;
    return;
  }
  const receiverAccount = result.account;
  const deductResult = await deductBalance(transferAccountId, amount);
  if (!deductResult.isSuccess) {
    ctx.status = 400;
    ctx.body = deductResult;
    return;
  }
  const addResult = await addBalance(receiverAccountId, amount);
  const transferAccount = deductResult.account;
  if (!addResult.isSuccess) {
    // return money back to transfer account
    const transferBackResult = await addBalance(transferAccountId, amount);
    ctx.status = 400;
    ctx.body = addResult;
    return;
  }
  const newPayment = new Payment(ctx.request.body);
  const savedPayment = await newPayment.save();
  const transferName = `${transferAccount.firstName} ${
    transferAccount.lastName
  }`;
  const receiverName = `${receiverAccount.firstName} ${
    receiverAccount.lastName
  }`;
  //save to transaction history
  const deductedTransaction = await createTransaction({
    paymentId: savedPayment._id,
    accountId: savedPayment.transferAccountId,
    transferName: transferName,
    receiverName: receiverName,
    message: savedPayment.message,
    amount: -savedPayment.amount
  });
  const addedTransaction = await createTransaction({
    paymentId: savedPayment._id,
    accountId: savedPayment.receiverAccountId,
    transferName: transferName,
    receiverName: receiverName,
    message: savedPayment.message,
    amount: savedPayment.amount
  });
  //unlcok both transfer account and receiver account
  const unlockResult = await unlockAccounts([
    transferAccountId,
    receiverAccountId
  ]);
  ctx.body = {
    isSuccess: true,
    account: deductResult.account
  };
}
module.exports = {
  create
};
