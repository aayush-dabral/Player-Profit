import { EMAIL_VERIFICATION_INIT, EMAIL_VERIFICATION_SUCCESS, EMAIL_VERIFICATION_FAILURE } from "../actionType";

const initialState = {};

const emailVerificationUserInit = (state, action) => ({
  ...state,
  emailVerificationUser: {data: {}, status: false, loader: true},
});

const emailVerificationUserSuccess = (state, action) => ({
  ...state,
  emailVerificationUser: {data: action?.data, status: true, loader: false},
});

const emailVerificationUserFailure = (state, action) => ({
  ...state,
  emailVerificationUser: {data: action?.data, status: false, loader: false},
});


const emailVerificationUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case EMAIL_VERIFICATION_INIT:
      return emailVerificationUserInit(state, action);
    case EMAIL_VERIFICATION_SUCCESS:
      return emailVerificationUserSuccess(state, action?.payload);
    case EMAIL_VERIFICATION_FAILURE:
      return emailVerificationUserFailure(state, action?.payload);
    default:
      return state;
  }
};

export default emailVerificationUserReducer;