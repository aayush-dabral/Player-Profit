import {NOTIFICATIONS_FAILURE,NOTIFICATIONS_SUCCESS,NOTIFICATIONS_INIT} from "../actionType";

const initialState = {};

const getNotificationsInit = (state, action) => ({
  ...state,
  notificationDetails: {data: {}, status: false, loader: true},
});

const getNotificationsSuccess = (state, action) => ({
  ...state,
  notificationDetails: {data: action?.data, status: true, loader: false},
});

const getNotificationsFailure = (state, action) => ({
  ...state,
  notificationDetails: {data: action?.data, status: false, loader: false},
});

const notificationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case NOTIFICATIONS_INIT:
      return getNotificationsInit(state, action);
    case NOTIFICATIONS_SUCCESS:
      return getNotificationsSuccess(state, action?.payload);
    case NOTIFICATIONS_FAILURE:
      return getNotificationsFailure(state, action?.payload);
    default:
      return state;
  }
};

export default notificationsReducer;