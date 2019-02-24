const Account = require("../models/account");
const isEmpty = require("../validation/isEmpty");

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

async function createAccount(data) {
  // Create New Account from payload sent and save to database
  const newAccount = new Account({
    accountId: data.accountId,
    firstName: data.firstName,
    lastName: data.lastName,
    balance: 0,
    isLocked: false
  });
  const savedAccount = await newAccount.save();
  return savedAccount;
}

async function lockAccounts(accounts) {
  const query = {
    accountId: { $in: accounts },
    isLocked: false
  };
  const result = await Account.updateMany(query, {
    $set: { isLocked: true }
  });
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
  createAccount,
  findByAccountId,
  deductBalance,
  addBalance,
  unlockAccounts,
  lockAccounts
};
