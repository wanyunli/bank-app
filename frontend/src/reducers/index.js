/* frontend/src/reducers/index.js */
import { combineReducers } from "redux";
import account, { ACCOUNT_DEFAULT_STATE } from "./account";
import payment, { PAYMENT_DEFAULT_STATE } from "./payment";
import transactions, { TRANSACTIONS_DEFAULT_STATE } from "./transactions";

const bankApp = combineReducers({
  account,
  payment,
  transactions
});

export const DEFAULT_STATE = {
  account: ACCOUNT_DEFAULT_STATE,
  payment: PAYMENT_DEFAULT_STATE,
  transactions: TRANSACTIONS_DEFAULT_STATE
};

export default bankApp;
