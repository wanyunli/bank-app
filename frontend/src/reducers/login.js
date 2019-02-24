/* frontend/src/reducers/login.js */
import { LOGIN, LOGIN_SUCCESS, LOGIN_FAIL } from "../actions/login";

export const LOGIN_DEFAULT_STATE = {
  isLogging: false,
  error: ""
};

export default function login(state = LOGIN_DEFAULT_STATE, action) {
  switch (action.type) {
    case LOGIN:
      return { ...state, isLogging: true };
    case LOGIN_SUCCESS:
      return { ...state, isLogging: false };
    case LOGIN_FAIL:
      return {
        error: action.error,
        isLogging: false
      };
    default:
      return state;
  }
}
