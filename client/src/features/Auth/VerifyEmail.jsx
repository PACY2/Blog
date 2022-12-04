import { SiSpinrilla } from "react-icons/si";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BiCheck } from "react-icons/bi";
import { MdOutlineError } from "react-icons/md";
import { select_auth_user, set_auth_field } from "./UserSlice";
import { useVerifyEmailMutation } from "./authApi";

const VerifyEmail = () => {
  const dispatch = useDispatch();
  const user_data = useSelector(select_auth_user);
  const [verifyEmail, { isLoading, isSuccess, isError }] =
    useVerifyEmailMutation();

  useEffect(() => {
    if (!user_data.email_verified_at) {
      verifyEmail()
        .unwrap()
        .then((res) =>
          dispatch(
            set_auth_field(["email_verified_at", res["email_verified_at"]])
          )
        );
    }
  }, []);

  return (
    <div className="w-full flex justify-center items-center">
      <div className="bg-dark-background p-2 rounded shadow-lg w-full  max-w-xl mx-4">
        <div className="h-48 flex items-center justify-center text-pure-white">
          {isLoading && <SiSpinrilla className="animate-spin w-12 h-12" />}
          {isSuccess ||
            (user_data.email_verified_at && <BiCheck className="w-24 h-24" />)}
          {isError && <MdOutlineError className="w-12 h-12" />}
        </div>
        <div>
          <h3 className="text-center font-semibold text-2xl ">
            Email Verification
          </h3>
          <div className="text-center flex justify-center gap-2 py-4">
            {isLoading && (
              <>
                We are verifying your email please be
                <div className="text-primary">patient</div>
              </>
            )}
            {isSuccess ||
              (user_data.email_verified_at && (
                <>
                  Your Email Address verified
                  <div className="text-primary">Successfully</div>
                </>
              ))}

            {isError && (
              <>
                Error
                <div className="text-primary">Occured</div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
