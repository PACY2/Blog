import { MdRoomService } from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router-dom";
import auth from "../../assets/auth.jpg";
import { useDispatch, useSelector } from "react-redux";
import { login, fetch_user_state } from "./UserSlice";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { SiSpinrilla } from "react-icons/si";

const Login = () => {
  const user_data = useSelector(fetch_user_state);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yup.object({
      email: yup
        .string()
        .email("The Email is not valid")
        .required("The Email Address field is required"),
      password: yup
        .string()
        .min(8, "The Password must be at least 8 characters long")
        .required("The Password field is required"),
    }),
    onSubmit: (values, { setSubmitting, setErrors }) => {
      setSubmitting(false);
      dispatch(login(values));
    },
  });

  useEffect(() => {
    if (user_data.errors) {
      Object.keys(user_data.errors).forEach((key) => {
        formik.setFieldError(key, user_data.errors[key][0]);
      });
    }

    if (user_data.user) {
      let path = "/";

      if (location.state && location.state.from) {
        path =
          location.state.from.pathname + (location.state.from.search ?? "");
      }

      navigate(path, { replace: true });
    }
  }, [user_data]);

  return (
    <div className="w-full lg:grid lg:grid-cols-2">
      <div className="hidden lg:block relative">
        <img className="w-full h-full object-cover" src={auth} alt="" />
        <div className="bg-gradient-to-b from-primary absolute top-0 w-full h-full"></div>
      </div>
      <div className="w-full h-full flex flex-col justify-center  items-center px-4">
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col  gap-3 w-full max-w-sm"
        >
          <h2 className="text-8xl  flex justify-center items-center ">
            <Link to="/" className="text-pure-white">
              <MdRoomService />
            </Link>
          </h2>
          <input
            placeholder="Email Address..."
            className="outline-none border-2 border-dark-background focus:border-primary bg-dark-background p-3 rounded"
            type="email"
            name="email"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          <div className="pl-4 text-primary text-sm">
            {formik.touched.email && formik.errors.email && formik.errors.email}
          </div>
          <input
            name="password"
            placeholder="Password..."
            className="outline-none border-2 border-dark-background focus:border-primary bg-dark-background p-3 rounded"
            type="password"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          <div className="pl-4 text-primary text-sm">
            {formik.touched.password &&
              formik.errors.password &&
              formik.errors.password}
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-primary w-full p-2 rounded max-w-[60%] flex justify-center items-center text-pure-white hover:opacity-90"
            >
              {user_data.login_status === "loading" ? (
                <SiSpinrilla className="animate-spin" />
              ) : (
                "login"
              )}
            </button>
          </div>
        </form>

        <div className="text-center p-4">
          <p>
            Dont have an account ?{" "}
            <Link to="/register" state={{ from: location }} replace>
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
