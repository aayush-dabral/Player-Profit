import {RESET_CONFIRM_PASSWORD_INIT, RESET_CONFIRM_PASSWORD_SUCCESS, RESET_CONFIRM_PASSWORD_FAILURE} from "../actionType";

const initialState = {};

const resetConfirmPasswordInit = (state, action) => ({
  ...state,
  resetConfirmPassword: {data: {}, status: false, loader: true},
});

const resetConfirmPasswordSuccess = (state, action) => ({
  ...state,
  resetConfirmPassword: {data: action?.data, status: true, loader: false},
});

const resetConfirmPasswordFailure = (state, action) => ({
  ...state,
  resetConfirmPassword: {data: action?.data, status: false, loader: false},
});


const resetConfirmPasswordReducer = (state = initialState, action) => {
  switch (action.type) {
    case RESET_CONFIRM_PASSWORD_INIT:
      return resetConfirmPasswordInit(state, action);
    case RESET_CONFIRM_PASSWORD_SUCCESS:
      return resetConfirmPasswordSuccess(state, action?.payload);
    case RESET_CONFIRM_PASSWORD_FAILURE:
      return resetConfirmPasswordFailure(state, action?.payload);
    default:
      return state;
  }
};

export default resetConfirmPasswordReducer;