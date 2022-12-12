import { SiSpinrilla } from "react-icons/si";
import React from "react";
import Input from "../../components/Input";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDeleteProfileMutation, usePatchProfileMutation } from "./authApi";
import { useDispatch } from "react-redux";
import { reset_auth, set_auth_user } from "./UserSlice";
import { danger_notif, success_notif } from "../../components/Notifications";
import MuSwal from "../../components/MuSwal";
import { useRef } from "react";

const UpdateProfile = ({ setIsOpen }) => {
  const dispatch = useDispatch();
  const [destroy_account, { isLoading: isDesLoading, isSuccess, isError }] =
    useDeleteProfileMutation();
  const [patchProfile, { isLoading }] = usePatchProfileMutation();
  const profile = useRef(null);
  const cover = useRef(null);

  const formik = useFormik({
    initialValues: {
      username: "",
      firstname: "",
      lastname: "",
      email: "",
      current_password: "",
      password: "",
      password_confirmation: "",
      profile: null,
      cover: null,
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
      profile: yup.mixed().nullable(),
      cover: yup.mixed().nullable(),
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
        let formdata = new FormData();

        formdata.append("_method", "patch");

        Object.entries(data).forEach(([key, value]) => {
          formdata.append(key, value);
        });

        try {
          const user = await patchProfile(formdata).unwrap();
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

  async function handle_delete() {
    const response = await MuSwal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      input: "password",
      inputAttributes: {
        placeholder: "Password...",
        name: "password",
      },
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
      showLoaderOnConfirm: true,
      preConfirm: async (password) => {
        try {
          const response = await destroy_account({ password }).unwrap();
          return response;
        } catch (err) {
          MuSwal.showValidationMessage(err.data.message);
        }
      },
    });

    if (response.isConfirmed) {
      await MuSwal.fire({
        icon: "success",
        title: "Account Deleted successfully",
        showConfirmButton: false,
        timer: 1500,
      });

      dispatch(reset_auth());
    }
  }

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="h-full w-full flex flex-col p-2"
    >
      <div className="flex-1 ">
        <div className="grid lg:grid-cols-2 gap-2">
          <Input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            id="username"
            type="text"
            name="username"
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
            className="lg:col-start-1 lg:col-end-3"
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
            placeholder="Password Confirmation"
            errors={
              formik.touched.password_confirmation &&
              formik.errors &&
              formik.errors.password_confirmation
            }
          />
          <button
            type="button"
            onClick={() => profile.current.click()}
            className="p-3 text-start bg-dark-background border-2  border-dark-background hover:border-primary rounded"
          >
            <input
              onChange={(e) =>
                formik.setFieldValue("profile", e.target.files[0])
              }
              onBlur={formik.handleBlur}
              id="profile"
              name="profile"
              ref={profile}
              type="file"
              className="hidden"
            />
            Choose Profile
          </button>
          {formik.touched.profile && formik.errors && formik.errors.profile}
          <button
            type="button"
            onClick={() => cover.current.click()}
            className="p-3 text-start bg-dark-background border-2  border-dark-background hover:border-primary rounded"
          >
            Update Cover
            <input
              onChange={(e) => formik.setFieldValue("cover", e.target.files[0])}
              onBlur={formik.handleBlur}
              id="cover"
              name="cover"
              ref={cover}
              type="file"
              className="hidden"
            />
          </button>
          {formik.touched.cover && formik.errors && formik.errors.cover}
        </div>
      </div>
      <div className="flex items-center justify-end gap-2 pt-2">
        <button
          type="submit"
          className="bg-success py-2 px-4 font-semibold rounded"
        >
          {isLoading ? <SiSpinrilla className="animate-spin" /> : "Update"}
        </button>
        <button
          type="button"
          onClick={handle_delete}
          className="bg-danger py-2 px-4  font-semibold rounded"
        >
          Delete account
        </button>
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="bg-primary rounded py-2  font-semibold px-4"
        >
          Close
        </button>
      </div>
    </form>
  );
};

export default UpdateProfile;
