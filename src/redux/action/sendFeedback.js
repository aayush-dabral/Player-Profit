import { SEND_FEEDBACK_INIT, SEND_FEEDBACK_SUCCESS, SEND_FEEDBACK_FAILURE } from "../actionType"
import * as apiEndpoint from "../../api/Endpoints"
import * as api from "../../api/Request"
import { toast } from "react-toastify"

const sendFeedbackInit = () => ({
  type: SEND_FEEDBACK_INIT
})

const sendFeedbackSuccess = data => ({
  type: SEND_FEEDBACK_SUCCESS,
  payload: data
})

const sendFeedbackFailure = error => ({
  type: SEND_FEEDBACK_FAILURE,
  payload: error
})

export function sendFeedback(body) {
  return function (dispatch) {
    dispatch(sendFeedbackInit())
    api
      .PostReq(apiEndpoint.sendFeedbackAPI, JSON.stringify(body))
      .then(response => { 
        if (response?.status === 200 || response?.status === 201) dispatch(sendFeedbackSuccess(response))
        else if (response?.status === 400) {
          window.scrollTo(0, 0)
          if(response?.data?.hasOwnProperty("non_field_errors")){
            toast.error(`${response?.data["non_field_errors"][0]}`)
          }
          else{
            toast.error('Something went wrong.')
          }
          dispatch(sendFeedbackFailure(response))
        }
      })
      .catch(error => {
        dispatch(sendFeedbackFailure(error?.message))
      })
  }
}
export function resetSendFeedback() {
  return function (dispatch) {
    dispatch(sendFeedbackInit())
  }
}