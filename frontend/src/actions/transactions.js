/* frontend/src/actions/transactions.js */
// action types
export const LOAD_TRANSACTIONS = "LOAD_TRANSACTIONS";
export const FETCH_TRANSACTIONS = "FETCH_TRANSACTIONS";
export const TRANSACTIONS_FAILURE = "TRANSACTIONS_FAILURE";
// action creators
export function loadTransactions(transactions) {
  return { type: LOAD_TRANSACTIONS, transactions };
}

export function fetchTransactions(accountId) {
  return { type: FETCH_TRANSACTIONS, accountId };
}

export function TransactionsFailure(error) {
  return { type: TRANSACTIONS_FAILURE, error };
}
