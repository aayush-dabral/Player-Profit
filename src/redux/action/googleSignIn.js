import { GOOGLE_SIGNIN_INIT, GOOGLE_SIGNIN_SUCCESS, GOOGLE_SIGNIN_FAILURE } from "../actionType"
import * as apiEndpoint from "../../api/Endpoints"
import * as api from "../../api/Request"
import { toast } from "react-toastify"

const googleSignInInit = () => ({
  type: GOOGLE_SIGNIN_INIT
})

const googleSignInSuccess = data => ({
  type: GOOGLE_SIGNIN_SUCCESS,
  payload: data
})

const googleSignInFailure = error => ({
  type: GOOGLE_SIGNIN_FAILURE,
  payload: error
})

export function googleSignIn(body) {
  return function (dispatch) {
    dispatch(googleSignInInit())
    api
      .PostReq(apiEndpoint.googleSignIn, JSON.stringify(body))
      .then(response => {
        if (response?.status === 200 || response?.status === 201) dispatch(googleSignInSuccess(response))
        else if (response?.status === 400) {
          window.scrollTo(0, 0)
          toast.show({
            type: "error",
            props: {
              heading: "Google SignIn",
              desc: response?.data?.hasOwnProperty("non_field_errors") ? response?.data["non_field_errors"][0] : response?.data["email"][0]
            }
          })
          dispatch(googleSignInFailure(response))
        }
      })
      .catch(error => {
        dispatch(googleSignInFailure(error?.message))
      })
  }
}