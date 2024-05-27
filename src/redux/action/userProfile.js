import { USER_PROFILE_INIT, USER_PROFILE_SUCCESS, USER_PROFILE_FAILURE } from "../actionType"
import * as apiEndpoint from "../../api/Endpoints"
import * as api from "../../api/Request"
import { toast } from "react-toastify"

const userProfileInit = () => ({
  type: USER_PROFILE_INIT
})

const userProfileSuccess = data => ({
  type: USER_PROFILE_SUCCESS,
  payload: data
})

const userProfileFailure = error => ({
  type: USER_PROFILE_FAILURE,
  payload: error
})

export function userProfile(body) {
  return function (dispatch) {
    dispatch(userProfileInit())
    api
      .getReqtoken(apiEndpoint.userProfile, JSON.stringify(body))
      .then(response => {
        if (response?.status === 200 || response?.status === 201) {
          const data = JSON.stringify(response?.data)
          localStorage.setItem("userData",data)
          dispatch(userProfileSuccess(response))
        }
        else if (response?.status === 400) {
          window.scrollTo(0, 0)
          if(response?.data?.hasOwnProperty("non_field_errors")){
            toast.error(`${response?.data["non_field_errors"][0]}`)
          }
          else{
            toast.error("Something went wrong")
          }
          dispatch(userProfileFailure(response))
        }
      })
      .catch(error => {
        dispatch(userProfileFailure(error?.message))
      })
  }
}

export function resetUserProfile() {
  return function (dispatch) {
    dispatch(userProfileInit())
  }
}