import { Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { select_auth_connected } from "../features/Auth/UserSlice";
import { Navigate } from "react-router-dom";

const NonAuth_Route = () => {
  const user_connected = useSelector(select_auth_connected);

  return (
    <div className="h-screen flex items-stretch w-full">
      {user_connected ? <Navigate to="/" replace /> : <Outlet />}
    </div>
  );
};

export default NonAuth_Route;
