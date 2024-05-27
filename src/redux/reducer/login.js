import {LOGIN_INIT, LOGIN_SUCCESS, LOGIN_FAILURE} from "../actionType";

const initialState = {};

const loginInit = (state, action) => ({
  ...state,
  login: {data: {}, status: false, loader: true},
});

const loginSuccess = (state, action) => ({
  ...state,
  login: {data: action?.data, status: true, loader: false},
});

const loginFailure = (state, action) => ({
  ...state,
  login: {data: action?.data, status: false, loader: false},
});


const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_INIT:
      return loginInit(state, action);
    case LOGIN_SUCCESS:
      return loginSuccess(state, action?.payload);
    case LOGIN_FAILURE:
      return loginFailure(state, action?.payload);
    default:
      return state;
  }
};

export default loginReducer;
