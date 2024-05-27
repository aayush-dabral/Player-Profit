import {ADVANCE_STATISTICS_FAILURE,ADVANCE_STATISTICS_SUCCESS,ADVANCE_STATISTICS_INIT } from "../actionType"
import * as apiEndpoint from "../../api/Endpoints"
import * as api from "../../api/Request"
import { toast } from "react-toastify"

const advanceStatisticsInit = () => ({
  type: ADVANCE_STATISTICS_INIT
})

const advanceStatisticsSuccess = data => ({
  type: ADVANCE_STATISTICS_SUCCESS,
  payload: data
})

const advanceStatisticsFailure = error => ({
  type: ADVANCE_STATISTICS_FAILURE,
  payload: error
})

export function getAdvanceStatistics(param) {
  return function (dispatch) {
    dispatch(advanceStatisticsInit())
    api
      .getReqtoken(apiEndpoint.advanceStatisticsUrl + param)
      .then(response => { 
        ;
        if (response?.status === 200 || response?.status === 201) dispatch(advanceStatisticsSuccess(response))
        else if (response?.status === 400) {
          window.scrollTo(0, 0)
          toast({
            type: "error",
            props: {
              heading: "Challange Status",
              desc: response?.data?.hasOwnProperty("non_field_errors") ? response?.data["non_field_errors"][0] : 'Something went wrong'
            }
          })
          dispatch(advanceStatisticsFailure(response))
        }
      })
      .catch(error => {
        dispatch(advanceStatisticsFailure(error?.message))
      })
  }
}
