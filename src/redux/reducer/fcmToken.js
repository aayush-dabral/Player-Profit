import {POST_FCM_INIT, POST_FCM_SUCCESS, POST_FCM_FAILURE} from "../actionType";

const initialState = {};

const fcmTokenInit = (state, action) => ({
  ...state,
  fcmData: {data: {}, status: false, loader: true},
});

const fcmTokenSuccess = (state, action) => ({
  ...state,
  fcmData: {data: action?.data, status: true, loader: false},
});

const fcmTokenFailure = (state, action) => ({
  ...state,
  fcmData: {data: action?.data, status: false, loader: false},
});

const fcmTokenReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_FCM_INIT:
      return fcmTokenInit(state, action);
    case POST_FCM_SUCCESS:
      return fcmTokenSuccess(state, action?.payload);
    case POST_FCM_FAILURE:
      return fcmTokenFailure(state, action?.payload);
    default:
      return state;
  }
};

export default fcmTokenReducer;