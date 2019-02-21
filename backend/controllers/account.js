const Account = require("../models/account");
const { isEmpty } = require("ramda");

async function findOne(ctx) {
  // Fetch all Todo's from the database and return as payload
  // const insert = await create(ctx);
  const accounts = await Account.find({});
  ctx.body = accounts[0];
}

async function deductBalance(accountId, amount) {
  const result = await Account.find({ accountId });
  if (isEmpty(result))
    return {
      isSuccess: false,
      error: `Account number: ${accountId} do not exit.`
    };
  const account = result[0];
  if (account.balance < amount) {
    return {
      isSuccess: false,
      error: "Your account money is not enought."
    };
  }
  const updatedBalance = account.balance - amount;
  account.balance = updatedBalance;
  // Update todo in database
  const updatedAccount = await account.save();
  return {
    isSuccess: true,
    account: updatedAccount
  };
}

async function addBalance(accountId, amount) {
  const result = await Account.find({ accountId });
  if (isEmpty(result))
    return {
      isSuccess: false,
      error: `Account number: ${accountId} do not exit.`
    };
  const account = result[0];
  const updatedBalance = account.balance + amount;
  account.balance = updatedBalance;
  // Update todo in database
  const updatedAccount = await account.save();
  return {
    isSuccess: true,
    account: updatedAccount
  };
}

async function findByAccountId(accountId) {
  const result = await Account.find({ accountId });
  console.log("findByAccountId result is:", result);
  if (isEmpty(result)) {
    console.log("findByAccountId result is1:", result);
    return {
      isSuccess: false,
      error: "Receiver account number do not exit."
    };
  }
  const account = result[0];
  console.log("findByAccountId result is2:", account);
  return {
    isSuccess: true,
    account
  };
}

async function create(ctx) {
  // Create New Account from payload sent and save to database
  const newAccount = new Account({
    accountId: "987654321",
    firstName: "Matti",
    lastName: "Rimpisalo",
    balance: 500000
  });
  const savedAccount = await newAccount.save();
  savedAccount;
}

module.exports = {
  findOne,
  findByAccountId,
  deductBalance,
  addBalance
};
