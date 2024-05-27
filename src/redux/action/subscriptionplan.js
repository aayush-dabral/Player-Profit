import { SUBSCRIPTION_PLAN_INIT, SUBSCRIPTION_PLAN_SUCCESS, SUBSCRIPTION_PLAN_FAILURE } from "../actionType"
import * as apiEndpoint from "../../api/Endpoints"
import * as api from "../../api/Request"
import { toast } from "react-toastify"

const subscriptionPlanListInit = () => ({
  type: SUBSCRIPTION_PLAN_INIT
})

const subscriptionPlanListSuccess = data => ({
  type: SUBSCRIPTION_PLAN_SUCCESS,
  payload: data
})

const subscriptionPlanListFailure = error => ({
  type: SUBSCRIPTION_PLAN_FAILURE,
  payload: error
})

export function subscriptionPlanList() {
  return function (dispatch) {
    dispatch(subscriptionPlanListInit())
    api
      .getReq(apiEndpoint.subscriptionplan)
      .then(response => {
        if (response?.status === 200 || response?.status === 201) dispatch(subscriptionPlanListSuccess(response))
        else if (response?.status === 400) {
          window.scrollTo(0, 0)
          toast.show({
            type: "error",
            props: {
              heading: "Subscription",
              desc: response?.data?.hasOwnProperty("non_field_errors") ? response?.data["non_field_errors"][0] : 'Something went wrong'
            }
          })
          dispatch(subscriptionPlanListFailure(response))
        }
      })
      .catch(error => {
        dispatch(subscriptionPlanListFailure(error?.message))
      })
  }
}