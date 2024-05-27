import { PLACE_BET_INIT, PLACE_BET_SUCCESS, PLACE_BET_FAILURE } from "../actionType"
import * as apiEndpoint from "../../api/Endpoints"
import {userProfile} from "./userProfile";
import * as api from "../../api/Request"
import {toast} from 'react-toastify'
import { getChallangeStatus } from "./challangeStatus";

const placeBetInit = () => ({
  type: PLACE_BET_INIT
})

const placeBetSuccess = data => ({
  type: PLACE_BET_SUCCESS,
  payload: data
})

const placeBetFailure = error => ({
  type: PLACE_BET_FAILURE,
  payload: error
})

export function placeBet(body, button1, button2) {
  return function (dispatch) {
    dispatch(placeBetInit())
    api
      .PostReqtoken(apiEndpoint.placeBet, JSON.stringify(body))
      .then(response => { console.log("PLACE BET RES",response)
        if (response?.status === 200 || response?.status === 201) {
          dispatch(placeBetSuccess(response))
          dispatch(userProfile())
          dispatch(getChallangeStatus());
          button1.removeAttribute('disabled');
          button2.removeAttribute('disabled');
        } else if (response?.status === 400) {
          window.scrollTo(0, 0)
          toast.error(`${response?.data["non_field_errors"][0]}`
          //   {
          //   type: "error",
          //   props: {
          //     heading: "Trading",
          //     desc: response?.data?.hasOwnProperty("non_field_errors") ? response?.data["non_field_errors"][0] : "Something went wrong"
          //   }
          // }
          )
          dispatch(placeBetFailure(response))
          button1.removeAttribute('disabled');
          button2.removeAttribute('disabled');
        }
      })
      .catch(error => {
        dispatch(placeBetFailure(error?.message))
      })
  }
}

export function resetplaceBet() {
  return function (dispatch) {
    dispatch(placeBetInit())
  }
}
