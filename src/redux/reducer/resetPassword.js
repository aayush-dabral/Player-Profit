import {RESET_PASSWORD_INIT, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_FAILURE} from "../actionType";

const initialState = {};

const resetPasswordInit = (state, action) => ({
  ...state,
  resetPassword: {data: {}, status: false, loader: true},
});

const resetPasswordSuccess = (state, action) => ({
  ...state,
  resetPassword: {data: action?.data, status: true, loader: false},
});

const resetPasswordFailure = (state, action) => ({
  ...state,
  resetPassword: {data: action?.data, status: false, loader: false},
});


const resetPasswordReducer = (state = initialState, action) => {
  switch (action.type) {
    case RESET_PASSWORD_INIT:
      return resetPasswordInit(state, action);
    case RESET_PASSWORD_SUCCESS:
      return resetPasswordSuccess(state, action?.payload);
    case RESET_PASSWORD_FAILURE:
      return resetPasswordFailure(state, action?.payload);
    default:
      return state;
  }
};

export default resetPasswordReducer;