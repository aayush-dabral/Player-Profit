import {BETTING_HISTORY_INIT, BETTING_HISTORY_SUCCESS, BETTING_HISTORY_FAILURE} from "../actionType";

const initialState = {};

const bettingHistoryInit = (state, action) => ({
  ...state,
  bettingHistory: {data: {}, status: false, loader: true},
});

const bettingHistorySuccess = (state, action) => ({
  ...state,
  bettingHistory: {data: action?.data, status: true, loader: false},
});

const bettingHistoryFailure = (state, action) => ({
  ...state,
  bettingHistory: {data: action?.data, status: false, loader: false},
});


const bettingHistoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case BETTING_HISTORY_INIT:
      return bettingHistoryInit(state, action);
    case BETTING_HISTORY_SUCCESS:
      return bettingHistorySuccess(state, action?.payload);
    case BETTING_HISTORY_FAILURE:
      return bettingHistoryFailure(state, action?.payload);
    default:
      return state;
  }
};

export default bettingHistoryReducer;