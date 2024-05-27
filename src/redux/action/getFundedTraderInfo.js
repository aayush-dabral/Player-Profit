import { FUNDED_TRADER_FAILURE, FUNDED_TRADER_INIT, FUNDED_TRADER_SUCCESS } from "../actionType"
import * as apiEndpoint from "../../api/Endpoints"
import * as api from "../../api/Request"
import { toast } from "react-toastify"

const getFundedTraderInit = () => ({
  type: FUNDED_TRADER_INIT
})

const getFundedTraderSuccess = data => ({
  type: FUNDED_TRADER_SUCCESS,
  payload: data
})

const getFundedTraderFailure = error => ({
  type: FUNDED_TRADER_FAILURE,
  payload: error
})

export function getFundedTraderInformation(body) {
  return function (dispatch) {
    dispatch(getFundedTraderInit())
    api
      .getReqtoken(apiEndpoint.getFundedTraderInfo,JSON.stringify(body))
      .then(response => { 
        if (response?.status === 200 || response?.status === 201) dispatch(getFundedTraderSuccess(response))
        else if (response?.status === 400) {
          window.scrollTo(0, 0)
          toast.show({
            type: "error",
            props: {
              heading: "Funded Trader",
              desc: response?.data?.hasOwnProperty("non_field_errors") ? response?.data["non_field_errors"][0] : "Something went wrong"
            }
          })
          dispatch(getFundedTraderFailure(response))
        }
      })
      .catch(error => {
        dispatch(getFundedTraderFailure(error?.message))
      })
  }
}