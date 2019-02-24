const Validator = require("validator");
const isEmpty = require("../validation/isEmpty");

module.exports = function validateLoginInput(data) {
  let errors = [];
  data.userName = !isEmpty(data.userName) ? data.userName : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (Validator.isEmpty(data.userName)) {
    errors.push("Username is required");
  }

  if (!Validator.isLength(data.password, { min: 6, max: 6 })) {
    errors.push("Password must have 6 chars");
  }

  if (Validator.isEmpty(data.password)) {
    errors.push("Password is required");
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
