import {SPORTS_INIT, SPORTS_SUCCESS, SPORTS_FAILURE} from "../actionType";

const initialState = {};

const sportsGameInit = (state, action) => ({
  ...state,
  sportsName: {data: {}, status: false, loader: true},
});

const sportsGameSuccess = (state, action) => ({
  ...state,
  sportsName: {data: action?.data, status: true, loader: false},
});

const sportsGameFailure = (state, action) => ({
  ...state,
  sportsName: {data: action?.data, status: false, loader: false},
});

const sportsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SPORTS_INIT:
      return sportsGameInit(state, action);
    case SPORTS_SUCCESS:
      return sportsGameSuccess(state, action?.payload);
    case SPORTS_FAILURE:
      return sportsGameFailure(state, action?.payload);
    default:
      return state;
  }
};

export default sportsReducer;