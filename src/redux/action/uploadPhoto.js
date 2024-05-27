import {
  UPLOAD_PHOTO_INIT,
  UPLOAD_PHOTO_SUCCESS,
  UPLOAD_PHOTO_FAILURE
} from "../actionType"
import * as apiEndpoint from "../../api/Endpoints"
import * as api from "../../api/Request"
import { toast } from "react-toastify"

const uploadPhotoInit = () => ({
  type: UPLOAD_PHOTO_INIT
})

const uploadPhotoSuccess = data => ({
  type: UPLOAD_PHOTO_SUCCESS,
  payload: data
})

const uploadPhotoFailure = error => ({
  type: UPLOAD_PHOTO_FAILURE,
  payload: error
})

export function uploadPhoto(body) {
  return function (dispatch) {
    dispatch(uploadPhotoInit())
    api
      .PostReqMultiPart(apiEndpoint.uploadPhoto, body)
      .then(response => { 
        if (response?.status === 200) dispatch(uploadPhotoSuccess(response))
        else if (response?.status === 400 || response?.status === 401) {
          window.scrollTo(0, 0)
          if(response?.data?.hasOwnProperty("non_field_errors")){
            toast.error(`${response?.data["non_field_errors"][0]}`)
          }
          else{
            if(response?.data?.hasOwnProperty("detail")){
              toast.error(`${response?.data?.detail}`)
            }
            else{
              toast.error("Something went wrong")
            }
          }
          dispatch(uploadPhotoFailure(response))
        } else if (response?.response?.status === 500) {
          window.scrollTo(0, 0)
          toast.error('Server Error, not uploaded')
          dispatch(uploadPhotoFailure(response?.response))
        }
      })
      .catch(error => {
        dispatch(uploadPhotoFailure(error?.message))
      })
  }
}

export function resetUploadPhoto(body) {
  return function (dispatch) {
    dispatch(uploadPhotoInit())
  }
}
