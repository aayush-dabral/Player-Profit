import { UPDATE_USER_INIT, UPDATE_USER_SUCCESS, UPDATE_USER_FAILURE, EMAIL_VERIFICATION_INIT, EMAIL_VERIFICATION_SUCCESS, EMAIL_VERIFICATION_FAILURE } from "../actionType"
import * as apiEndpoint from "../../api/Endpoints"
import * as api from "../../api/Request"
import { toast } from "react-toastify"

const updateUserInit = () => ({
  type: UPDATE_USER_INIT
})

const updateUserSuccess = data => ({
  type: UPDATE_USER_SUCCESS,
  payload: data
})

const updateUserFailure = error => ({
  type: UPDATE_USER_FAILURE,
  payload: error
})

const emailVerificationInit = () => ({
  type: EMAIL_VERIFICATION_INIT
})

const emailVerificationSuccess = data => ({
  type: EMAIL_VERIFICATION_SUCCESS,
  payload: data
})

const emailVerificationFailure = error => ({
  type: EMAIL_VERIFICATION_FAILURE,
  payload: error
})

export function updateUser(body) {
  return function (dispatch) {
    dispatch(updateUserInit())
    api
      .PatchReqtoken(apiEndpoint.updateProfile, JSON.stringify(body))
      .then(response => {
        console.log("UPDATE PROFILE RES", response)
        if (response?.status === 200 || response?.status === 201) dispatch(updateUserSuccess(response))
        else if (response?.status === 400) {
          window.scrollTo(0, 0)
          if (response?.data?.hasOwnProperty) {
            toast.error(`${response?.data?.hasOwnProperty("non_field_errors")}`)
          }
          else {
            toast.error('Something went wrong')
          }
          dispatch(updateUserFailure(response))
        }
      })
      .catch(error => {
        dispatch(updateUserFailure(error?.message))
      })
  }
}

export function resetUpdateUser(body) {
  return function (dispatch) {
    dispatch(updateUserInit())
  }
}

export function emailVerificationUser(body) {
  return function (dispatch) {
    dispatch(emailVerificationInit())
    api
      .PatchReqtoken(apiEndpoint.updateProfile, JSON.stringify(body))
      .then(response => {
        console.log("email verify res", response)
        if (response?.status === 200 || response?.status === 201) dispatch(emailVerificationSuccess(response))
        else if (response?.status === 400) {
          window.scrollTo(0, 0)
          if (response?.data?.hasOwnProperty("non_field_errors")) {
            toast.error(`${response?.data["non_field_errors"][0]}`)
          }
          else if (response?.data?.hasOwnProperty("email")) {
            toast.error(`${response?.data["email"][0]}`)
          }
          else {
            toast.error('Something went wrong')
          }
          dispatch(emailVerificationFailure(response))
        }
      })
      .catch(error => {
        dispatch(emailVerificationFailure(error?.message))
      })
  }
}

export function resetEmailVerificationUser(body) {
  return function (dispatch) {
    dispatch(emailVerificationInit())
  }
}
