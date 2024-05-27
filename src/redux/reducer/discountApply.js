import {
  DISCOUNT_APPLY_FAILURE,
  DISCOUNT_APPLY_SUCCESS,
  DISCOUNT_APPLY_INIT
} from "../actionType"

const initialState = {}

const discountApplyInit = (state, action) => ({
  ...state,
  discountApplyDetails: { data: {}, status: false, loader: true }
})

const discountApplySuccess = (state, action) => ({
  ...state,
  discountApplyDetails: { data: action?.data, status: true, loader: false }
})

const discountApplyFailure = (state, action) => ({
  ...state,
  discountApplyDetails: { data: action?.data, status: false, loader: false }
})

const discountApplyReducer = (state = initialState, action) => {
  switch (action.type) {
    case DISCOUNT_APPLY_INIT:
      return discountApplyInit(state, action)
    case DISCOUNT_APPLY_SUCCESS:
      return discountApplySuccess(state, action?.payload)
    case DISCOUNT_APPLY_FAILURE:
      return discountApplyFailure(state, action?.payload)
    default:
      return state
  }
}

export default discountApplyReducer