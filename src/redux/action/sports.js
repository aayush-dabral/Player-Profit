import {SPORTS_INIT, SPORTS_SUCCESS, SPORTS_FAILURE } from "../actionType"
import * as apiEndpoint from "../../api/Endpoints"
import * as api from "../../api/Request"
import { toast } from "react-toastify"

const getSportsGameInit = () => ({
  type: SPORTS_INIT
})

const getSportsGameSuccess = data => ({
  type: SPORTS_SUCCESS,
  payload: data
})

const getSportsGameFailure = error => ({
  type: SPORTS_FAILURE,
  payload: error
})

export function getSports() {
  return function (dispatch) {
    dispatch(getSportsGameInit())
    api
      .getReq(apiEndpoint.oddsjamFetchSport)
      .then(response => {  console.log("ODDS SPORTS",response)
        if (response?.status === 200 || response?.status === 201) dispatch(getSportsGameSuccess(response))
        else if (response?.status === 400) {
          window.scrollTo(0, 0)
          toast({
            type: "error",
            props: {
              heading: "Trading",
              desc: response?.data?.hasOwnProperty("non_field_errors") ? response?.data["non_field_errors"][0] : "Something went wrong"
            }
          })
          dispatch(getSportsGameFailure(response))
        }
      })
      .catch(error => {
        dispatch(getSportsGameFailure(error?.message))
      })
  }
}