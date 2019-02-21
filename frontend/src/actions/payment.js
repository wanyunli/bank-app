export const CREATE_PAYMENT = "CREATE_PAYMENT";
export const CREATE_PAYMENT_SUCCESS = "CREATE_PAYMENT_SUCCESS";
export const CREATE_PAYMENT_FAIL = "CREATE_PAYMENT_FAIL";

// action creators
export function createPayment(payment) {
  return { type: CREATE_PAYMENT, payment };
}
export function createPaymentSuccess() {
  return { type: CREATE_PAYMENT_SUCCESS };
}
export function createPaymentFail(error) {
  return { type: CREATE_PAYMENT_FAIL, error };
}
