import {SURVEY_FORM_FAILURE, SURVEY_FORM_INIT, SURVEY_FORM_SUCCESS } from "../actionType"
import * as apiEndpoint from "../../api/Endpoints"
import * as api from "../../api/Request"
import { toast } from "react-toastify"

const SurveyFormInit = () => ({
  type: SURVEY_FORM_INIT
})

const SurveyFormSuccess = data => ({
  type: SURVEY_FORM_SUCCESS,
  payload: data
})

const SurveyFormFailure = error => ({
  type: SURVEY_FORM_FAILURE,
  payload: error
})

export function postSurveyFormDetails(body) {
    return function (dispatch) {
      dispatch(SurveyFormInit());
      api.PostReq(apiEndpoint.SurveySubmitAPI, JSON.stringify(body))
        .then(response => {
          if(response?.status === 200)
              dispatch(SurveyFormSuccess(response))
          else if(response?.status === 400){
            window.scrollTo(0, 0)
            toast.show({
              type: 'error',
              props: {heading: 'Survey Data',
              desc: response?.data["non_field_errors"][0]}
            });
              dispatch(SurveyFormFailure(response))
          }
          else if(response?.response?.status === 500){
            window.scrollTo(0, 0)
            toast({
              type: 'error',
              props: {heading: 'Survey Data',
              desc: "Server Error, data not submitted"}
            });
              dispatch(SurveyFormFailure(response?.response))
          }
        })
        .catch(error => {
          dispatch(SurveyFormFailure(error?.message))
        })
    }
  }
  