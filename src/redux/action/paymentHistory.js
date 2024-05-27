import {PAYMENT_HISTORY_FAILURE,PAYMENT_HISTORY_SUCCESS,PAYMENT_HISTORY_INIT } from "../actionType"
import * as apiEndpoint from "../../api/Endpoints"
import * as api from "../../api/Request"
import { toast } from "react-toastify"

const getPaymentHistoryInit = () => ({
  type: PAYMENT_HISTORY_INIT
})

const getPaymentHistorySuccess = data => ({
  type: PAYMENT_HISTORY_SUCCESS,
  payload: data
})

const getPaymentHistoryFailure = error => ({
  type: PAYMENT_HISTORY_FAILURE,
  payload: error
})

export function getPaymentHistory(param) {
  return function (dispatch) {
    dispatch(getPaymentHistoryInit())
    api
      .getReqtoken(apiEndpoint.paymentHistory + param)
      .then(response => {
        if (response?.status === 200 || response?.status === 201) dispatch(getPaymentHistorySuccess(response))
        else if (response?.status === 400) {
          window.scrollTo(0, 0)
          toast.show({
            type: "error",
            props: {
              heading: "Payment History",
              desc: response?.data?.hasOwnProperty("non_field_errors") ? response?.data["non_field_errors"][0] : "Something went wrong"
            }
          })
          dispatch(getPaymentHistoryFailure(response))
        }
      })
      .catch(error => {
        dispatch(getPaymentHistoryFailure(error?.message))
      })
  }
}

export function resetPaymentHistory(param) {
  return function (dispatch) {
    dispatch(getPaymentHistoryInit())
  }
}