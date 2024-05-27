import {PACKAGES_LIST_FAILURE,PACKAGES_LIST_SUCCESS,PACKAGES_LIST_INIT } from "../actionType"
import * as apiEndpoint from "../../api/Endpoints"
import * as api from "../../api/Request"
import { toast } from "react-toastify"

const getPackagesListInit = () => ({
  type: PACKAGES_LIST_INIT
})

const getPackagesListSuccess = data => ({
  type: PACKAGES_LIST_SUCCESS,
  payload: data
})

const getPackagesListFailure = error => ({
  type: PACKAGES_LIST_FAILURE,
  payload: error
})

export function getPackagesList() {
  return function (dispatch) {
    dispatch(getPackagesListInit())
    api
      .getReq(apiEndpoint.packagesListUrl)
      .then(response => { 
        ;
        if (response?.status === 200 || response?.status === 201) dispatch(getPackagesListSuccess(response))
        else if (response?.status === 400) {
          window.scrollTo(0, 0)
          toast({
            type: "error",
            props: {
              heading: "Trading",
              desc: response?.data?.hasOwnProperty("non_field_errors") ? response?.data["non_field_errors"][0] : 'Something went wrong'
            }
          })
          dispatch(getPackagesListFailure(response))
        }
      })
      .catch(error => {
        dispatch(getPackagesListFailure(error?.message))
      })
  }
}
