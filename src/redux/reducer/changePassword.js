import {CHANGE_PASSWORD_INIT, CHANGE_PASSWORD_SUCCESS, CHANGE_PASSWORD_FAILURE} from "../actionType";

const initialState = {};

const changePasswordInit = (state, action) => ({
  ...state,
  changePassword: {data: {}, status: false, loader: true},
});

const changePasswordSuccess = (state, action) => ({
  ...state,
  changePassword: {data: action?.data, status: true, loader: false},
});

const changePasswordFailure = (state, action) => ({
  ...state,
  changePassword: {data: action?.data, status: false, loader: false},
});


const changePasswordReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_PASSWORD_INIT:
      return changePasswordInit(state, action);
    case CHANGE_PASSWORD_SUCCESS:
      return changePasswordSuccess(state, action?.payload);
    case CHANGE_PASSWORD_FAILURE:
      return changePasswordFailure(state, action?.payload);
    default:
      return state;
  }
};

export default changePasswordReducer;