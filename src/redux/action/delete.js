import {DELETE_FAILURE,DELETE_INIT,DELETE_SUCCESS } from "../actionType"
import * as apiEndpoint from "../../api/Endpoints"
import * as api from "../../api/Request"
import { toast } from "react-toastify"

const deleteInit = () => ({
  type: DELETE_INIT
})

const deleteSuccess = data => ({
  type: DELETE_SUCCESS,
  payload: data
})

const deleteFailure = error => ({
  type: DELETE_FAILURE,
  payload: error
})

export function deleteAccountAction() {
  return function (dispatch) {
    dispatch(deleteInit())
    api
      .delReq(apiEndpoint.deleteUrl,{})
      .then(response => {
        ;
        if (response?.status === 200 || response?.status === 201) dispatch(deleteSuccess(response))
        else if (response?.status === 400) {
          window.scrollTo(0, 0)
          toast.show({
            type: "Delete Account",
            props: {
              heading: "Something went wrong",
              desc: response?.data?.hasOwnProperty("non_field_errors") ? response?.data["non_field_errors"][0] : 'Something went wrong'
            }
          })
          dispatch(deleteFailure(response))
        }
      })
      .catch(error => {
          dispatch(deleteFailure(error?.message))
      })
  }
}
