/* frontend/src/reducers/payment.js */
import {
  CREATE_PAYMENT,
  CREATE_PAYMENT_SUCCESS,
  CREATE_PAYMENT_FAIL
} from "../actions/payment";

export const PAYMENT_DEFAULT_STATE = {
  saving: false,
  error: "",
  sucess: false,
  payment: {}
};

export default function payment(state = PAYMENT_DEFAULT_STATE, action) {
  switch (action.type) {
    case CREATE_PAYMENT:
      return { ...state, payment: action.payment, saving: true };
    case CREATE_PAYMENT_SUCCESS:
      return {
        ...state,
        payment: {},
        sucess: true,
        saving: false
      };
    case CREATE_PAYMENT_FAIL:
      return {
        error: action.error,
        payment: {},
        sucess: false,
        saving: false
      };
    default:
      return state;
  }
}
