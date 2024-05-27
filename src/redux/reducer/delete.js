import {DELETE_FAILURE,DELETE_SUCCESS,DELETE_INIT} from "../actionType";

const initialState = {};

const deleteInit = (state, action) => ({
  ...state,
  deleteAccount: {data: {}, status: false, loader: true},
});

const deleteSuccess = (state, action) => ({
  ...state,
  deleteAccount: {data: action?.data, status: true, loader: false},
});

const deleteFailure = (state, action) => ({
  ...state,
  deleteAccount: {data: action?.data, status: false, loader: false},
});

const deleteReducer = (state = initialState, action) => {
  switch (action.type) {
    case DELETE_INIT:
      return deleteInit(state, action);
    case DELETE_SUCCESS:
      return deleteSuccess(state, action?.payload);
    case DELETE_FAILURE:
      return deleteFailure(state, action?.payload);
    default:
      return state;
  }
};

export default deleteReducer;