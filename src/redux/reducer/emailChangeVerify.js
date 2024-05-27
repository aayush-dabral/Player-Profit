import {
  EMAIL_CHANGE_VERIFY_INIT,
  EMAIL_CHANGE_VERIFY_SUCCESS,
  EMAIL_CHANGE_VERIFY_FAILURE
} from "../actionType"

const initialState = {}

const emailChangeVerifyInit = (state, action) => ({
  ...state,
  emailChangeVerify: { data: {}, status: false, loader: true }
})

const emailChangeVerifySuccess = (state, action) => ({
  ...state,
  emailChangeVerify: { data: action?.data, status: true, loader: false }
})

const emailChangeVerifyFailure = (state, action) => ({
  ...state,
  emailChangeVerify: { data: action?.data, status: false, loader: false }
})

const emailChangeVerifyReducer = (state = initialState, action) => {
  switch (action.type) {
    case EMAIL_CHANGE_VERIFY_INIT:
      return emailChangeVerifyInit(state, action)
    case EMAIL_CHANGE_VERIFY_SUCCESS:
      return emailChangeVerifySuccess(state, action?.payload)
    case EMAIL_CHANGE_VERIFY_FAILURE:
      return emailChangeVerifyFailure(state, action?.payload)
    default:
      return state
  }
}

export default emailChangeVerifyReducer
