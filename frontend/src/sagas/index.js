import { call, put, takeLatest } from "redux-saga/effects";
import { FETCH_ACCOUNT, loadAccount, accountFailure } from "../actions/account";
import {
  CREATE_PAYMENT,
  createPaymentSuccess,
  createPaymentFail
} from "../actions/payment";
import {
  FETCH_TRANSACTIONS,
  loadTransactions,
  TransactionsFailure
} from "../actions/transactions";
function* getAccount() {
  try {
    const res = yield call(fetch, "v1/account");
    const account = yield res.json();
    yield put(loadAccount(account));
  } catch (e) {
    yield put(accountFailure(e.message));
  }
}

function* getTransactions(action) {
  const data = { accountId: action.accountId };
  try {
    const options = {
      method: "POST",
      body: JSON.stringify(data),
      headers: new Headers({
        "Content-Type": "application/json"
      })
    };
    const res = yield call(fetch, "v1/transactions", options);
    const transactions = yield res.json();
    yield put(loadTransactions(transactions));
  } catch (e) {
    yield put(TransactionsFailure(e.message));
  }
}

function* savePayment(action) {
  try {
    const options = {
      method: "POST",
      body: JSON.stringify(action.payment),
      headers: new Headers({
        "Content-Type": "application/json"
      })
    };
    const res = yield call(fetch, "v1/payment", options);
    const result = yield res.json();
    if (result.isSuccess) {
      yield put(loadAccount(result.account));
      yield put(createPaymentSuccess());
    } else {
      yield put(createPaymentFail(result.error));
    }
  } catch (e) {
    yield put(createPaymentFail(e.message));
  }
}

function* rootSaga() {
  yield takeLatest(FETCH_ACCOUNT, getAccount);
  yield takeLatest(CREATE_PAYMENT, savePayment);
  yield takeLatest(FETCH_TRANSACTIONS, getTransactions);
}

export default rootSaga;
