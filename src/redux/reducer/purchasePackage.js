import { PURCHASE_PACKAGE_INIT, PURCHASE_PACKAGE_SUCCESS, PURCHASE_PACKAGE_FAILURE } from "../actionType"

const initialState = {};

const purchasePackageInit = (state, action) => ({
  ...state,
  purchasePackage: {data: {}, status: false, loader: true},
});

const purchasePackageSuccess = (state, action) => ({
  ...state,
  purchasePackage: {data: action?.data, status: true, loader: false},
});

const purchasePackageFailure = (state, action) => ({
  ...state,
  purchasePackage: {data: action?.data, status: false, loader: false},
});


const purchasePackageReducer = (state = initialState, action) => {
  switch (action.type) {
    case PURCHASE_PACKAGE_INIT:
      return purchasePackageInit(state, action);
    case PURCHASE_PACKAGE_SUCCESS:
      return purchasePackageSuccess(state, action?.payload);
    case PURCHASE_PACKAGE_FAILURE:
      return purchasePackageFailure(state, action?.payload);
    default:
      return state;
  }
};

export default purchasePackageReducer;
