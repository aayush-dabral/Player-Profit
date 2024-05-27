import {PAYMENT_HISTORY_FAILURE,PAYMENT_HISTORY_SUCCESS,PAYMENT_HISTORY_INIT } from "../actionType"
import * as apiEndpoint from "../../api/Endpoints"
import * as api from "../../api/Request"
import { toast } from "react-toastify"

const paymentHistoryApi = {
    getPaymentHistory: (param) => {
      return api
        .getReqtoken(apiEndpoint.paymentHistory + param)
        .then(response => { 
            return response
        })
        .catch(error => {
          return error
        })
    }
  }

  export {paymentHistoryApi}