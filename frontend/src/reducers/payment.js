/* frontend/src/reducers/payment.js */
import {
  SUBMIT_PAYMENT,
  SUBMIT_PAYMENT_SUCCESS,
  SUBMIT_PAYMENT_FAIL,
  CLEAR_ERROR
} from "../actions/payment";

export const PAYMENT_DEFAULT_STATE = {
  isSubmitting: false,
  error: "",
  sucess: false,
  payment: {}
};

export default function payment(state = PAYMENT_DEFAULT_STATE, action) {
  switch (action.type) {
    case SUBMIT_PAYMENT:
      return { ...state, payment: action.payment, isSubmitting: true };
    case SUBMIT_PAYMENT_SUCCESS:
      return {
        ...state,
        payment: {},
        sucess: true,
        saving: false,
        isSubmitting: false
      };
    case SUBMIT_PAYMENT_FAIL:
      return {
        error: action.error,
        payment: {},
        sucess: false,
        isSubmitting: false
      };
    case CLEAR_ERROR:
      return {
        ...state,
        error: ""
      };
    default:
      return state;
  }
}
