import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import ErrorPage from "./pages/errorPage";
import { Footer } from "./components";
import { useDispatch, useSelector } from "react-redux";
import routes from "./routes";
import Header from "./components/header";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { userProfile } from "./redux/action/userProfile";
import { subscriptionPlanList } from "./redux/action/subscriptionplan";
import { getToken } from "./redux/action/fcmToken";
import mixpanel from "mixpanel-browser";
import Pusher from "pusher-js";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Profile from "./pages/profile";
import Support from "./pages/support";
import ProfileComponent from "./pages/Trades/Profile/Profile";
import KYC from "./pages/kyc";
import ProfilePaymentHistory from "./pages/Trades/paymentsHistory/payment.js";
import { getChallangeStatus } from "./redux/action/challangeStatus.js";
import { getUserKycInfo } from "./redux/action/getUserKycInfo.js";
import Withdrawal from "./pages/withdraw/index.js";
import WithdrawHistory from "./pages/withdrawHistory/index.js";
import PrivateRoute from "./private/index.js";
import Signin from "./pages/authentication/signin.js";
import ProfileRoutes from "./ProfileRoutes.js";

const App = () => {
  const dispatch = useDispatch();
  const channelId = useSelector((state) => state?.fcmTokenReducer?.fcmData);
  useEffect(() => {
    mixpanel.init("cc3cafa268ef11604a52b34edf3443d7");
    dispatch(userProfile());
    dispatch(getToken());
    dispatch(subscriptionPlanList());
    dispatch(getChallangeStatus());
    dispatch(getUserKycInfo());
  }, []);

  useEffect(() => {
    if (channelId?.status) {
      const pusher = new Pusher("9b903620bc04191ae1c4", {
        cluster: "mt1",
        encrypted: true,
      });
      const channel = pusher.subscribe("push_notification");
      channel.bind(channelId?.data?.fcm_token, (data) => {
        toast(<Message notification={data} />);
      });
    }
  });

  const Message = ({ notification }) => {
    return (
      <>
        <div id="notificationHeader">
          <span>{notification?.message?.title}</span>
        </div>
        <div id="notificationBody">{notification?.message?.message}</div>
      </>
    );
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      className="bg-black flex-col"
    >
      {/* <ToastContainer /> */}
      <Header />
      <div style={{ width: "100%" }}>
        <GoogleOAuthProvider clientId="201330465086-h43qdvnaa52g1ctl8p5e8r0v4ql5m7lt.apps.googleusercontent.com">
          <Routes>
            {routes.map((item, index) => {
              if (item.isPublic) {
                return (
                  <Route
                    key={"" + index}
                    path={item.path}
                    exact={item.exact}
                    name={item.name}
                    element={item.element}
                  />
                );
              } else {
                return (
                  <Route
                    key={"" + index}
                    path={item.path}
                    exact={item.exact}
                    name={item.name}
                    element={<PrivateRoute>{item.element}</PrivateRoute>}
                  />
                );
              }
            })}
            <Route path="*" element={<ErrorPage />} />
            <Route
              path="/profile/*"
              element={
                <PrivateRoute>
                  <Profile>
                    <ProfileRoutes />
                  </Profile>
                </PrivateRoute>
              }
            />
          </Routes>
        </GoogleOAuthProvider>
        <Footer />
      </div>
    </div>
  );
};

export default App;
