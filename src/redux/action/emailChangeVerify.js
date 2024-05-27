import { EMAIL_CHANGE_VERIFY_INIT, EMAIL_CHANGE_VERIFY_SUCCESS, EMAIL_CHANGE_VERIFY_FAILURE } from "../actionType"
import * as apiEndpoint from "../../api/Endpoints"
import * as api from "../../api/Request"
import { toast } from "react-toastify"

const emailChangeVerifyInit = () => ({
  type: EMAIL_CHANGE_VERIFY_INIT
})

const emailChangeVerifySuccess = data => ({
  type: EMAIL_CHANGE_VERIFY_SUCCESS,
  payload: data
})

const emailChangeVerifyFailure = error => ({
  type: EMAIL_CHANGE_VERIFY_FAILURE,
  payload: error
})

export function emailChangeVerify(body) {
  return function (dispatch) {
    dispatch(emailChangeVerifyInit())
    api
      .PostReq(apiEndpoint.emailChangeVerify, JSON.stringify(body))
      .then(response => {
        if (response?.status === 200 || response?.status === 201) dispatch(emailChangeVerifySuccess(response))
        else if (response?.status === 400) {
          window.scrollTo(0, 0)
          toast.show({
            type: "error",
            props: {
              heading: "Email Verify",
              desc: response?.data?.hasOwnProperty("error") ? response?.data?.error : response?.data?.hasOwnProperty("token") ? "Token required": "Something went wrong"
            }
          })
          dispatch(emailChangeVerifyFailure(response))
        }
      })
      .catch(error => {
        dispatch(emailChangeVerifyFailure(error?.message))
      })
  }
}

export function resetEmailVerify() {
  return function (dispatch) {
    dispatch(emailChangeVerifyInit())
  }
}