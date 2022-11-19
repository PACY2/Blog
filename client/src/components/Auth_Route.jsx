import { Navigate, useLocation, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { fetch_user_state } from "../features/Auth/UserSlice";
import Error_403 from "./Error_403";

const Auth_Route = ({ roles }) => {
  const user_data = useSelector(fetch_user_state);
  const location = useLocation();

  if (!user_data.user) {
    return <Navigate state={{ from: location }} replace to="/login" />;
  }

  if (roles && !roles.includes(user_data.user.role)) {
    return <Error_403 />;
  }

  return <Outlet />;
};

export default Auth_Route;
