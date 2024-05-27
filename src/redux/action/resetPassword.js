import {RESET_PASSWORD_INIT, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_FAILURE } from "../actionType"
import * as apiEndpoint from "../../api/Endpoints"
import * as api from "../../api/Request"
import { toast } from "react-toastify"

const resetPasswordInit = () => ({
  type: RESET_PASSWORD_INIT
})

const resetPasswordSuccess = data => ({
  type: RESET_PASSWORD_SUCCESS,
  payload: data
})

const resetPasswordFailure = error => ({
  type: RESET_PASSWORD_FAILURE,
  payload: error
})

export function resetPassword(body) {
  return function (dispatch) {
    dispatch(resetPasswordInit())
    api
      .PostReq(apiEndpoint.resetPassword, JSON.stringify(body))
      .then(response => { console.log("FORGET PASSWORD RES",response)
        if (response?.status === 200 || response?.status === 201) dispatch(resetPasswordSuccess(response))
        else if (response?.status === 400) {
          window.scrollTo(0, 0)
          if(response?.data?.hasOwnProperty("non_field_errors")){
            toast.error(`${response?.data["non_field_errors"][0]}`)
          }
          else{
            toast.error("Something went wrong")
          }
          dispatch(resetPasswordFailure(response))
        }
      })
      .catch(error => {
        dispatch(resetPasswordFailure(error?.message))
      })
  }
}

export function resetStatePassword() {
  return function (dispatch) {
    dispatch(resetPasswordInit())
  }
}