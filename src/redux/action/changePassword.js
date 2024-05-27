import { CHANGE_PASSWORD_INIT, CHANGE_PASSWORD_SUCCESS, CHANGE_PASSWORD_FAILURE} from "../actionType"
import * as apiEndpoint from "../../api/Endpoints"
import * as api from "../../api/Request"
import { toast } from "react-toastify"

const changePasswordInit = () => ({
  type: CHANGE_PASSWORD_INIT
})

const changePasswordSuccess = data => ({
  type: CHANGE_PASSWORD_SUCCESS,
  payload: data
})

const changePasswordFailure = error => ({
  type: CHANGE_PASSWORD_FAILURE,
  payload: error
})

export function changePassword(body) {
  return function (dispatch) {
    dispatch(changePasswordInit())
    api
      .PostReqtoken(apiEndpoint.changePassword, JSON.stringify(body))
      .then(response => { console.log("CHANGE PASS RES",response)
        if (response?.status === 200 || response?.status === 201) dispatch(changePasswordSuccess(response))
        else if (response?.status === 400 || response?.status === 401) {
          window.scrollTo(0, 0)
          if(response?.data?.hasOwnProperty("detail")){
            toast.error(`${response?.data["detail"]}`)
          }
          else if(`${response?.data?.hasOwnProperty("new_password2")}`){
            toast.error(`${response?.data["new_password2"][0]}`)
          }
          else{
            toast.success('Something went wrong')
          }
          dispatch(changePasswordFailure(response))
        }
      })
      .catch(error => {
        dispatch(changePasswordFailure(error?.message))
      })
  }
}

export function resetChangePassword() {
  return function (dispatch) {
    dispatch(changePasswordInit());
  }
}
