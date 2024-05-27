import { WITHDRAWAL_INIT, WITHDRAWAL_SUCCESS, WITHDRAWAL_FAILURE } from "../actionType"
import * as apiEndpoint from "../../api/Endpoints"
import * as api from "../../api/Request"
import { toast } from "react-toastify"

const withdrawalInit = () => ({
  type: WITHDRAWAL_INIT
})

const withdrawalSuccess = data => ({
  type: WITHDRAWAL_SUCCESS,
  payload: data
})

const withdrawalFailure = error => ({
  type: WITHDRAWAL_FAILURE,
  payload: error
})

export function withdrawal(body) {
  return function (dispatch) {
    dispatch(withdrawalInit())
    api
      .PostReq(apiEndpoint.withdrawal, JSON.stringify(body))
      .then(response => {
        if (response?.status === 200 || response?.status === 201) dispatch(withdrawalSuccess(response))
        else if (response?.status === 400) {
          window.scrollTo(0, 0)
          toast.show({
            type: "error",
            props: {
              heading: "Withdrawal",
              desc: response?.data?.hasOwnProperty("non_field_errors") ? response?.data["non_field_errors"][0] : "Something went wrong."
            }
          })
          dispatch(withdrawalFailure(response))
        }
      })
      .catch(error => {
        dispatch(withdrawalFailure(error?.message))
      })
  }
}
export function resetWithdrawal(body) {
  return function (dispatch) {
    dispatch(withdrawalInit())
  }
}