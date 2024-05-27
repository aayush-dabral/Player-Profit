import {
  USER_KYC_INFO_FAILURE,
  USER_KYC_INFO_INIT,
  USER_KYC_INFO_SUCCESS,
} from "../actionType";
import * as apiEndpoint from "../../api/Endpoints";
import * as api from "../../api/Request";
import { toast } from "react-toastify";

export const getUserKycInfoInit = () => ({
  type: USER_KYC_INFO_INIT,
});

export const getUserKycInfoSuccess = (data) => ({
  type: USER_KYC_INFO_SUCCESS,
  payload: data,
});

export const getUserKycInfoFailure = (error) => ({
  type: USER_KYC_INFO_FAILURE,
  payload: error,
});

export function getUserKycInfo() {
  return function (dispatch) {
    dispatch(getUserKycInfoInit());
    api
      .getReqtoken(apiEndpoint.getUserKycInfo)
      .then((response) => {
        if (response?.status === 200 || response?.status === 201)
          dispatch(getUserKycInfoSuccess(response));
        else if (response?.status === 400) {
          window.scrollTo(0, 0);
          toast.error("Something went wrong!!");
          dispatch(getUserKycInfoFailure(response));
        }
      })
      .catch((error) => {
        dispatch(getUserKycInfoFailure(error?.message));
      });
  };
}
