import {GOOGLE_SIGNIN_INIT, GOOGLE_SIGNIN_SUCCESS, GOOGLE_SIGNIN_FAILURE} from "../actionType";

const initialState = {};

const googleSignInInit = (state, action) => ({
  ...state,
  googleSignIn: {data: {}, status: false, loader: true},
});

const googleSignInSuccess = (state, action) => ({
  ...state,
  googleSignIn: {data: action?.data, status: true, loader: false},
});

const googleSignInFailure = (state, action) => ({
  ...state,
  googleSignIn: {data: action?.data, status: false, loader: false},
});


const googleSignInReducer = (state = initialState, action) => {
  switch (action.type) {
    case GOOGLE_SIGNIN_INIT:
      return googleSignInInit(state, action);
    case GOOGLE_SIGNIN_SUCCESS:
      return googleSignInSuccess(state, action?.payload);
    case GOOGLE_SIGNIN_FAILURE:
      return googleSignInFailure(state, action?.payload);
    default:
      return state;
  }
};

export default googleSignInReducer;
