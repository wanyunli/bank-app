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
  if (isEmpty(result)) {
    console.log("findByAccountId result is1:", result);
    return {
      isSuccess: false,
      error: "Receiver account number do not exit."
    };
  }
  const account = result[0];
  return {
    isSuccess: true,
    account
  };
}

async function create(ctx) {
  // Create New Account from payload sent and save to database
  const newAccount = new Account({
    accountId: "123",
    firstName: "Matti",
    lastName: "Rimpisalo",
    balance: 500000,
    isLocked: false
  });
  const savedAccount = await newAccount.save();
  const newAccount1 = new Account({
    accountId: "456",
    firstName: "Matti",
    lastName: "Rimpisalo",
    balance: 10000,
    isLocked: false
  });
  const savedAccount1 = await newAccount1.save();
  savedAccount1;
}

async function lockAccounts(accounts) {
  const query = {
    accountId: { $in: accounts },
    isLocked: false
  };
  const result = await Account.updateMany(query, {
    $set: { isLocked: true }
  });
  console.log("lockAccounts result is: ", accounts);
  if (result.nModified == 2)
    return {
      isSuccess: true
    };
  else
    return {
      isSuccess: false,
      error: "Online bank is busy now, please try a few seconds later."
    };
  return accounts;
}
async function unlockAccounts(accounts) {
  const query = {
    accountId: { $in: accounts }
  };
  const result = await Account.updateMany(query, {
    $set: { isLocked: false }
  });
  return {
    isSuccess: true
  };
}
module.exports = {
  findOne,
  findByAccountId,
  deductBalance,
  addBalance,
  unlockAccounts,
  lockAccounts
};
