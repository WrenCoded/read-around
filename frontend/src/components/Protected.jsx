import { Outlet, Navigate } from "react-router-dom";
// import { isAuthenticated } from "../helpers";

const Protected = () => {
  const token = localStorage.getItem("userToken");
  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default Protected;
