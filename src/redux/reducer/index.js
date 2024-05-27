import { combineReducers } from "redux"
import loginReducer from "./login"
import signupReducer from "./signup"
import googleSignInReducer from "./googleSignIn"
import uploadPhotoReducer from "./uploadPhoto"
import resetPasswordReducer from "./resetPassword"
import resetConfirmPasswordReducer from "./resetConfirmPassword"
import changePasswordReducer from "./changePassword"
import addCardDetailsReducer from "./addCardDetails"
import sendFeedbackReducer from "./sendFeedback"
import userProfileReducer from "./userProfile"
import updateProfileReducer from "./updateProfile"
import emailVerificationUserReducer from "./emailVerificationUser"
import getPaymentHistoryReducer from "./getPaymentHistory"
import emailChangeVerifyReducer from "./emailChangeVerify"
import kycFormReducer from "./kycForm"
import surveyFormReducer from "./surveyForm"
import fundedTraderReducer from "./getFundedTraderInfo"
import sportsGameReducer from "./sportsGame"
import userTokenReducer from "./userToken"
import placeBetReducer from "./placeBet"
import bettingHistoryReducer from "./bettingHistory"
import leaderboardReducer from "./leaderboard"
import notificationsReducer from "./notifications"
import packagesListReducer from "./packagesList"
import subscriptionPlanReducer from "./subscriptionplan"
import purchasePackageReducer from "./purchasePackage"
import withdrawalReducer from "./withdrawal"
import challangeStatusReducer from "./challangeStatus"
import advanceStatisticsReducer from "./advanceStatistics"
import discountApplyReducer from "./discountApply"
import { CLEAR_REDUX_STATE } from "../actionType"
import deleteReducer from "./delete"
import paymentReducer from "./payment"

const appReducer = combineReducers({
  login: loginReducer,
  signup: signupReducer,
  googleSignIn: googleSignInReducer,
  uploadPhoto: uploadPhotoReducer,
  resetPassword: resetPasswordReducer,
  resetConfirmPassword: resetConfirmPasswordReducer,
  changePassword: changePasswordReducer,
  addCardDetails: addCardDetailsReducer,
  sendFeedback: sendFeedbackReducer,
  userProfile: userProfileReducer,
  updateProfile: updateProfileReducer,
  emailVerificationUser: emailVerificationUserReducer,
  paymentHistory: getPaymentHistoryReducer,
  emailChangeVerify: emailChangeVerifyReducer,
  kycFormDetails: kycFormReducer,
  surveyFormDetails: surveyFormReducer,
  fundedTrader: fundedTraderReducer,
  sportsGame: sportsGameReducer,
  paymentPost: paymentReducer,
  userToken: userTokenReducer,
  placeBet: placeBetReducer,
  bettingHistory: bettingHistoryReducer,
  leaderboardDetails: leaderboardReducer,
  notificationDetails: notificationsReducer,
  packagesList: packagesListReducer,
  subscriptionPlan: subscriptionPlanReducer,
  purchasePackage: purchasePackageReducer,
  withdrawal: withdrawalReducer,
  challangeStatus: challangeStatusReducer,
  advanceStatistics: advanceStatisticsReducer,
  deleteAccount: deleteReducer,
  discountApply: discountApplyReducer
})

const reducer = (state, action) => {
  if (action.type === CLEAR_REDUX_STATE) {
    // Reset the state to its initial state
    state = {}
  }
  return appReducer(state, action)
}

export default reducer