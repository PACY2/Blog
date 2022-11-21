import { Navigate, useLocation, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Error_403 from "./Error_403";
import { select_auth_user } from "../features/Auth/UserSlice";
import { useState } from "react";
import { useEffect } from "react";
import Loading from "./Loading";

const Auth_Route = ({ roles }) => {
  const [content, setContent] = useState(<Loading />);
  const user_data = useSelector(select_auth_user);
  const location = useLocation();

  useEffect(() => {
    if (!user_data) {
      setContent(<Navigate state={{ from: location }} replace to="/login" />);
      if (roles && !roles.includes(user_data.role)) {
        setContent(<Error_403 />);
      }
    } else {
      setContent(<Outlet />);
    }
  }, []);

  return content;
};

export default Auth_Route;
