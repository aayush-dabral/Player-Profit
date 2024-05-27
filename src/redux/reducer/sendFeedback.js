import {SEND_FEEDBACK_INIT, SEND_FEEDBACK_SUCCESS, SEND_FEEDBACK_FAILURE} from "../actionType";

const initialState = {};

const sendFeedbackInit = (state, action) => ({
  ...state,
  sendFeedback: {data: {}, status: false, loader: true},
});

const sendFeedbackSuccess = (state, action) => ({
  ...state,
  sendFeedback: {data: action?.data, status: true, loader: false},
});

const sendFeedbackFailure = (state, action) => ({
  ...state,
  sendFeedback: {data: action?.data, status: false, loader: false},
});


const sendFeedbackReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEND_FEEDBACK_INIT:
      return sendFeedbackInit(state, action);
    case SEND_FEEDBACK_SUCCESS:
      return sendFeedbackSuccess(state, action?.payload);
    case SEND_FEEDBACK_FAILURE:
      return sendFeedbackFailure(state, action?.payload);
    default:
      return state;
  }
};

export default sendFeedbackReducer;