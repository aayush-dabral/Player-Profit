import {BETTING_HISTORY_FAILURE,BETTING_HISTORY_SUCCESS,BETTING_HISTORY_INIT} from "../actionType";

const initialState = {};

const getBettingHistoryInit = (state, action) => {
  if (state.bettingHistoryDetails && state.bettingHistoryDetails.data) {
    return state;
  } else {
    return {
      ...state,
      bettingHistoryDetails: {data: {}, status: false, loader: true},
    };
  }
};

const getBettingHistorySuccess = (state, action) => {
  if (JSON.stringify(state.bettingHistoryDetails?.data) === JSON.stringify(action?.data)) {
    return state;
  } else {
    return {
      ...state,
      bettingHistoryDetails: {data: action?.data, status: true, loader: false},
    };
  }
};

const getBettingHistoryFailure = (state, action) => ({
  ...state,
  bettingHistoryDetails: {data: action?.data, status: false, loader: false},
});

const getBettingHistoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case BETTING_HISTORY_INIT:
      return getBettingHistoryInit(state, action);
    case BETTING_HISTORY_SUCCESS:
      return getBettingHistorySuccess(state, action?.payload);
    case BETTING_HISTORY_FAILURE:
      return getBettingHistoryFailure(state, action?.payload);
    default:
      return state;
  }
};

export default getBettingHistoryReducer;