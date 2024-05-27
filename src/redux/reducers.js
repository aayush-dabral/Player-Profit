import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../redux/authentication/slice";
import updateUserReducer from "../redux/user/slice";
import headerReducer from "../redux/header/slice";
import teetimeReducer from "../redux/teetime/slice";
import newsReducer from "../redux/news/slice";
import bookingReducer from "../redux/booking/slice";
import searchReducer from "../redux/search/slice";
import userReducer from "../redux/user/slice";
import settingsReducer from "../redux/settings/slice";
import getPaymentHistoryReducer from "../redux/reducer/getPaymentHistory";
import getBettingHistoryReducer from "../redux/reducer/getBettingHistory";
import challangeStatusReducer from "../redux/reducer/challangeStatus";
import packagesListReducer from "../redux/reducer/packagesList"
import advanceStatisticsReducer from "../redux/reducer/advanceStatistics"
import sportsGameReducer from "../redux/reducer/sportsGame"
import sportsReducer from "../redux/reducer/sports"
import placeBetReducer from "../redux/reducer/placeBet"
import userProfileReducer from "../redux/reducer/userProfile"
import updateProfileReducer from "../redux/reducer/updateProfile"
import emailVerificationUserReducer from "../redux/reducer/emailVerificationUser"
import uploadPhotoReducer from "../redux/reducer/uploadPhoto"
import loginReducer from "../redux/reducer/login"
import userTokenReducer from '../redux/reducer/userToken'
import kycFormReducer from "../redux/reducer/kycForm"
import changePasswordReducer from "../redux/reducer/changePassword"
import sendFeedbackReducer from "../redux/reducer/sendFeedback"
import fcmTokenReducer from "../redux/reducer/fcmToken"
import notificationReducer from "../redux/reducer/notifications"
import resetPasswordReducer from "../redux/reducer/resetPassword";
import subscriptionPlanReducer from "../redux/reducer/subscriptionplan";
import getUserKycInfoReducer from "./reducer/getUserKycInfo";
import resetConfirmPasswordReducer from "./reducer/resetConfirmPassword";

const rootReducer = combineReducers({
  authReducer,
  headerReducer,
  teetimeReducer,
  newsReducer,
  bookingReducer,
  searchReducer,
  userReducer,
  settingsReducer,
  updateUserReducer,
  getPaymentHistoryReducer,
  getBettingHistoryReducer,
  challangeStatusReducer,
  packagesListReducer,
  advanceStatisticsReducer,
  sportsGameReducer,
  placeBetReducer,
  userProfileReducer,
  updateProfileReducer,
  emailVerificationUserReducer,
  uploadPhotoReducer,
  loginReducer,
  userTokenReducer,
  kycFormReducer,
  changePasswordReducer,
  sendFeedbackReducer,
  fcmTokenReducer,
  subscriptionPlanReducer,
  notificationReducer,
  sportsReducer,
  resetPasswordReducer,
  getUserKycInfoReducer,
  resetConfirmPasswordReducer
});

export default rootReducer;
