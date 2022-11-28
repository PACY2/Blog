import { useState } from "react";
import {
  useUpdateResetedPasswordMutation,
  useVerifyResetPasswordTokenQuery,
} from "./authApi";
import { SiSpinrilla } from "react-icons/si";
import Input from "../../components/Input";
import { useParams, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { MdOutlineError } from "react-icons/md";
import { BiCheck } from "react-icons/bi";

const ResetPassword = () => {
  const [content, setContent] = useState("");
  const { token } = useParams("token");
  const [searchParams] = useSearchParams();
  const [
    updateResetedPassword,
    {
      isLoading: isUpdateResetedPasswordLoading,
      isSuccess: isUpdateResetedPasswordSuccess,
      isError: isUpdateResetedPasswordError,
    },
  ] = useUpdateResetedPasswordMutation();

  const { verifyResetPasswordToken, isSuccess, isLoading, isError, error } =
    useVerifyResetPasswordTokenQuery();

  const handle_submit = (values, { setSubmitting }) => {
    setSubmitting(false);
    updateResetedPassword({
      ...values,
      token,
      email: searchParams.get("email"),
    });
  };

  const validationSchema = yup.object({
    password: yup
      .string()
      .min(8, "The password should be at least 8 characters long")
      .required("The Password is required"),
    password_confirmation: yup
      .string()
      .min(8, "The Password Confirmation should be at least 8 characters long")
      .required("The Password Confirmation is required")
      .oneOf([yup.ref("password"), null], "Passwords must match"),
  });

  const initialValues = { password: "", password_confirmation: "" };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handle_submit,
  });

  return (
    <div className="w-full h-screen flex items-center justify-center ">
      <div className=" p-4 rounded w-full max-w-xl bg-dark-background">
        {(isLoading || isError) && (
          <>
            <div className="py-12 flex items-center justify-center">
              {isError ? (
                <MdOutlineError className="text-4xl text-primary" />
              ) : (
                <SiSpinrilla className="animate-spin text-4xl text-primary" />
              )}
            </div>
            <div className="text-center">
              {isError ? (
                <p>An Error occured please try again later</p>
              ) : (
                <p>
                  We are verifing your <br /> "Reset Password Request" please be
                  patient...
                </p>
              )}
            </div>
          </>
        )}
        {isSuccess && (
          <>
            {!isUpdateResetedPasswordError ? (
              <>
                {!isUpdateResetedPasswordSuccess ? (
                  <>
                    <div className="">
                      <h3 className="text-xl font-semibold ">
                        <span className="text-primary">Reset</span> Password
                      </h3>
                      <p className="text-sm my-4">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Eaque similique odio voluptates quidem praesentium illo!
                      </p>
                    </div>
                    <form
                      className="flex flex-col gap-2"
                      onSubmit={formik.handleSubmit}
                    >
                      <Input
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="Password..."
                        type="password"
                        name="password"
                        className="border-primary"
                        errors={
                          formik.errors &&
                          formik.touched.password &&
                          formik.errors.password
                        }
                      />

                      <Input
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="Password Confirmation..."
                        className="border-primary"
                        type="password"
                        name="password_confirmation"
                        errors={
                          formik.errors &&
                          formik.touched.password_confirmation &&
                          formik.errors.password_confirmation
                        }
                      />

                      <button
                        type="submit"
                        className="bg-primary p-2  rounded text-pure-white flex justify-center items-center"
                      >
                        {isUpdateResetedPasswordLoading ? (
                          <SiSpinrilla className="animate-spin my-2" />
                        ) : (
                          "reset"
                        )}
                      </button>
                    </form>
                  </>
                ) : (
                  <>
                    <div className="py-12 flex items-center justify-center">
                      <BiCheck className="text-6xl text-primary" />
                    </div>
                    <div className="text-center">
                      <p>Password Updated Successfully</p>
                    </div>
                  </>
                )}
              </>
            ) : (
              <>
                <div className="py-12 flex items-center justify-center">
                  <MdOutlineError className="text-4xl text-primary" />
                </div>
                <div className="text-center">
                  <p>An Error Occured please try again</p>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
