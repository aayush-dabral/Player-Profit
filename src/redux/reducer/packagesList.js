import {PACKAGES_LIST_FAILURE,PACKAGES_LIST_SUCCESS,PACKAGES_LIST_INIT} from "../actionType";

const initialState = {};

const getPackagesListInit = (state, action) => ({
  ...state,
  packagesList: {data: {}, status: false, loader: true},
});

const getPackagesListSuccess = (state, action) => ({
  ...state,
  packagesList: {data: action?.data, status: true, loader: false},
});

const getPackagesListFailure = (state, action) => ({
  ...state,
  packagesList: {data: action?.data, status: false, loader: false},
});

const packagesListReducer = (state = initialState, action) => {
  switch (action.type) {
    case PACKAGES_LIST_INIT:
      return getPackagesListInit(state, action);
    case PACKAGES_LIST_SUCCESS:
      return getPackagesListSuccess(state, action?.payload);
    case PACKAGES_LIST_FAILURE:
      return getPackagesListFailure(state, action?.payload);
    default:
      return state;
  }
};

export default packagesListReducer;