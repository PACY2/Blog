import Home from "./features/Home/Home";
import { SiSpinrilla } from "react-icons/si";
import { Routes, Route } from "react-router-dom";
import Error_404 from "./components/Error_404";
import Login from "./features/Auth/Login";
import Register from "./features/Auth/Register";
import Auth from "./features/layouts/Auth";
import Main from "./features/layouts/Main";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Auth_Route from "./components/Auth_Route";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import VerifyEmail from "./features/Auth/VerifyEmail";
import Profile from "./features/Auth/Profile";
import {
  set_status,
  fetch_user_state,
  fetch_profile,
} from "./features/Auth/UserSlice";

function App() {
  const dispatch = useDispatch();
  const user_data = useSelector(fetch_user_state);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(fetch_profile());
    } else {
      dispatch(set_status("failed"));
    }
  }, []);

  return (
    <div className="App min-h-screen bg-background text-white flex items-stretch">
      {user_data.status === "loading" && (
        <section className="flex w-full items-center text-primary  justify-center">
          <SiSpinrilla className="animate-spin  w-16 h-16" />
        </section>
      )}
      {user_data.status !== "loading" && (
        <Routes>
          <Route element={<Main />}>
            <Route path="/" element={<Home />} />
          </Route>
          <Route element={<Auth />}>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route element={<Auth_Route />}>
              <Route path="/email/verify/:id/:hash" element={<VerifyEmail />} />
            </Route>
            <Route element={<Auth_Route />}>
              <Route path="/profile" element={<Profile />} />
            </Route>
          </Route>
          <Route path="/*" element={<Error_404 />} />
        </Routes>
      )}
      <ToastContainer
        position="bottom-right"
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
