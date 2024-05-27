import {WITHDRAWAL_INIT, WITHDRAWAL_SUCCESS, WITHDRAWAL_FAILURE} from "../actionType";

const initialState = {};

const withdrawalInit = (state, action) => ({
  ...state,
  withdrawal: {data: {}, status: false, loader: true},
});

const withdrawalSuccess = (state, action) => ({
  ...state,
  withdrawal: {data: action?.data, status: true, loader: false},
});

const withdrawalFailure = (state, action) => ({
  ...state,
  withdrawal: {data: action?.data, status: false, loader: false},
});


const withdrawalReducer = (state = initialState, action) => {
  switch (action.type) {
    case WITHDRAWAL_INIT:
      return withdrawalInit(state, action);
    case WITHDRAWAL_SUCCESS:
      return withdrawalSuccess(state, action?.payload);
    case WITHDRAWAL_FAILURE:
      return withdrawalFailure(state, action?.payload);
    default:
      return state;
  }
};

export default withdrawalReducer;
