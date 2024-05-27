import {KYC_FORM_FAILURE, KYC_FORM_INIT, KYC_FORM_SUCCESS } from "../actionType"
import * as apiEndpoint from "../../api/Endpoints"
import * as api from "../../api/Request"
import { toast } from "react-toastify"

const KYCFormInit = () => ({
  type: KYC_FORM_INIT
})

const KYCFormSuccess = data => ({
  type: KYC_FORM_SUCCESS,
  payload: data
})

const KYCFormFailure = error => ({
  type: KYC_FORM_FAILURE,
  payload: error
})

export function postKYCFormDetails(body) {
    return function (dispatch) {
      dispatch(KYCFormInit());
      api.PostReqMultiPart(apiEndpoint.KYCAPI, body)
        .then(response => { console.log("KYC POST REQ RES",response)
          if(response?.status === 200){
            dispatch(KYCFormSuccess(response))
            toast.success("Documents are updated successfully!")
          }
          else if(response?.status === 400){
            window.scrollTo(0, 0)
            toast.error(`${response?.data["non_field_errors"][0]}`);
              dispatch(KYCFormFailure(response))
          }
          else if(response?.response?.status === 500){
            window.scrollTo(0, 0)
            toast.error('Server Error, not uploaded');
              dispatch(KYCFormFailure(response?.response))
          }
        })
        .catch(error => {
          dispatch(KYCFormFailure(error?.message))
        })
    }
  }

  export function patchKYCFormDetails(body) {
    return function (dispatch) {
      dispatch(KYCFormInit());
      api.PatchReqMultiparttoken(apiEndpoint.KYCAPI, body)
        .then(response => { console.log("KYC patch REQ RES",response)
          if(response?.status === 200)
              dispatch(KYCFormSuccess(response))
          else if(response?.status === 400){
            window.scrollTo(0, 0)
            toast.error(`${response?.data["non_field_errors"][0]}`);
              dispatch(KYCFormFailure(response))
          }
          else if(response?.response?.status === 500){
            window.scrollTo(0, 0)
            toast.error('Server Error, not uploaded');
              dispatch(KYCFormFailure(response?.response))
          }
        })
        .catch(error => {
          dispatch(KYCFormFailure(error?.message))
        })
    }
  }
  