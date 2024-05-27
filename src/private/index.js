import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PrivateRoute({ children }) {
  const token = localStorage.getItem("accessToken");
  return <>{token ? children : <Navigate to="/login" />}</>;
}
