import {PAYMENT_HISTORY_FAILURE,PAYMENT_HISTORY_INIT,PAYMENT_HISTORY_SUCCESS} from "../actionType";

const initialState = {};

const getPaymentHistoryInit = (state, action) => ({
  ...state,
  paymentHistory: {data: {}, status: false, loader: true},
});

const getPaymentHistorySuccess = (state, action) => ({
  ...state,
  paymentHistory: {data: action?.data, status: true, loader: false},
});

const getPaymentHistoryFailure = (state, action) => ({
  ...state,
  paymentHistory: {data: action?.data, status: false, loader: false},
});

const getPaymentHistoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case PAYMENT_HISTORY_INIT:
      return getPaymentHistoryInit(state, action);
    case PAYMENT_HISTORY_SUCCESS:
      return getPaymentHistorySuccess(state, action?.payload);
    case PAYMENT_HISTORY_FAILURE:
      return getPaymentHistoryFailure(state, action?.payload);
    default:
      return state;
  }
};

export default getPaymentHistoryReducer;