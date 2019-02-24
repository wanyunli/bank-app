const Validator = require("validator");
const isEmpty = require("../validation/isEmpty");

module.exports = function validateCreateUserInput(data) {
  let errors = [];
  data.firstName = !isEmpty(data.firstName) ? data.firstName : "";
  data.lastName = !isEmpty(data.lastName) ? data.lastName : "";
  data.userName = !isEmpty(data.userName) ? data.userName : "";
  data.accountId = !isEmpty(data.accountId) ? data.accountId : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password_confirm = !isEmpty(data.password_confirm)
    ? data.password_confirm
    : "";

  if (!Validator.isLength(data.firstName, { min: 2, max: 30 })) {
    errors.push("First name must be between 2 to 30 chars");
  }

  if (Validator.isEmpty(data.firstName)) {
    errors.push("First name field is required");
  }

  if (!Validator.isLength(data.lastName, { min: 2, max: 30 })) {
    errors.push("Last name must be between 2 to 30 chars");
  }

  if (Validator.isEmpty(data.lastName)) {
    errors.push("Last name field is required");
  }

  if (!Validator.isLength(data.userName, { min: 6, max: 10 })) {
    errors.push("User name must be between 6 to 10 chars");
  }

  if (Validator.isEmpty(data.userName)) {
    errors.push("User name field is required");
  }

  if (!Validator.isLength(data.accountId, { min: 6, max: 10 })) {
    errors.push("Accoutn id must be between 6 to 10 chars");
  }

  if (Validator.isEmpty(data.accountId)) {
    errors.push("Accoutn id field is required");
  }

  if (!Validator.isLength(data.password, { min: 6, max: 6 })) {
    errors.push("Password must have 6 chars");
  }

  if (Validator.isEmpty(data.password)) {
    errors.push("Password is required");
  }

  if (!Validator.isLength(data.password_confirm, { min: 6, max: 6 })) {
    errors.push("Password must have 6 chars");
  }

  if (!Validator.equals(data.password, data.password_confirm)) {
    errors.push("Password and Confirm Password must match");
  }

  if (Validator.isEmpty(data.password_confirm)) {
    errors.push("Password is required");
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
