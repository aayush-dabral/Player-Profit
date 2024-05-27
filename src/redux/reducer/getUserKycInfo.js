import {USER_KYC_INFO_FAILURE, USER_KYC_INFO_INIT, USER_KYC_INFO_SUCCESS} from "../actionType";

const initialState = {};

const getUserKycInfoInit = (state, action) => ({
  ...state,
  userKycInfo: {data: {}, status: false, loader: true},
});

const getUserKycInfoSuccess = (state, action) => ({
  ...state,
  userKycInfo: {data: action?.data, status: true, loader: false},
});

const getUserKycInfoFailure = (state, action) => ({
  ...state,
  userKycInfo: {data: action?.data, status: false, loader: false},
});

const getUserKycInfoReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_KYC_INFO_INIT:
      return getUserKycInfoInit(state, action);
    case USER_KYC_INFO_SUCCESS:
      return getUserKycInfoSuccess(state, action?.payload);
    case USER_KYC_INFO_FAILURE:
      return getUserKycInfoFailure(state, action?.payload);
    default:
      return state;
  }
};

export default getUserKycInfoReducer;