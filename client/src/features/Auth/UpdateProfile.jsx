import { SiSpinrilla } from "react-icons/si";
import React from "react";
import Input from "../../components/Input";
import { useFormik } from "formik";
import * as yup from "yup";
import { usePatchProfileMutation } from "./authApi";
import { useDispatch } from "react-redux";
import { set_auth_user } from "./UserSlice";
import { danger_notif, success_notif } from "../../components/Notifications";

const UpdateProfile = () => {
  const dispatch = useDispatch();
  const [patchProfile, { isLoading, isSuccess, isError }] =
    usePatchProfileMutation();

  const formik = useFormik({
    initialValues: {
      username: "",
      firstname: "",
      lastname: "",
      email: "",
      current_password: "",
      password: "",
      password_confirmation: "",
    },
    validationSchema: yup.object({
      username: yup
        .string()
        .min(3, "Username Must be at least 8 characters long"),
      firstname: yup
        .string()
        .min(3, "First Name Must be at least 8 characters long"),
      lastname: yup
        .string()
        .min(3, "Last Name Must be at least 8 characters long"),
      email: yup.string().email(),
      current_password: yup
        .string()
        .min(8, "Current Password Must be at least 8 characters long")
        .required("The Current Password is required"),
      password: yup
        .string()
        .min(8, "Password Must be at least 8 characters long")
        .oneOf(
          [yup.ref("password_confirmation"), null],
          "Passwords must match"
        ),
      password_confirmation: yup
        .string()
        .min(8, "Password Must be at least 8 characters long")
        .oneOf([yup.ref("password"), null], "Passwords must match"),
    }),
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      setSubmitting(false);

      let data = {};

      Object.entries(values).forEach(([key, value]) => {
        if (value) {
          data[key] = value;
        }
      });

      if (Object.keys(data).length) {
        try {
          const user = await patchProfile(data).unwrap();
          await dispatch(set_auth_user(user));
          success_notif("Data Updated successfully");
        } catch (err) {
          Object.entries(err.data.errors).forEach(([key, value]) => {
            formik.setFieldError(key, value[0]);
          });
        }
      } else {
        danger_notif("Please Update Something first");
      }
    },
  });

  return (
    <div className="bg-dark-background shadow-md rounded p-2">
      <h3 className="text-xl p-4">
        <span className="text-primary">Update</span> Profile
      </h3>
      <form onSubmit={formik.handleSubmit}>
        <div className="grid lg:grid-cols-2 gap-2 py-2 ">
          <Input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            id="username"
            type="text"
            name="username"
            className="border-primary"
            placeholder="Username"
            errors={
              formik.touched.username && formik.errors && formik.errors.username
            }
          />
          <Input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            id="firstname"
            name="firstname"
            className="border-primary"
            type="text"
            placeholder="First Name"
            errors={
              formik.touched.firstname &&
              formik.errors &&
              formik.errors.firstname
            }
          />
          <Input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="text"
            id="lastname"
            name="lastname"
            className="border-primary"
            placeholder="Last Name"
            errors={
              formik.touched.lastname && formik.errors && formik.errors.lastname
            }
          />
          <Input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            id="email"
            name="email"
            type="email"
            className="border-primary"
            placeholder="Email Address"
            errors={
              formik.touched.email && formik.errors && formik.errors.email
            }
          />
          <Input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            id="current_password"
            name="current_password"
            type="password"
            className="border-primary lg:col-start-1 lg:col-end-3"
            placeholder="Current Password"
            errors={
              formik.touched.email &&
              formik.errors &&
              formik.errors.current_password
            }
          />
          <Input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            id="password"
            type="password"
            name="password"
            className="border-primary"
            placeholder="Password"
            errors={
              formik.touched.password && formik.errors && formik.errors.password
            }
          />
          <Input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            id="password_confirmation"
            type="password"
            name="password_confirmation"
            className="border-primary"
            placeholder="Password Confirmation"
            errors={
              formik.touched.password_confirmation &&
              formik.errors &&
              formik.errors.password_confirmation
            }
          />
        </div>
        <button type="submit" className="bg-primary p-2 rounded">
          {isLoading ? <SiSpinrilla className="animate-spin" /> : "update"}
        </button>
      </form>
    </div>
  );
};

export default UpdateProfile;
