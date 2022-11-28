import Home from "./features/Home/Home";
import Error_404 from "./components/Error_404";
import { useEffect } from "react";
import Login from "./features/Auth/Login";
import Register from "./features/Auth/Register";
import Auth from "./features/layouts/Auth";
import Main from "./features/layouts/Main";
import Auth_Route from "./components/Auth_Route";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import VerifyEmail from "./features/Auth/VerifyEmail";
import Profile from "./features/Auth/Profile";
import Loading from "./components/Loading";
import { useGetProfileQuery } from "./features/Auth/authApi";
import { select_auth_connected, set_auth } from "./features/Auth/UserSlice";
import { useDispatch, useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import ForgetPassword from "./features/Auth/ForgetPassword";
import ResetPassword from "./features/Auth/ResetPassword";

function App() {
  const dispatch = useDispatch();
  const user_connected = useSelector(select_auth_connected);
  const {
    data: user_data,
    isLoading,
    isSuccess,
  } = useGetProfileQuery(undefined, {
    skip: localStorage.getItem("token") ? false : true,
  });

  useEffect(() => {
    if (localStorage.getItem("token") && isSuccess) {
      dispatch(set_auth({ user: user_data }));
    }
  }, [user_data]);

  return (
    <div className="App min-h-screen bg-background text-white flex items-stretch">
      {isLoading && <Loading />}
      {!isLoading && (
        <Routes>
          <Route element={<Main />}>
            <Route path="/" element={<Home />} />
          </Route>
          <Route element={<Auth />}>
            {!user_connected && (
              <Route path="/register" element={<Register />} />
            )}
            {!user_connected && <Route path="/login" element={<Login />} />}
            {!user_connected && (
              <Route path="/forget-password" element={<ForgetPassword />} />
            )}
            {!user_connected && (
              <Route
                path="/reset-password/:token"
                element={<ResetPassword />}
              />
            )}
            <Route element={<Auth_Route />}>
              <Route path="/email/verify/:id/:hash" element={<VerifyEmail />} />
              <Route path="/profile" element={<Profile />} />
            </Route>
          </Route>
          <Route path="/*" element={<Error_404 />} />
        </Routes>
      )}
      <ToastContainer
        autoClose={6000}
        hideProgressBar={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        limit={2}
      />
    </div>
  );
}

export default App;
