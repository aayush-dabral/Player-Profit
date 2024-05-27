import {
  RESET_CONFIRM_PASSWORD_INIT,
  RESET_CONFIRM_PASSWORD_SUCCESS,
  RESET_CONFIRM_PASSWORD_FAILURE,
} from "../actionType";
import * as apiEndpoint from "../../api/Endpoints";
import * as api from "../../api/Request";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const resetConfirmPasswordInit = () => ({
  type: RESET_CONFIRM_PASSWORD_INIT,
});

const resetConfirmPasswordSuccess = (data) => ({
  type: RESET_CONFIRM_PASSWORD_SUCCESS,
  payload: data,
});

const resetConfirmPasswordFailure = (error) => ({
  type: RESET_CONFIRM_PASSWORD_FAILURE,
  payload: error,
});

export function resetConfirmPassword(body) {
  return function (dispatch) {
    dispatch(resetConfirmPasswordInit());
    api
      .PostReq(apiEndpoint.resetConfirmPassword, JSON.stringify(body))
      .then((response) => {
        if (response?.status === 200 || response?.status === 201) {
          dispatch(resetConfirmPasswordSuccess(response));
        } else if (response?.status === 400) {
          window.scrollTo(0, 0);
          toast(
            response?.data?.hasOwnProperty("non_field_errors")
              ? response?.data["non_field_errors"][0]
              : response?.data?.hasOwnProperty("new_password2")
              ? response?.data["new_password2"][0]
              : response?.data?.hasOwnProperty("token")
              ? response?.data["token"][0]
              : "Something went wrong",
            {
              type: "error",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            }
          );
          dispatch(resetConfirmPasswordFailure(response));
        }
      })
      .catch((error) => {
        dispatch(resetConfirmPasswordFailure(error?.message));
      });
  };
}

export function resetConfirmData() {
  return function (dispatch) {
    dispatch(resetConfirmPasswordInit());
  };
}
