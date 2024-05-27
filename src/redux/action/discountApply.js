import {
  DISCOUNT_APPLY_FAILURE,
  DISCOUNT_APPLY_SUCCESS,
  DISCOUNT_APPLY_INIT
} from "../actionType"
import * as apiEndpoint from "../../api/Endpoints"
import * as api from "../../api/Request"
import { toast } from "react-toastify"

const discountApplyInit = () => ({
  type: DISCOUNT_APPLY_INIT
})

const discountApplySuccess = data => ({
  type: DISCOUNT_APPLY_SUCCESS,
  payload: data
})

const discountApplyFailure = error => ({
  type: DISCOUNT_APPLY_FAILURE,
  payload: error
})

export function getDiscountApply(param) {
  return function (dispatch) {
    dispatch(discountApplyInit())
    api
      .getReq(apiEndpoint.affiliatediscount + param)
      .then(response => {
        if (response?.status === 200 || response?.status === 201)
          dispatch(discountApplySuccess(response))
        else if (response?.status === 400) {
          window.scrollTo(0, 0)
          toast.show({
            type: "error",
            props: {
              heading: "Discount Apply Status",
              desc: response?.data?.hasOwnProperty("non_field_errors")
                ? response?.data["non_field_errors"][0]
                : "Something went wrong"
            }
          })
          dispatch(discountApplyFailure(response))
        }
      })
      .catch(error => {
        dispatch(discountApplyFailure(error?.message))
      })
  }
}