import {SURVEY_FORM_FAILURE,SURVEY_FORM_INIT,SURVEY_FORM_SUCCESS} from "../actionType";

const initialState = {};

const surveyFormInit = (state, action) => ({
  ...state,
  surveyFormDetails: {data: {}, status: false, loader: true},
});

const surveyFormSuccess = (state, action) => ({
  ...state,
  surveyFormDetails: {data: action?.data, status: true, loader: false},
});

const surveyFormFailure = (state, action) => ({
  ...state,
  surveyFormDetails: {data: action?.data, status: false, loader: false},
});

const surveyFormReducer = (state = initialState, action) => {
  switch (action.type) {
    case SURVEY_FORM_INIT:
      return surveyFormInit(state, action);
    case SURVEY_FORM_SUCCESS:
      return surveyFormSuccess(state, action?.payload);
    case SURVEY_FORM_FAILURE:
      return surveyFormFailure(state, action?.payload);
    default:
      return state;
  }
};

export default surveyFormReducer;