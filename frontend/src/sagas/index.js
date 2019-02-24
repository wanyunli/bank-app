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
import { LOGIN, loginFail, loginSuccess } from "../actions/login";
function* getAccount() {
  try {
    const res = yield call(fetch, "v1/account");
    const account = yield res.json();
    yield put(loadAccount(account));
  } catch (e) {
    yield put(accountFailure(e.message));
  }
}

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
  console.log("user is :", user);
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
    console.log("login result is", loginResult);
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

function* savePayment(action) {
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
      yield put(createPaymentSuccess());
    } else {
      yield put(createPaymentFail(result.error));
    }
  } catch (e) {
    yield put(createPaymentFail(e.message));
  }
}

function* rootSaga() {
  // yield takeLatest(FETCH_ACCOUNT, getAccount);
  yield takeLatest(LOGIN, userLogin);
  yield takeLatest(CREATE_PAYMENT, savePayment);
  yield takeLatest(FETCH_TRANSACTIONS, getTransactions);
}

export default rootSaga;
