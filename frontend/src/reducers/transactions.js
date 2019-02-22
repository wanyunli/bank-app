/* frontend/src/reducers/account.js */
import { LOAD_TRANSACTIONS, FETCH_TRANSACTIONS } from "../actions/transactions";

export const TRANSACTIONS_DEFAULT_STATE = {
  loading: false,
  error: "",
  transactions: []
};

export default function transactions(
  state = TRANSACTIONS_DEFAULT_STATE,
  action
) {
  switch (action.type) {
    case LOAD_TRANSACTIONS:
      return { ...state, transactions: action.transactions, loading: false };

    case FETCH_TRANSACTIONS: {
      return { ...state, loading: true };
    }
    default:
      return state;
  }
}
