import { FUNDED_TRADER_FAILURE, FUNDED_TRADER_INIT, FUNDED_TRADER_SUCCESS } from "../actionType";

const initialState = {};

const fundedTraderInit = (state, action) => ({
  ...state,
  fundedTrader: {data: {}, status: false, loader: true},
});

const fundedTraderSuccess = (state, action) => ({
  ...state,
  fundedTrader: {data: action?.data, status: true, loader: false},
});

const fundedTraderFailure = (state, action) => ({
  ...state,
  fundedTrader: {data: action?.data, status: false, loader: false},
});


const fundedTraderReducer = (state = initialState, action) => {
  switch (action.type) {
    case FUNDED_TRADER_INIT:
      return fundedTraderInit(state, action);
    case FUNDED_TRADER_SUCCESS:
      return fundedTraderSuccess(state, action?.payload);
    case FUNDED_TRADER_FAILURE:
      return fundedTraderFailure(state, action?.payload);
    default:
      return state;
  }
};

export default fundedTraderReducer;