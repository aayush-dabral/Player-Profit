import {PAYMENT_FAILURE,PAYMENT_INIT,PAYMENT_SUCCESS} from "../actionType";

const initialState = {};

const postPaymentInit = (state, action) => ({
  ...state,
  paymentDetails: {data: {}, status: false, loader: true},
});

const postPaymentSuccess = (state, action) => ({
  ...state,
  paymentDetails: {data: action?.data, status: true, loader: false},
});

const postPaymentFailure = (state, action) => ({
  ...state,
  paymentDetails: {data: action?.data, status: false, loader: false},
});

const paymentReducer = (state = initialState, action) => {
  switch (action.type) {
    case PAYMENT_INIT:
      return postPaymentInit(state, action);
    case PAYMENT_SUCCESS:
      return postPaymentSuccess(state, action?.payload);
    case PAYMENT_FAILURE:
      return postPaymentFailure(state, action?.payload);
    default:
      return state;
  }
};

export default paymentReducer;