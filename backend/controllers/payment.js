const Payment = require("../models/payment");
const {
  findByAccountId,
  deductBalance,
  addBalance,
  unlockAccounts,
  lockAccounts
} = require("./account");
const { createTransaction, amount } = require("./transaction");

async function create(ctx) {
  const { transferAccountId, receiverAccountId, amount } = ctx.request.body;
  const result = await findByAccountId(receiverAccountId);
  if (result.isSuccess) {
    //lock both transfer account and receiver account
    const lockResult = await lockAccounts([
      transferAccountId,
      receiverAccountId
    ]);
    if (lockResult.isSuccess) {
      const receiverAccount = result.account;
      const deductResult = await deductBalance(transferAccountId, amount);
      if (deductResult.isSuccess) {
        const addResult = await addBalance(receiverAccountId, amount);
        const transferAccount = deductResult.account;
        if (addResult.isSuccess) {
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
          ctx.body = {
            isSuccess: true,
            account: deductResult.account
          };
        } else {
          // return money back to transfer account
          const transferBackResult = await addBalance(
            transferAccountId,
            amount
          );
          ctx.body = addResult;
        }
      } else {
        ctx.body = deductResult;
      }
    } else {
      ctx.body = lockResult;
    }
    //unlcok both transfer account and receiver account
    const unlockResult = await unlockAccounts([
      transferAccountId,
      receiverAccountId
    ]);
  } else {
    ctx.body = result;
  }
}
module.exports = {
  create
};
