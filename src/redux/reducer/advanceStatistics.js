import {ADVANCE_STATISTICS_FAILURE,ADVANCE_STATISTICS_SUCCESS,ADVANCE_STATISTICS_INIT} from "../actionType";

const initialState = {};

const advanceStatisticsInit = (state, action) => ({
  ...state,
  advanceStatisticsDetails: {data: {}, status: false, loader: true},
});

const advanceStatisticsSuccess = (state, action) => ({
  ...state,
  advanceStatisticsDetails: {data: action?.data, status: true, loader: false},
});

const advanceStatisticsFailure = (state, action) => ({
  ...state,
  advanceStatisticsDetails: {data: action?.data, status: false, loader: false},
});

const advanceStatisticsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADVANCE_STATISTICS_INIT:
      return advanceStatisticsInit(state, action);
    case ADVANCE_STATISTICS_SUCCESS:
      return advanceStatisticsSuccess(state, action?.payload);
    case ADVANCE_STATISTICS_FAILURE:
      return advanceStatisticsFailure(state, action?.payload);
    default:
      return state;
  }
};

export default advanceStatisticsReducer;