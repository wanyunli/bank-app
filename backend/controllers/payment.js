const Payment = require("../models/payment");
const { findByAccountId, deductBalance, addBalance } = require("./account");
const { createTransaction } = require("./transaction");

async function create(ctx) {
  const result = await findByAccountId(ctx.request.body.receiverAccountId);
  if (result.isSuccess) {
    const receiverAccount = result.account;
    const deductResult = await deductBalance(
      ctx.request.body.transferAccountId,
      ctx.request.body.amount
    );
    if (deductResult.isSuccess) {
      const addResult = await addBalance(
        ctx.request.body.receiverAccountId,
        ctx.request.body.amount
      );
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
          ctx.request.body.transferAccountId,
          ctx.request.body.amount
        );
        ctx.body = addResult;
      }
    } else {
      ctx.body = deductResult;
    }
  } else {
    ctx.body = result;
  }
}
module.exports = {
  create
};
