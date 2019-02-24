const User = require("../models/user");
const isEmpty = require("../validation/isEmpty");
const validateCreateUserInput = require("../validation/createUser");
const validateLoginInput = require("../validation/login");
const { createAccount, findByAccountId } = require("./account");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

async function createUser(data) {
  const { errors, isValid } = validateCreateUserInput(data);
  if (!isValid) {
    return { error: errors };
  }
  const newUser = new User({
    firstName: data.firstName,
    lastName: data.lastName,
    userName: data.userName,
    password: data.password,
    accountId: data.accountId
  });
  try {
    const pwdHash = await bcrypt.hash(newUser.password, 10, salt);
    newUser.password = pwdHash;
    const savedUser = await newUser.save();
    const savedAccount = await afterHook(savedUser);
    return savedUser;
  } catch (error) {
    return { error };
  }
}

async function afterHook(data) {
  const newAccount = {
    firstName: data.firstName,
    lastName: data.lastName,
    accountId: data.accountId
  };
  const savedAccount = await createAccount(newAccount);
  return savedAccount;
}

async function login(ctx) {
  const { errors, isValid } = validateLoginInput(ctx.request.body);
  if (!isValid) {
    ctx.status = 400;
    ctx.body = { error: errors };
    return;
  }
  const result = await verifyLoginPassword(
    ctx.request.body.password,
    ctx.request.body.userName
  );
  if (result.isSuccess) {
    ctx.body = {
      isSuccess: true,
      token: result.token,
      account: result.account
    };
  } else {
    ctx.status = 400;
    ctx.body = result.error;
  }
}

async function verifyLoginPassword(password, userName) {
  const user = await User.findOne({ userName });
  if (isEmpty(user)) {
    return { error: "Username not found" };
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return { error: "Wrong password" };
  }
  const result = await findByAccountId(user.accountId);
  if (!result.isSuccess) {
    return { error: "Account not found" };
  }
  const payload = { xp: Math.floor(Date.now() / 1000) - 60 * 60 }; // 60 seconds * 60 minutes = 1 hour
  const token = await jwt.sign(payload, process.env.SECRET);
  if (isEmpty(token)) {
    return { error: "There is some error when generate token" };
  }
  return {
    isSuccess: true,
    token,
    account: result.account
  };
}
async function verifyPwdByAccountId(password, accountId) {
  console.log("account id is: ", accountId);
  console.log("password is: ", password);
  const user = await User.findOne({ accountId });
  if (isEmpty(user)) {
    return { error: "User account not found" };
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return { error: "Wrong password" };
  }
  return {
    isSuccess: true
  };
}

module.exports = {
  createUser,
  login,
  verifyPwdByAccountId
};
