import { USER_PROFILE_INIT, USER_PROFILE_SUCCESS, USER_PROFILE_FAILURE } from "../actionType";

const initialState = {};

const userProfileInit = (state, action) => ({
  ...state,
  userProfile: {data: {}, status: false, loader: true},
});

const userProfileSuccess = (state, action) => ({
  ...state,
  userProfile: {data: action?.data, status: true, loader: false},
});

const userProfileFailure = (state, action) => ({
  ...state,
  userProfile: {data: action?.data, status: false, loader: false},
});


const userProfileReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_PROFILE_INIT:
      return userProfileInit(state, action);
    case USER_PROFILE_SUCCESS:
      return userProfileSuccess(state, action?.payload);
    case USER_PROFILE_FAILURE:
      return userProfileFailure(state, action?.payload);
    default:
      return state;
  }
};

export default userProfileReducer;