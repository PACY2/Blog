import { SiSpinrilla } from "react-icons/si";
import { useEffect } from "react";
import { useRef } from "react";
import { MdRoomService } from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router-dom";
import auth from "../../assets/auth.jpg";
import { useSelector, useDispatch } from "react-redux";
import { useFormik } from "formik";
import Input from "../../components/Input";
import * as yup from "yup";
import differenceInYears from "date-fns/differenceInYears";
import { useRegisterMutation } from "./authApi";
import { select_auth_user, set_auth } from "./UserSlice";
import { danger_notif, success_notif } from "../../components/Notifications";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const user_data = useSelector(select_auth_user);
  const [register, { isLoading, isSuccess, isError, errror }] =
    useRegisterMutation();

  const initialValues = {
    firstname: "",
    lastname: "",
    username: "",
    birthday: "",
    email: "",
    password: "",
    password_confirmation: "",
  };

  const validationSchema = yup.object({
    firstname: yup
      .string()
      .min(3, "The First Name should be at least 3 characters long")
      .required("The First Name is required"),
    lastname: yup
      .string()
      .min(3, "The First Name should be at least 3 characters long")
      .required("The Last Name is required"),
    username: yup
      .string()
      .min(3, "The First Name should be at least 3 characters long")
      .required("The Username Name is required"),
    birthday: yup
      .date()
      .required("The Birthdate is required")
      .test(
        "birthday",
        "You should be at least 18",
        (value) => differenceInYears(new Date(), new Date(value)) >= 18
      ),
    email: yup
      .string()
      .email("The Email Address is not valid")
      .required("The Email Address is required"),
    password: yup
      .string()
      .min(8, "The Password should be at least 8 characters long")
      .required("The Password is required"),
    password_confirmation: yup
      .string()
      .min(8, "The Password Confirmation should be at least 8 characters long")
      .required("The Password confirmation is required")
      .oneOf(
        [yup.ref("password"), null],
        "Password and Password Confirmation must match"
      ),
  });

  const handle_submit = async (values, { setSubmitting }) => {
    setSubmitting(false);
    try {
      const response = await register(values).unwrap();
      await dispatch(set_auth(response));
      success_notif("Welcome");
    } catch (err) {
      danger_notif("An error occured");
      Object.entries(err.data.errors).forEach(([key, value]) => {
        formik.setFieldError(key, value[0]);
      });
    }
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema,
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
      <div className="w-full h-full flex flex-col justify-center  items-center px-4">
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col  gap-3 w-full max-w-lg"
        >
          <h2 className="text-8xl  flex justify-center items-center ">
            <Link to="/" className="text-pure-white">
              <MdRoomService />
            </Link>
          </h2>
          <div className="grid lg:grid-cols-2 gap-2">
            <Input
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              placeholder="First Name"
              name="firstname"
              errors={
                formik.errors &&
                formik.touched.firstname &&
                formik.errors.firstname
              }
            />
            <Input
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              placeholder="Last Name"
              name="lastname"
              errors={
                formik.errors &&
                formik.touched.lastname &&
                formik.errors.lastname
              }
            />
            <Input
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              placeholder="Username"
              name="username"
              errors={
                formik.errors &&
                formik.touched.username &&
                formik.errors.username
              }
            />
            <Input
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              placeholder="Birthday"
              type="date"
              name="birthday"
              errors={
                formik.errors &&
                formik.touched.birthday &&
                formik.errors.birthday
              }
            />
            <Input
              className="md:col-start-1 md:col-end-3"
              placeholder="Email Address"
              type="email"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              name="email"
              errors={
                formik.errors && formik.touched.email && formik.errors.email
              }
            />
            <Input
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="password"
              placeholder="Password"
              name="password"
              errors={
                formik.errors &&
                formik.touched.password &&
                formik.errors.password
              }
            />
            <Input
              placeholder="Confirm Password"
              name="password_confirmation"
              type="password"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              errors={
                formik.errors &&
                formik.touched.password_confirmation &&
                formik.errors.password_confirmation
              }
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-primary w-full p-2 flex items-center justify-center rounded max-w-[60%] text-pure-white hover:opacity-90"
            >
              {isLoading ? (
                <SiSpinrilla className="animate-spin" />
              ) : (
                "Register"
              )}{" "}
            </button>
          </div>
        </form>
        <div className="py-4">
          <p>
            Already have an account ?{" "}
            <Link to="/login" state={{ from: location }} replace>
              Login
            </Link>
          </p>
        </div>
      </div>
      <div className="hidden lg:block relative">
        <img className="w-full h-full object-cover" src={auth} alt="" />
        <div className="bg-gradient-to-b from-primary absolute top-0 w-full h-full"></div>
      </div>
    </div>
  );
};

export default Register;
