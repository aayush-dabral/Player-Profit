import {BETTING_HISTORY_INIT, BETTING_HISTORY_SUCCESS, BETTING_HISTORY_FAILURE } from "../actionType"
import * as apiEndpoint from "../../api/Endpoints"
import * as api from "../../api/Request"
import { toast } from "react-toastify"

const getBettingHistoryInit = () => ({
  type: BETTING_HISTORY_INIT
})

const getBettingHistorySuccess = data => ({
  type: BETTING_HISTORY_SUCCESS,
  payload: data
})

const getBettingHistoryFailure = error => ({
  type: BETTING_HISTORY_FAILURE,
  payload: error
})

export function getBettingHistory(param) {
  return function (dispatch) {
    dispatch(getBettingHistoryInit())
    api
      .getReqtoken(apiEndpoint.placeBet + param)
      .then(response => { 
        if (response?.status === 200 || response?.status === 201) dispatch(getBettingHistorySuccess(response))
        else if (response?.status === 400) {
          window.scrollTo(0, 0)
          toast.show({
            type: "error",
            props: {
              heading: "Trading History",
              desc: response?.data?.hasOwnProperty("non_field_errors") ? response?.data["non_field_errors"][0] : "Something went wrong"
            }
          })
          dispatch(getBettingHistoryFailure(response))
        }
      })
      .catch(error => {
        dispatch(getBettingHistoryFailure(error?.message))
      })
  }
}