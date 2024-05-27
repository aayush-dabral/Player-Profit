import {PLACE_BET_INIT, PLACE_BET_SUCCESS, PLACE_BET_FAILURE} from "../actionType";

const initialState = {};

const placeBetInit = (state, action) => ({
  ...state,
  placeBet: {data: {}, status: false, loader: true},
});

const placeBetSuccess = (state, action) => ({
  ...state,
  placeBet: {data: action?.data, status: true, loader: false},
});

const placeBetFailure = (state, action) => ({
  ...state,
  placeBet: {data: action?.data, status: false, loader: false},
});


const placeBetReducer = (state = initialState, action) => {
  switch (action.type) {
    case PLACE_BET_INIT:
      return placeBetInit(state, action);
    case PLACE_BET_SUCCESS:
      return placeBetSuccess(state, action?.payload);
    case PLACE_BET_FAILURE:
      return placeBetFailure(state, action?.payload);
    default:
      return state;
  }
};

export default placeBetReducer;