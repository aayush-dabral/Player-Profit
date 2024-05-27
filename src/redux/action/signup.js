import { SIGN_UP_INIT, SIGN_UP_SUCCESS, SIGN_UP_FAILURE } from "../actionType"
import * as apiEndpoint from "../../api/Endpoints"
import * as api from "../../api/Request"
import { toast } from "react-toastify"

const signupInit = () => ({
  type: SIGN_UP_INIT
})

const signupSuccess = data => ({
  type: SIGN_UP_SUCCESS,
  payload: data
})

const signupFailure = error => ({
  type: SIGN_UP_FAILURE,
  payload: error
})

export function signup(body) {
  return function (dispatch) {
    dispatch(signupInit())
    api
      .PostReq(apiEndpoint.signup, JSON.stringify(body))
      .then(response => {
        if (response?.status === 200 || response?.status === 201) dispatch(signupSuccess(response))
        else if (response?.status === 400) {
          window.scrollTo(0, 0)
          toast.show({
            type: "error",
            props: {
              heading: "Signup",
              desc: response?.data?.hasOwnProperty("non_field_errors") ? response?.data["non_field_errors"][0] : response?.data?.hasOwnProperty("email") ? response?.data["email"][0] : response?.data?.hasOwnProperty("password") ? response?.data["password"][0] : "Something went wrong"
            }
          })
          dispatch(signupFailure(response))
        }
      })
      .catch(error => {
        dispatch(signupFailure(error?.message))
      })
  }
}

export function resetSignup(body) {
  return function (dispatch) {
    dispatch(signupInit())
  }
}