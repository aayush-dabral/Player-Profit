import {CHALLANGE_STATUS_FAILURE,CHALLANGE_STATUS_SUCCESS,CHALLANGE_STATUS_INIT} from "../actionType";

const initialState = {};

const challangeStatusInit = (state, action) => {
  console.log("coming done here");
  if (state.challangeStatusDetails && state.challangeStatusDetails.data) {
    
    return state;
  } else {
    return {
      ...state,
      challangeStatusDetails: {data: {}, status: false, loader: true},
    };
  }
};

const challangeStatusSuccess = (state, action) => {
  if (JSON.stringify(state.challangeStatusDetails.data) === JSON.stringify(action?.data)) {
    return state;
  } else {
    return {
      ...state,
      challangeStatusDetails: {data: action?.data, status: true, loader: false},
    };
  }
};

const challangeStatusFailure = (state, action) => ({
  ...state,
  challangeStatusDetails: {data: action?.data, status: false, loader: false},
});

const challangeStatusReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHALLANGE_STATUS_INIT:
      return challangeStatusInit(state, action);
    case CHALLANGE_STATUS_SUCCESS:
      return challangeStatusSuccess(state, action?.payload);
    case CHALLANGE_STATUS_FAILURE:
      return challangeStatusFailure(state, action?.payload);
    default:
      return state;
  }
};

export default challangeStatusReducer;