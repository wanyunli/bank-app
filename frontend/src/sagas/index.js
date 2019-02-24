import { call, put, takeLatest } from "redux-saga/effects";
import { loadAccount, toggleTransactions } from "../actions/account";
import {
  SUBMIT_PAYMENT,
  submitPaymentSuccess,
  submitPaymentFail
} from "../actions/payment";
import {
  FETCH_TRANSACTIONS,
  loadTransactions,
  TransactionsFailure
} from "../actions/transactions";
import { LOGIN, loginFail, loginSuccess } from "../actions/login";

function* createFakeUser() {
  const data = {
    firstName: "Matti",
    lastName: "Rimisalo",
    userName: "mattirim",
    password: "123456",
    password_confirm: "123456",
    accountId: "123456"
  };
  // const data = {
  //   firstName: "Yunli",
  //   lastName: "Wan",
  //   userName: "wanyunli",
  //   password: "654321",
  //   password_confirm: "654321",
  //   accountId: "654321"
  // };
  const options = {
    method: "POST",
    body: JSON.stringify(data),
    headers: new Headers({
      "Content-Type": "application/json"
    })
  };

  const res = yield call(fetch, "login", options);
  const user = yield res.json();
  yield put(loadAccount(user));
}

function* userLogin(action) {
  // const data = {
  //   userName: "mattirim",
  //   password: "123456"
  // };
  // const data = {
  //   userName: "wanyunli",
  //   password: "654321",
  // };
  try {
    const options = {
      method: "POST",
      body: JSON.stringify(action.loginInfo),
      headers: new Headers({
        "Content-Type": "application/json"
      })
    };
    const res = yield call(fetch, "login", options);
    const loginResult = yield res.json();
    if (loginResult.isSuccess) {
      yield put(loginSuccess());
      yield put(loadAccount(loginResult.account));
      sessionStorage.setItem("jwt", loginResult.token);
    } else {
      yield put(loginFail(loginResult.error));
    }
  } catch (error) {
    yield put(loginFail(`Login failed: ${error}`));
  }
}

function* getTransactions(action) {
  const data = { accountId: action.accountId };
  try {
    const token = sessionStorage.getItem("jwt");
    const options = {
      method: "POST",
      body: JSON.stringify(data),
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      })
    };
    const res = yield call(fetch, "v1/transactions", options);
    const transactions = yield res.json();
    yield put(loadTransactions(transactions));
  } catch (e) {
    yield put(TransactionsFailure(e.message));
  }
}

function* submitPayment(action) {
  try {
    const token = sessionStorage.getItem("jwt");
    const options = {
      method: "POST",
      body: JSON.stringify(action.payment),
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      })
    };
    const res = yield call(fetch, "v1/payment", options);
    const result = yield res.json();
    if (result.isSuccess) {
      yield put(loadAccount(result.account));
      yield put(submitPaymentSuccess());
      yield put(toggleTransactions());
    } else {
      yield put(submitPaymentFail(result.error));
    }
  } catch (e) {
    yield put(submitPaymentFail(e.message));
  }
}

function* rootSaga() {
  yield takeLatest(LOGIN, userLogin);
  yield takeLatest(SUBMIT_PAYMENT, submitPayment);
  yield takeLatest(FETCH_TRANSACTIONS, getTransactions);
}

export default rootSaga;
