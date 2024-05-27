import {LEADERBOARD_FAILURE,LEADERBOARD_SUCCESS,LEADERBOARD_INIT } from "../actionType"
import * as apiEndpoint from "../../api/Endpoints"
import * as api from "../../api/Request"
import { toast } from "react-toastify"

const getLeaderboardInit = () => ({
  type: LEADERBOARD_INIT
})

const getLeaderboardSuccess = data => ({
  type: LEADERBOARD_SUCCESS,
  payload: data
})

const getLeaderboardFailure = error => ({
  type: LEADERBOARD_FAILURE,
  payload: error
})

export function getLeaderboard() {
  return function (dispatch) {
    dispatch(getLeaderboardInit())
    api
      .getReq(apiEndpoint.leaderboardUrl)
      .then(response => {
        if (response?.status === 200 || response?.status === 201) dispatch(getLeaderboardSuccess(response))
        else if (response?.status === 400) {
          window.scrollTo(0, 0)
          toast.show({
            type: "error",
            props: {
              heading: "Leaderboard",
              desc: response?.data?.hasOwnProperty("non_field_errors") ? response?.data["non_field_errors"][0] : 'Something went wrong'
            }
          })
          dispatch(getLeaderboardFailure(response))
        }
      })
      .catch(error => {
        dispatch(getLeaderboardFailure(error?.message))
      })
  }
}