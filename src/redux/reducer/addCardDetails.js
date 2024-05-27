import {ADD_CARD_DETAILS_INIT, ADD_CARD_DETAILS_SUCCESS, ADD_CARD_DETAILS_FAILURE} from "../actionType";

const initialState = {};

const addCardDetailsInit = (state, action) => ({
  ...state,
  addCardDetails: {data: {}, status: false, loader: true},
});

const addCardDetailsSuccess = (state, action) => ({
  ...state,
  addCardDetails: {data: action?.data, status: true, loader: false},
});

const addCardDetailsFailure = (state, action) => ({
  ...state,
  addCardDetails: {data: action?.data, status: false, loader: false},
});


const addCardDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CARD_DETAILS_INIT:
      return addCardDetailsInit(state, action);
    case ADD_CARD_DETAILS_SUCCESS:
      return addCardDetailsSuccess(state, action?.payload);
    case ADD_CARD_DETAILS_FAILURE:
      return addCardDetailsFailure(state, action?.payload);
    default:
      return state;
  }
};

export default addCardDetailsReducer;