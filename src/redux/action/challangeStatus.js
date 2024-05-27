import {CHALLANGE_STATUS_FAILURE,CHALLANGE_STATUS_SUCCESS,CHALLANGE_STATUS_INIT } from "../actionType"
import * as apiEndpoint from "../../api/Endpoints"
import * as api from "../../api/Request"
import { toast } from "react-toastify"

const challangeStatusInit = () => ({
  type: CHALLANGE_STATUS_INIT
})

const challangeStatusSuccess = data => ({
  type: CHALLANGE_STATUS_SUCCESS,
  payload: data
})

const challangeStatusFailure = error => ({
  type: CHALLANGE_STATUS_FAILURE,
  payload: error
})

export function getChallangeStatus() {
  // console.log(param)
  return function (dispatch) {
    dispatch(challangeStatusInit())
    api
      .getReqtoken(apiEndpoint.challangeStatusUrl)
      .then(response => {
        ;
        if (response?.status === 200 || response?.status === 201) dispatch(challangeStatusSuccess(response))
        else if (response?.status === 400) {
          window.scrollTo(0, 0)
          toast.show({
            type: "error",
            props: {
              heading: "Challange Status",
              desc: response?.data?.hasOwnProperty("non_field_errors") ? response?.data["non_field_errors"][0] : 'Something went wrong'
            }
          })
          dispatch(challangeStatusFailure(response))
        }
      })
      .catch(error => {
        dispatch(challangeStatusFailure(error?.message))
      })
  }
}
