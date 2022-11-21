import { MdRoomService } from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router-dom";
import auth from "../../assets/auth.jpg";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { SiSpinrilla } from "react-icons/si";
import { useLoginMutation } from "./authApi";
import { select_auth_user, set_auth } from "./UserSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [login, { isLoading }] = useLoginMutation();
  const user_data = useSelector(select_auth_user);

  const handle_submit = async (values, { setSubmitting, setErrors }) => {
    setSubmitting(false);
    try {
      const response = await login(values).unwrap();
      dispatch(set_auth(response));
    } catch (err) {
      Object.entries(err.data.errors).forEach(([key, value]) => {
        formik.setFieldError(key, value[0]);
      });
    }
  };

  const yup_schema = yup.object({
    email: yup
      .string()
      .email("The Email is not valid")
      .required("The Email Address field is required"),
    password: yup
      .string()
      .min(8, "The Password must be at least 8 characters long")
      .required("The Password field is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yup_schema,
    onSubmit: handle_submit,
  });

  useEffect(() => {
    if (user_data) {
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
              {isLoading ? <SiSpinrilla className="animate-spin" /> : "Login"}
            </button>
          </div>
        </form>

        <div className="text-center p-4">
          <Link to="/forget-password" state={{ from: location }} replace>
            Forget Password ?
          </Link>
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
