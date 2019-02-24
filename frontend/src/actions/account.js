/* frontend/src/actions/account.js */
// action types
export const LOAD_ACCOUNT = "LOAD_ACCOUNT";
export const LOGOUT_ACCOUNT = "LOGOUT_ACCOUNT";
export const FETCH_ACCOUNT = "FETCH_ACCOUNT";
export const ACCOUNT_FAILURE = "ACCOUNT_FAILURE";
export const TOGGLE_PAYMENT = "TOGGLE_PAYMENT";
export const TOGGLE_TRANSACTIONS = "TOGGLE_TRANSACTIONS";
// action creators
export function loadAccount(account) {
  return { type: LOAD_ACCOUNT, account };
}

export function logoutAccount() {
  return { type: LOGOUT_ACCOUNT };
}

export function fetchAccount() {
  return { type: FETCH_ACCOUNT };
}

export function accountFailure(error) {
  return { type: ACCOUNT_FAILURE, error };
}
export function togglePayment() {
  return { type: TOGGLE_PAYMENT };
}

export function toggleTransactions() {
  return { type: TOGGLE_TRANSACTIONS };
}
