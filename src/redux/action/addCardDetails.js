import { ADD_CARD_DETAILS_INIT, ADD_CARD_DETAILS_SUCCESS, ADD_CARD_DETAILS_FAILURE } from "../actionType"
import * as apiEndpoint from "../../api/Endpoints"
import * as api from "../../api/Request"
import { toast } from "react-toastify"

const addCardDetailsInit = () => ({
  type: ADD_CARD_DETAILS_INIT
})

const addCardDetailsSuccess = data => ({
  type: ADD_CARD_DETAILS_SUCCESS,
  payload: data
})

const addCardDetailsFailure = error => ({
  type: ADD_CARD_DETAILS_FAILURE,
  payload: error
})

export function addCardDetails(body) {
  return function (dispatch) {
    dispatch(addCardDetailsInit())
    api
      .PostReq(apiEndpoint.addCard, JSON.stringify(body))
      .then(response => {
        if (response?.status === 200 || response?.status === 201) dispatch(addCardDetailsSuccess(response))
        else if (response?.status === 400) {
          window.scrollTo(0, 0)
          toast.show({
            type: "error",
            props: {
              heading: "Add Card Details",
              desc: response?.data?.hasOwnProperty("non_field_errors") ? response?.data["non_field_errors"][0] : response?.data["email"][0]
            }
          })
          dispatch(addCardDetailsFailure(response))
        }
      })
      .catch(error => {
        dispatch(addCardDetailsFailure(error?.message))
      })
  }
}