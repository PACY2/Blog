import { Navigate, useLocation, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { select_auth } from "../features/Auth/UserSlice";
import Loading from "./Loading";

const Auth_Route = ({ roles }) => {
  const user = useSelector(select_auth);
  const location = useLocation();

  if (localStorage.getItem("token")) {
    if (user.connected !== null) {
      return user.connected ? <Outlet /> : <Navigate to="/login" replace />;
    } else {
      return <Loading />;
    }
  } else {
    return <Navigate to="/login" replace />;
  }
};

export default Auth_Route;
