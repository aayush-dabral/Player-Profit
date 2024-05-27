import { UPDATE_USER_INIT, UPDATE_USER_SUCCESS, UPDATE_USER_FAILURE } from "../actionType";

const initialState = {};

const updateProfileInit = (state, action) => ({
  ...state,
  updateProfile: {data: {}, status: false, loader: true},
});

const updateProfileSuccess = (state, action) => ({
  ...state,
  updateProfile: {data: action?.data, status: true, loader: false},
});

const updateProfileFailure = (state, action) => ({
  ...state,
  updateProfile: {data: action?.data, status: false, loader: false},
});


const updateProfileReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_USER_INIT:
      return updateProfileInit(state, action);
    case UPDATE_USER_SUCCESS:
      return updateProfileSuccess(state, action?.payload);
    case UPDATE_USER_FAILURE:
      return updateProfileFailure(state, action?.payload);
    default:
      return state;
  }
};

export default updateProfileReducer;