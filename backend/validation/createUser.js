const Validator = require("validator");
const isEmpty = require("../validation/isEmpty");

module.exports = function validateCreateUserInput(data) {
  let errors = {};
  data.firstName = !isEmpty(data.firstName) ? data.firstName : "";
  data.lastName = !isEmpty(data.lastName) ? data.lastName : "";
  data.userName = !isEmpty(data.userName) ? data.userName : "";
  data.accountId = !isEmpty(data.accountId) ? data.accountId : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password_confirm = !isEmpty(data.password_confirm)
    ? data.password_confirm
    : "";

  if (!Validator.isLength(data.firstName, { min: 2, max: 30 })) {
    errors.firstName = "First name must be between 2 to 30 chars";
  }

  if (Validator.isEmpty(data.firstName)) {
    errors.firstName = "First name field is required";
  }

  if (!Validator.isLength(data.lastName, { min: 2, max: 30 })) {
    errors.lastName = "Last name must be between 2 to 30 chars";
  }

  if (Validator.isEmpty(data.lastName)) {
    errors.lastName = "Last name field is required";
  }

  if (!Validator.isLength(data.userName, { min: 6, max: 10 })) {
    errors.userName = "User name must be between 6 to 10 chars";
  }

  if (Validator.isEmpty(data.userName)) {
    errors.userName = "User name field is required";
  }

  if (!Validator.isLength(data.accountId, { min: 6, max: 10 })) {
    errors.accountId = "Accoutn id must be between 6 to 10 chars";
  }

  if (Validator.isEmpty(data.accountId)) {
    errors.accountId = "Accoutn id field is required";
  }

  if (!Validator.isLength(data.password, { min: 6, max: 6 })) {
    errors.password = "Password must have 6 chars";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password is required";
  }

  if (!Validator.isLength(data.password_confirm, { min: 6, max: 30 })) {
    errors.password_confirm = "Password must have 6 chars";
  }

  if (!Validator.equals(data.password, data.password_confirm)) {
    errors.password_confirm = "Password and Confirm Password must match";
  }

  if (Validator.isEmpty(data.password_confirm)) {
    errors.password_confirm = "Password is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
