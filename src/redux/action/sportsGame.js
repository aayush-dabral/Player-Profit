import {SPORTS_GAMES_INIT, SPORTS_GAMES_SUCCESS, SPORTS_GAMES_FAILURE } from "../actionType"
import * as apiEndpoint from "../../api/Endpoints"
import * as api from "../../api/Request"
import { toast } from "react-toastify"

const getSportsGameInit = () => ({
  type: SPORTS_GAMES_INIT
})

const getSportsGameSuccess = data => ({
  type: SPORTS_GAMES_SUCCESS,
  payload: data
})

const getSportsGameFailure = error => ({
  type: SPORTS_GAMES_FAILURE,
  payload: error
})

export function getSportsGame(body) {
  return function (dispatch) {
    dispatch(getSportsGameInit())
    api
      .getReq(apiEndpoint.oddsjamFetchOdds + body)
      .then(response => {  
        // console.log("MATCH RES",response)
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