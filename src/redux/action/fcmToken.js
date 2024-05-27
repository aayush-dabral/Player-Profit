import { POST_FCM_INIT, POST_FCM_SUCCESS, POST_FCM_FAILURE } from "../actionType"
import * as apiEndpoint from "../../api/Endpoints"
import * as api from "../../api/Request"
import { toast } from "react-toastify"

const userProfileInit = () => ({
  type: POST_FCM_INIT
})

const userProfileSuccess = data => ({
  type: POST_FCM_SUCCESS,
  payload: data
})

const userProfileFailure = error => ({
  type: POST_FCM_FAILURE,
  payload: error
})

export function getToken() {
  return function (dispatch) {
    dispatch(userProfileInit())
    api
      .PostReq(apiEndpoint.postFCMToken)
      .then(response => {
        if (response?.status === 200 || response?.status === 201) {
          dispatch(userProfileSuccess(response))
        }
        // else if (response?.status === 400) {
        //   window.scrollTo(0, 0)
        //   if(response?.data?.hasOwnProperty("non_field_errors")){
        //     toast.error(`${response?.data["non_field_errors"][0]}`)
        //   }
        //   else{
        //     toast.error("Something went wrong")
        //   }
        //   dispatch(userProfileFailure(response))
        // }
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