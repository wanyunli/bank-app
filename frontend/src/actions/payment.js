export const SUBMIT_PAYMENT = "SUBMIT_PAYMENT";
export const SUBMIT_PAYMENT_SUCCESS = "SUBMIT_PAYMENT_SUCCESS";
export const SUBMIT_PAYMENT_FAIL = "SUBMIT_PAYMENT_FAIL";
export const CLEAR_ERROR = "CLEAR_ERROR";

// action creators
export function submitPayment(payment) {
  return { type: SUBMIT_PAYMENT, payment };
}
export function submitPaymentSuccess() {
  return { type: SUBMIT_PAYMENT_SUCCESS };
}
export function submitPaymentFail(error) {
  return { type: SUBMIT_PAYMENT_FAIL, error };
}
export function clearError() {
  return { type: CLEAR_ERROR };
}
