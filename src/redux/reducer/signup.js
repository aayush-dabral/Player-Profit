import {SIGN_UP_INIT, SIGN_UP_SUCCESS, SIGN_UP_FAILURE} from "../actionType";

const initialState = {};

const signupInit = (state, action) => ({
  ...state,
  signup: {data: {}, status: false, loader: true},
});

const signupSuccess = (state, action) => ({
  ...state,
  signup: {data: action?.data, status: true, loader: false},
});

const signupFailure = (state, action) => ({
  ...state,
  signup: {data: action?.data, status: false, loader: false},
});


const signupReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_UP_INIT:
      return signupInit(state, action);
    case SIGN_UP_SUCCESS:
      return signupSuccess(state, action?.payload);
    case SIGN_UP_FAILURE:
      return signupFailure(state, action?.payload);
    default:
      return state;
  }
};

export default signupReducer;