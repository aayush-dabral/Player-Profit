import {TRANSACTION_FAILURE,TRANSACTION_INIT,TRANSACTION_SUCCESS } from "../actionType"
import * as apiEndpoint from "../../api/Endpoints"
import * as api from "../../api/Request"
import { toast } from "react-toastify"

const getTransactionInit = () => ({
  type: TRANSACTION_INIT
})

const getTransactionSuccess = data => ({
  type: TRANSACTION_SUCCESS,
  payload: data
})

const getTransactionFailure = error => ({
  type: TRANSACTION_FAILURE,
  payload: error
})

export function getTransactionDetails() {
  return function (dispatch) {
    dispatch(getTransactionInit())
    api
      .getReq(apiEndpoint.getBettingHistoryAPI)
      .then(response => {
        if (response?.status === 200 || response?.status === 201) dispatch(getTransactionSuccess(response))
        else if (response?.status === 400) {
          window.scrollTo(0, 0)
          toast.show({
            type: "error",
            props: {
              heading: "Something went wrong",
              desc: response?.data?.hasOwnProperty("non_field_errors") ? response?.data["non_field_errors"][0] : response?.data["email"][0]
            }
          })
          dispatch(getTransactionFailure(response))
        }
      })
      .catch(error => {
          dispatch(getTransactionFailure(error?.message))
      })
  }
}