import axios from "axios"
const sparklinghatAPI = axios.create({
  baseURL: "https://funded-sports-trade-39863.botics.co",
  headers: { Accept: "application/json", "Content-Type": "application/json" }
})
function additional_registration_docs_retrieve(payload) {
  return sparklinghatAPI.get(`/additional_registration/docs/`)
}
function additional_registration_kyc_create(payload) {
  return sparklinghatAPI.post(`/additional_registration/kyc/`)
}
function additional_registration_kyc_partial_update(payload) {
  return sparklinghatAPI.patch(`/additional_registration/kyc/`)
}
function additional_registration_surveyquestionanswer_create(payload) {
  return sparklinghatAPI.post(`/additional_registration/surveyquestionanswer/`)
}
function advance_statistics_advance_statistics_retrieve(payload) {
  return sparklinghatAPI.get(`/advance_statistics/advance_statistics/`)
}
function api_docs_schema_retrieve(payload) {
  return sparklinghatAPI.get(`/api-docs/schema/`, {
    params: { lang: payload.lang }
  })
}
function api_v1_delete_destroy(payload) {
  return sparklinghatAPI.delete(`/api/v1/delete/`)
}
function api_v1_editeuserdetail_partial_update(payload) {
  return sparklinghatAPI.patch(`/api/v1/editeuserdetail/`)
}
function api_v1_login_create(payload) {
  return sparklinghatAPI.post(`/api/v1/login/`, payload.data)
}
function api_v1_sendresetpasswordemail_create(payload) {
  return sparklinghatAPI.post(`/api/v1/sendresetpasswordemail/`)
}
function api_v1_signup_create(payload) {
  return sparklinghatAPI.post(`/api/v1/signup/`, payload.data)
}
function api_v1_uploadpicture_create(payload) {
  return sparklinghatAPI.post(`/api/v1/uploadpicture/`)
}
function api_v1_verify_email_confirmation_create(payload) {
  return sparklinghatAPI.post(`/api/v1/verify-email-confirmation/`)
}
function betting_data_list(payload) {
  return sparklinghatAPI.get(`/betting/data/`, {
    params: { search: payload.search }
  })
}
function betting_data_create(payload) {
  return sparklinghatAPI.post(`/betting/data/`, payload.data)
}
function betting_data_retrieve(payload) {
  return sparklinghatAPI.get(`/betting/data/${payload.id}/`)
}
function betting_data_update(payload) {
  return sparklinghatAPI.put(`/betting/data/${payload.id}/`, payload.data)
}
function betting_data_partial_update(payload) {
  return sparklinghatAPI.patch(`/betting/data/${payload.id}/`, payload.data)
}
function betting_data_destroy(payload) {
  return sparklinghatAPI.delete(`/betting/data/${payload.id}/`)
}
function betting_future_odds_retrieve(payload) {
  return sparklinghatAPI.get(`/betting/future-odds/`)
}
function betting_futures_retrieve(payload) {
  return sparklinghatAPI.get(`/betting/futures/`)
}
function betting_games_retrieve(payload) {
  return sparklinghatAPI.get(`/betting/games/`)
}
function betting_leagues_retrieve(payload) {
  return sparklinghatAPI.get(`/betting/leagues/`)
}
function betting_market_category_retrieve(payload) {
  return sparklinghatAPI.get(`/betting/market-category/`)
}
function betting_markets_retrieve(payload) {
  return sparklinghatAPI.get(`/betting/markets/`)
}
function betting_odds_retrieve(payload) {
  return sparklinghatAPI.get(`/betting/odds/`)
}
function challanges_status_challanges_status_retrieve(payload) {
  return sparklinghatAPI.get(`/challanges_status/challanges_status/`)
}
function leaderboard_leaderboard_retrieve(payload) {
  return sparklinghatAPI.get(`/leaderboard/leaderboard/`)
}
function modules_payments_get_payments_history_retrieve(payload) {
  return sparklinghatAPI.get(`/modules/payments/get_payments_history/`)
}
function modules_payments_get_payments_methods_retrieve(payload) {
  return sparklinghatAPI.get(`/modules/payments/get_payments_methods/`)
}
function modules_payments_payment_sheet_create(payload) {
  return sparklinghatAPI.post(`/modules/payments/payment_sheet/`)
}
function modules_privacy_policy_list(payload) {
  return sparklinghatAPI.get(`/modules/privacy-policy/`)
}
function modules_privacy_policy_create(payload) {
  return sparklinghatAPI.post(`/modules/privacy-policy/`, payload.data)
}
function modules_privacy_policy_retrieve(payload) {
  return sparklinghatAPI.get(`/modules/privacy-policy/${payload.id}/`)
}
function modules_privacy_policy_update(payload) {
  return sparklinghatAPI.put(
    `/modules/privacy-policy/${payload.id}/`,
    payload.data
  )
}
function modules_privacy_policy_partial_update(payload) {
  return sparklinghatAPI.patch(
    `/modules/privacy-policy/${payload.id}/`,
    payload.data
  )
}
function modules_privacy_policy_destroy(payload) {
  return sparklinghatAPI.delete(`/modules/privacy-policy/${payload.id}/`)
}
function modules_social_auth_apple_connect_create(payload) {
  return sparklinghatAPI.post(
    `/modules/social-auth/apple/connect/`,
    payload.data
  )
}
function modules_social_auth_apple_login_create(payload) {
  return sparklinghatAPI.post(`/modules/social-auth/apple/login/`, payload.data)
}
function modules_social_auth_facebook_connect_create(payload) {
  return sparklinghatAPI.post(
    `/modules/social-auth/facebook/connect/`,
    payload.data
  )
}
function modules_social_auth_facebook_login_create(payload) {
  return sparklinghatAPI.post(
    `/modules/social-auth/facebook/login/`,
    payload.data
  )
}
function modules_social_auth_google_connect_create(payload) {
  return sparklinghatAPI.post(
    `/modules/social-auth/google/connect/`,
    payload.data
  )
}
function modules_social_auth_google_login_create(payload) {
  return sparklinghatAPI.post(
    `/modules/social-auth/google/login/`,
    payload.data
  )
}
function modules_social_auth_socialaccounts_list(payload) {
  return sparklinghatAPI.get(`/modules/social-auth/socialaccounts/`)
}
function modules_social_auth_socialaccounts_disconnect_create(payload) {
  return sparklinghatAPI.post(
    `/modules/social-auth/socialaccounts/${payload.id}/disconnect/`,
    payload.data
  )
}
function modules_terms_and_conditions_list(payload) {
  return sparklinghatAPI.get(`/modules/terms-and-conditions/`)
}
function modules_terms_and_conditions_create(payload) {
  return sparklinghatAPI.post(`/modules/terms-and-conditions/`, payload.data)
}
function modules_terms_and_conditions_retrieve(payload) {
  return sparklinghatAPI.get(`/modules/terms-and-conditions/${payload.id}/`)
}
function modules_terms_and_conditions_update(payload) {
  return sparklinghatAPI.put(
    `/modules/terms-and-conditions/${payload.id}/`,
    payload.data
  )
}
function modules_terms_and_conditions_partial_update(payload) {
  return sparklinghatAPI.patch(
    `/modules/terms-and-conditions/${payload.id}/`,
    payload.data
  )
}
function modules_terms_and_conditions_destroy(payload) {
  return sparklinghatAPI.delete(`/modules/terms-and-conditions/${payload.id}/`)
}
function notification_list(payload) {
  return sparklinghatAPI.get(`/notification/`)
}
function notification_create(payload) {
  return sparklinghatAPI.post(`/notification/`, payload.data)
}
function notification_retrieve(payload) {
  return sparklinghatAPI.get(`/notification/${payload.id}/`)
}
function notification_update(payload) {
  return sparklinghatAPI.put(`/notification/${payload.id}/`, payload.data)
}
function notification_partial_update(payload) {
  return sparklinghatAPI.patch(`/notification/${payload.id}/`, payload.data)
}
function notification_destroy(payload) {
  return sparklinghatAPI.delete(`/notification/${payload.id}/`)
}
function oddsjam_fetch_odds_retrieve(payload) {
  return sparklinghatAPI.get(`/oddsjam/fetch-odds/`, {
    params: {
      league: payload.league,
      limit: payload.limit,
      sport: payload.sport
    }
  })
}
function oddsjam_save_odds_cron_retrieve(payload) {
  return sparklinghatAPI.get(`/oddsjam/save-odds-cron/`)
}
function payment_history_payment_history_retrieve(payload) {
  return sparklinghatAPI.get(`/payment_history/payment_history/`)
}
function rest_auth_login_create(payload) {
  return sparklinghatAPI.post(`/rest-auth/login/`, payload.data)
}
function rest_auth_logout_retrieve(payload) {
  return sparklinghatAPI.get(`/rest-auth/logout/`)
}
function rest_auth_logout_create(payload) {
  return sparklinghatAPI.post(`/rest-auth/logout/`)
}
function rest_auth_password_change_create(payload) {
  return sparklinghatAPI.post(`/rest-auth/password/change/`, payload.data)
}
function rest_auth_password_reset_create(payload) {
  return sparklinghatAPI.post(`/rest-auth/password/reset/`, payload.data)
}
function rest_auth_password_reset_confirm_create(payload) {
  return sparklinghatAPI.post(
    `/rest-auth/password/reset/confirm/`,
    payload.data
  )
}
function rest_auth_registration_create(payload) {
  return sparklinghatAPI.post(`/rest-auth/registration/`, payload.data)
}
function rest_auth_registration_verify_email_create(payload) {
  return sparklinghatAPI.post(
    `/rest-auth/registration/verify-email/`,
    payload.data
  )
}
function rest_auth_user_retrieve(payload) {
  return sparklinghatAPI.get(`/rest-auth/user/`)
}
function rest_auth_user_update(payload) {
  return sparklinghatAPI.put(`/rest-auth/user/`, payload.data)
}
function rest_auth_user_partial_update(payload) {
  return sparklinghatAPI.patch(`/rest-auth/user/`, payload.data)
}
function subscribe_list(payload) {
  return sparklinghatAPI.get(`/subscribe/`)
}
function subscribe_create(payload) {
  return sparklinghatAPI.post(`/subscribe/`, payload.data)
}
function subscribe_retrieve(payload) {
  return sparklinghatAPI.get(`/subscribe/${payload.id}/`)
}
function subscriptionplan_list(payload) {
  return sparklinghatAPI.get(`/subscriptionplan/`)
}
function subscriptionplan_retrieve(payload) {
  return sparklinghatAPI.get(`/subscriptionplan/${payload.id}/`)
}
function support_feedback_sendfeedback_create(payload) {
  return sparklinghatAPI.post(`/support_feedback/sendfeedback`)
}
function transaction_payment_retrieve(payload) {
  return sparklinghatAPI.get(`/transaction/payment/`)
}
function transaction_payment_create(payload) {
  return sparklinghatAPI.post(`/transaction/payment/`)
}
function withdrawl_list(payload) {
  return sparklinghatAPI.get(`/withdrawl/`)
}
function withdrawl_create(payload) {
  return sparklinghatAPI.post(`/withdrawl/`, payload.data)
}
function withdrawl_retrieve(payload) {
  return sparklinghatAPI.get(`/withdrawl/${payload.id}/`)
}
export const apiService = {
  additional_registration_docs_retrieve,
  additional_registration_kyc_create,
  additional_registration_kyc_partial_update,
  additional_registration_surveyquestionanswer_create,
  advance_statistics_advance_statistics_retrieve,
  api_docs_schema_retrieve,
  api_v1_delete_destroy,
  api_v1_editeuserdetail_partial_update,
  api_v1_login_create,
  api_v1_sendresetpasswordemail_create,
  api_v1_signup_create,
  api_v1_uploadpicture_create,
  api_v1_verify_email_confirmation_create,
  betting_data_list,
  betting_data_create,
  betting_data_retrieve,
  betting_data_update,
  betting_data_partial_update,
  betting_data_destroy,
  betting_future_odds_retrieve,
  betting_futures_retrieve,
  betting_games_retrieve,
  betting_leagues_retrieve,
  betting_market_category_retrieve,
  betting_markets_retrieve,
  betting_odds_retrieve,
  challanges_status_challanges_status_retrieve,
  leaderboard_leaderboard_retrieve,
  modules_payments_get_payments_history_retrieve,
  modules_payments_get_payments_methods_retrieve,
  modules_payments_payment_sheet_create,
  modules_privacy_policy_list,
  modules_privacy_policy_create,
  modules_privacy_policy_retrieve,
  modules_privacy_policy_update,
  modules_privacy_policy_partial_update,
  modules_privacy_policy_destroy,
  modules_social_auth_apple_connect_create,
  modules_social_auth_apple_login_create,
  modules_social_auth_facebook_connect_create,
  modules_social_auth_facebook_login_create,
  modules_social_auth_google_connect_create,
  modules_social_auth_google_login_create,
  modules_social_auth_socialaccounts_list,
  modules_social_auth_socialaccounts_disconnect_create,
  modules_terms_and_conditions_list,
  modules_terms_and_conditions_create,
  modules_terms_and_conditions_retrieve,
  modules_terms_and_conditions_update,
  modules_terms_and_conditions_partial_update,
  modules_terms_and_conditions_destroy,
  notification_list,
  notification_create,
  notification_retrieve,
  notification_update,
  notification_partial_update,
  notification_destroy,
  oddsjam_fetch_odds_retrieve,
  oddsjam_save_odds_cron_retrieve,
  payment_history_payment_history_retrieve,
  rest_auth_login_create,
  rest_auth_logout_retrieve,
  rest_auth_logout_create,
  rest_auth_password_change_create,
  rest_auth_password_reset_create,
  rest_auth_password_reset_confirm_create,
  rest_auth_registration_create,
  rest_auth_registration_verify_email_create,
  rest_auth_user_retrieve,
  rest_auth_user_update,
  rest_auth_user_partial_update,
  subscribe_list,
  subscribe_create,
  subscribe_retrieve,
  subscriptionplan_list,
  subscriptionplan_retrieve,
  support_feedback_sendfeedback_create,
  transaction_payment_retrieve,
  transaction_payment_create,
  withdrawl_list,
  withdrawl_create,
  withdrawl_retrieve
}
