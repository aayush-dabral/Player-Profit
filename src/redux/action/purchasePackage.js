import { PURCHASE_PACKAGE_INIT, PURCHASE_PACKAGE_SUCCESS, PURCHASE_PACKAGE_FAILURE } from "../actionType"
import * as apiEndpoint from "../../api/Endpoints"
import * as api from "../../api/Request"
import { toast } from "react-toastify"

const purchasePackageInit = () => ({
  type: PURCHASE_PACKAGE_INIT
})

const purchasePackageSuccess = data => ({
  type: PURCHASE_PACKAGE_SUCCESS,
  payload: data
})

const purchasePackageFailure = error => ({
  type: PURCHASE_PACKAGE_FAILURE,
  payload: error
})

export function purchasePackage(body) {
  return function (dispatch) {
    dispatch(purchasePackageInit())
    api
      .PostReqtoken(apiEndpoint.packagesListUrl, JSON.stringify(body))
      .then(response => {
        if (response?.status === 200 || response?.status === 201) {
          dispatch(purchasePackageSuccess(response))
        } else if (response?.status === 400 || response?.status === 401) {
          window.scrollTo(0,0)
          toast.show({
            type: "error",
            props: {
              heading: "Purchase Package",
              desc: response?.data?.hasOwnProperty("non_field_errors") ? response?.data["non_field_errors"][0] : response?.data?.hasOwnProperty("detail") ?  response?.data?.detail : "Something went wrong"
            }
          })
          dispatch(purchasePackageFailure(response))
        }
      })
      .catch(error => {
        dispatch(purchasePackageFailure(error?.message))
      })
  }
}

export function resetpurchasePackage() {
  return function (dispatch) {
    dispatch(purchasePackageInit())
  }
}
