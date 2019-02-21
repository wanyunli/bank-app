/* frontend/src/reducers/account.js */
import {
  LOAD_ACCOUNT,
  FETCH_ACCOUNT,
  TOGGLE_PAYMENT,
  TOGGLE_TRANSACTIONS
} from "../actions/account";

export const ACCOUNT_DEFAULT_STATE = {
  loading: false,
  error: "",
  showPayment: false,
  showTransactions: false,
  account: {}
};

export default function account(state = ACCOUNT_DEFAULT_STATE, action) {
  switch (action.type) {
    case LOAD_ACCOUNT:
      return { ...state, account: action.account, loading: false };

    case FETCH_ACCOUNT: {
      return { ...state, loading: true };
    }
    case TOGGLE_PAYMENT: {
      return { ...state, showPayment: !state.showPayment };
    }
    case TOGGLE_TRANSACTIONS: {
      return { ...state, showTransactions: !state.showTransactions };
    }
    default:
      return state;
  }
}
