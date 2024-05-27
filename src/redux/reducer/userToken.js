import {USER_TOKEN_SUCCESS, USER_TOKEN_FAILURE } from "../actionType";

const initialState = {};

const userTokenSuccess = (state, action) => ({
  ...state,
  userToken: {data: action?.data, status: true, loader: false},
});

const userTokenFailure = (state, action) => ({
  ...state,
  userToken: {data: {}, status: false, loader: false},
});


const userTokenReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_TOKEN_SUCCESS:
      return userTokenSuccess(state, action?.payload);
    case USER_TOKEN_FAILURE:
      return userTokenFailure(state, action?.payload);
    default:
      return state;
  }
};

export default userTokenReducer;