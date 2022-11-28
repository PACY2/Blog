import React from "react";
import Input from "../../components/Input";
import { useFormik } from "formik";
import * as yup from "yup";
import { useForgetPasswordMutation } from "./authApi";
import { info_notif } from "../../components/Notifications";
import { AiOutlineArrowRight } from "react-icons/ai";
import { useRef } from "react";
import { SiSpinrilla } from "react-icons/si";

const ForgetPassword = () => {
  const [forgetPassword, { isLoading, isError, isSuccess }] =
    useForgetPasswordMutation();

  const inputRef = useRef(null);

  const handle_submit = async (values, { setSubmitting }) => {
    setSubmitting(false);
    try {
      await forgetPassword(values).unwrap();
      info_notif(
        "If there is an Account with the provided Email Address we will send an email to it"
      );
      inputRef.current.querySelector("input").value = "";
    } catch (err) {
      Object.entries(err.data.errors).forEach(([key, value]) => {
        formik.setFieldError(key, value[0]);
      });
    }
  };

  const validationSchema = yup.object({
    email: yup
      .string()
      .email("This is not a valid Email Address")
      .required("The Email Address is required"),
  });

  const initialValues = {
    email: "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handle_submit,
  });

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className=" p-2 rounded w-full max-w-xl mx-4">
        <h3 className="font-midebold text-xl text-pure-white    ">
          <span className="text-primary">Forget</span> Password
        </h3>
        <p className=" py-4">
          Insert your email in the "Email Address" field down so we can send you
          a reset password email
        </p>
        <form
          onSubmit={formik.handleSubmit}
          className="flex items-stretch"
          ref={inputRef}
        >
          <Input
            placeholder="Email Address..."
            name="email"
            type="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full"
            icon={
              isLoading ? (
                <SiSpinrilla className="animate-spin" />
              ) : (
                <button type="submit">
                  <AiOutlineArrowRight />
                </button>
              )
            }
          />
        </form>
        {formik.errors && formik.touched.email && (
          <div className="text-sm text-primary p-2">{formik.errors.email}</div>
        )}
      </div>
    </div>
  );
};

export default ForgetPassword;
