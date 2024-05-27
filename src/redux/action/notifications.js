import { NOTIFICATIONS_FAILURE, NOTIFICATIONS_INIT, NOTIFICATIONS_SUCCESS } from "../actionType";
import * as apiEndpoint from "../../api/Endpoints";
import * as api from "../../api/Request";
import { toast } from "react-toastify";

const getNotificationsInit = () => ({
  type: NOTIFICATIONS_INIT,
});

const getNotificationsSuccess = data => ({
  type: NOTIFICATIONS_SUCCESS,
  payload: data,
});

const getNotificationsFailure = error => ({
  type: NOTIFICATIONS_FAILURE,
  payload: error,
});

export function getNotifications(cb) {
  return function(dispatch) {
    dispatch(getNotificationsInit());
    api
      .getReq(apiEndpoint.notificationsUrl)
      .then(response => {
        if (response?.status === 200 || response?.status === 201) {
          dispatch(getNotificationsSuccess(response));
          // cb(response.data);
        } else if (response?.status === 400) {
          window.scrollTo(0, 0)
          toast.show({
            type: "error",
            props: {
              heading: "Notifications",
              desc: response?.data?.hasOwnProperty("non_field_errors") ? response?.data["non_field_errors"][0] : "Something went wrong",
            },
          });
          dispatch(getNotificationsFailure(response));
        }
      })
      .catch(error => {
        dispatch(getNotificationsFailure(error?.message));
      });
  };
}
