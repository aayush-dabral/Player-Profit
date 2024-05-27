// ProfileRoutes.js
import { Routes, Route } from "react-router-dom";
import ProfileComponent from "./pages/Trades/Profile/Profile";
import Support from "./pages/support";
import KYC from "./pages/kyc";
import ProfilePaymentHistory from "./pages/Trades/paymentsHistory/payment.js";
import Withdrawal from "./pages/withdraw/index.js";
import WithdrawHistory from "./pages/withdrawHistory/index.js";
// import other components

const ProfileRoutes = () => (
  <Routes>
    <Route path="/" element={<ProfileComponent />} />
    <Route path="paymenthistory" element={<ProfilePaymentHistory />} />
    <Route path="/support" element={<Support />} />
    <Route path="/kyc" element={<KYC />} />
    <Route path="/withdrawal" element={<Withdrawal />} />
    <Route path="/withdrawal/history" element={<WithdrawHistory />} />
  </Routes>
);

export default ProfileRoutes;
