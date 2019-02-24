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
  const user = await User.findOne({ userName: ctx.request.body.userName });
  if (isEmpty(user)) {
    ctx.status = 400;
    ctx.body = { error: "Username not found" };
    return;
  }
  const isMatch = await bcrypt.compare(
    ctx.request.body.password,
    user.password
  );
  if (!isMatch) {
    ctx.status = 400;
    ctx.body = { error: "Wrong password" };
    return;
  }
  const result = await findByAccountId(user.accountId);
  if (!result.isSuccess) {
    ctx.status = 400;
    ctx.body = { error: "Account not found" };
    return;
  }
  const payload = { xp: Math.floor(Date.now() / 1000) - 60 * 60 }; // 60 seconds * 60 minutes = 1 hour
  const token = await jwt.sign(payload, process.env.SECRET);
  if (isEmpty(token)) {
    ctx.status = 400;
    ctx.body = { error: "There is some error when generate token" };
    return;
  }
  ctx.body = {
    isSuccess: true,
    token: `Bearer ${token}`,
    account: result.account
  };
}

module.exports = {
  createUser,
  login
};
