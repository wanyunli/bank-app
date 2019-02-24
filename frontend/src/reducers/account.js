/* frontend/src/reducers/account.js */
import {
  LOAD_ACCOUNT,
  LOGOUT_ACCOUNT,
  FETCH_ACCOUNT,
  TOGGLE_PAYMENT,
  TOGGLE_TRANSACTIONS
} from "../actions/account";

export const ACCOUNT_DEFAULT_STATE = {
  loading: false,
  error: "",
  showPayment: false,
  showTransactions: false,
  account: {},
  isAuthenticated: false
};

export default function account(state = ACCOUNT_DEFAULT_STATE, action) {
  switch (action.type) {
    case LOAD_ACCOUNT:
      return {
        ...state,
        account: action.account,
        loading: false,
        isAuthenticated: true
      };
    case LOGOUT_ACCOUNT:
      sessionStorage.removeItem("jwt");
      return ACCOUNT_DEFAULT_STATE;
    case FETCH_ACCOUNT: {
      return { ...state, loading: true };
    }
    case TOGGLE_PAYMENT: {
      if (state.showTransactions)
        return {
          ...state,
          showPayment: !state.showPayment,
          showTransactions: !state.showTransactions
        };
      else return { ...state, showPayment: !state.showPayment };
    }
    case TOGGLE_TRANSACTIONS: {
      if (state.showPayment)
        return {
          ...state,
          showTransactions: !state.showTransactions,
          showPayment: !state.showPayment
        };
      else return { ...state, showTransactions: !state.showTransactions };
    }
    default:
      return state;
  }
}
