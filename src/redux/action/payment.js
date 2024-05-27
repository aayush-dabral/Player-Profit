import { PAYMENT_FAILURE, PAYMENT_INIT, PAYMENT_SUCCESS } from "../actionType"
import * as apiEndpoint from "../../api/Endpoints"
import * as api from "../../api/Request"
import { toast } from "react-toastify"

const postPaymentInit = () => ({
  type: PAYMENT_INIT
})

const postPaymentSuccess = data => ({
  type: PAYMENT_SUCCESS,
  payload: data
})

const postPaymentFailure = error => ({
  type: PAYMENT_FAILURE,
  payload: error
})

export function postPaymentData(body) {
  return function (dispatch) {
    dispatch(postPaymentInit())
    api
      .PostReq(apiEndpoint.postPaymentAPI, JSON.stringify(body))
      .then(response => {
        if (response?.status === 200 || response?.status === 201) dispatch(postPaymentSuccess(response))
        else if (response?.status === 400) {
          // Split the first string into lines
          const lines = response?.data?.split('\n');

          let errorMessage = '';
          // Iterate through the lines to find the error message
          for (const line of lines) {
            if (line.startsWith("Error message:")) {
              // Remove the "Error message: " prefix
              errorMessage = line.slice("Error message: ".length);
              break; // Exit the loop once the error message is found
            }
          }
          window.scrollTo(0, 0);
          toast.show({
            type: "error",
            props: {
              heading: "Please check your payment details",
              desc: errorMessage
            }
          })
          dispatch(postPaymentFailure(response))
        }
        else if (response?.status === 500) {
          window.scrollTo(0, 0)
          toast({
            type: "error",
            props: {
              heading: "Oops! Something went wrong",
              desc: response?.statusText
            }
          })
          dispatch(postPaymentFailure(response))
        }
      })
      .catch(error => {
        dispatch(postPaymentFailure(error?.message))
      })
  }
}

export function resetPostPaymentData(param) {
  return function (dispatch) {
    dispatch(postPaymentInit())
  }
}
