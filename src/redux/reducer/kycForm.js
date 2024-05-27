import {KYC_FORM_INIT,KYC_FORM_SUCCESS,KYC_FORM_FAILURE} from "../actionType";

const initialState = {};

const kycFormInit = (state, action) => ({
  ...state,
  kycFormDetails: {data: {}, status: false, loader: true},
});

const kycFormSuccess = (state, action) => ({
  ...state,
  kycFormDetails: {data: action?.data, status: true, loader: false},
});

const kycFormFailure = (state, action) => ({
  ...state,
  kycFormDetails: {data: action?.data, status: false, loader: false},
});

const kycFormReducer = (state = initialState, action) => {
  switch (action.type) {
    case KYC_FORM_INIT:
      return kycFormInit(state, action);
    case KYC_FORM_SUCCESS:
      return kycFormSuccess(state, action?.payload);
    case KYC_FORM_FAILURE:
      return kycFormFailure(state, action?.payload);
    default:
      return state;
  }
};

export default kycFormReducer;