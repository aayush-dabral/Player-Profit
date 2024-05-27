import { LOGIN_INIT, LOGIN_SUCCESS, LOGIN_FAILURE } from "../actionType";
import * as apiEndpoint from "../../api/Endpoints";
import * as api from "../../api/Request";
import { userProfile } from "./userProfile";
import { subscriptionPlanList } from "./subscriptionplan";
import { getChallangeStatus } from "./challangeStatus";
import { getUserKycInfo } from "./getUserKycInfo";
import { toast } from "react-toastify";
import { getBettingHistory } from "./bettingHistory";

const loginInit = () => ({
  type: LOGIN_INIT,
});

const loginSuccess = (data) => ({
  type: LOGIN_SUCCESS,
  payload: data,
});

const loginFailure = (error) => ({
  type: LOGIN_FAILURE,
  payload: error,
});

export function login(body) {
  return function (dispatch) {
    dispatch(loginInit());
    api
      .PostReq(apiEndpoint.login, JSON.stringify(body))
      .then((response) => {
        if (response?.status === 200) {
          localStorage.setItem("accessToken", response?.data?.key);
          dispatch(loginSuccess(response));
          dispatch(userProfile());
          dispatch(getBettingHistory());
          dispatch(subscriptionPlanList());
          dispatch(getChallangeStatus());
          dispatch(getUserKycInfo());
        } else if (response?.status === 400) {
          window.scrollTo(0, 0);
          toast.error(`${response?.data["non_field_errors"][0]}`);
          dispatch(loginFailure(response));
        }
        console.log(response);
      })
      .catch((error) => {
        dispatch(loginFailure(error?.message));
      });
  };
}

export function resetlogin() {
  return function (dispatch) {
    dispatch(loginInit());
  };
}
