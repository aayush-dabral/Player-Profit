import ChallengeStatus from "./pages/Trades/challengeStatus/ChallengeStatus";
import Trading from "./pages/billing/index";
import NotiScreen from "./pages/notification";
import Home from "./pages/home";
import Signin from "./pages/authentication/signin";
import ForgotPassword from "./pages/authentication/forgotPassword";
import ResetPassword from "./pages/authentication/resetPassword";
import TradingHistory from "./pages/Trades/tradingHistory/TradingHistory.js";

const routes = [
  { exact: true, isPublic: true, path: "/", name: "home", element: <Home /> },
  {
    exact: true,
    isPublic: true,
    path: "/notification",
    name: "notification",
    element: <NotiScreen />,
  },
  {
    exact: true,
    isPublic: true,
    path: "/forgot-password",
    name: "forgotPassword",
    element: <ForgotPassword />,
  },
  {
    exact: true,
    isPublic: true,
    path: "/reset-password",
    name: "resetPassword",
    element: <ResetPassword />,
  },
  {
    exact: true,
    isPublic: true,
    path: "/login",
    name: "Login",
    element: <Signin />,
  },
  {
    exact: true,
    isPublic: false,
    path: "/trades/tradehistory",
    name: "tradehistory",
    element: <TradingHistory />,
  },
  {
    exact: true,
    isPublic: false,
    path: "/trades/challengestatus",
    name: "challengestatus",
    element: <ChallengeStatus />,
  },
  {
    exact: true,
    isPublic: false,
    path: "/trading",
    name: "Trading",
    element: <Trading />,
  },
];

export default routes;
