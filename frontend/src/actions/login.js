export const LOGIN = "LOGIN";
export const LOGIN_FAIL = "LOGIN_FAIL";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";

// action creators
export function login(loginInfo) {
  return { type: LOGIN, loginInfo };
}
export function loginFail(error) {
  return { type: LOGIN_FAIL, error };
}

export function loginSuccess() {
  return { type: LOGIN_SUCCESS };
}
