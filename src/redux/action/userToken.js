import { USER_TOKEN_SUCCESS, USER_TOKEN_FAILURE, CLEAR_REDUX_STATE  } from "../actionType"

const userTokenSuccess = data => ({
  type: USER_TOKEN_SUCCESS,
  payload: data
})

const userTokenFailure = () => ({
  type: USER_TOKEN_FAILURE,
})

export function userToken(body) {
  return function (dispatch) {
    dispatch(userTokenSuccess(body));
  }
}
export function resetUserToken() {
  return function (dispatch) {
    dispatch(userTokenFailure())
  }
}

export const clearReduxState = () => ({
  type: CLEAR_REDUX_STATE,
});