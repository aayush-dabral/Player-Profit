import {TRANSACTION_FAILURE,TRANSACTION_SUCCESS,TRANSACTION_INIT} from "../actionType";

const initialState = {};

const getTransactionInit = (state, action) => ({
  ...state,
  paymentHistoryDetails: {data: {}, status: false, loader: true},
});

const getTransactionSuccess = (state, action) => ({
  ...state,
  paymentHistoryDetails: {data: action?.data, status: true, loader: false},
});

const getTransactionFailure = (state, action) => ({
  ...state,
  paymentHistoryDetails: {data: action?.data, status: false, loader: false},
});

const getTransactionReducer = (state = initialState, action) => {
  switch (action.type) {
    case TRANSACTION_INIT:
      return getTransactionInit(state, action);
    case TRANSACTION_SUCCESS:
      return getTransactionSuccess(state, action?.payload);
    case TRANSACTION_FAILURE:
      return getTransactionFailure(state, action?.payload);
    default:
      return state;
  }
};

export default getTransactionReducer;