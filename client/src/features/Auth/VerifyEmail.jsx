import { SiSpinrilla } from "react-icons/si";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  verify_email,
  set_email_verified_at_status,
  fetch_user_state,
} from "./UserSlice";
import { BiCheck } from "react-icons/bi";

import { MdOutlineError } from "react-icons/md";

const VerifyEmail = () => {
  const dispatch = useDispatch();
  const user_data = useSelector(fetch_user_state);

  useEffect(() => {
    if (!user_data.user.email_verified_at) {
      dispatch(verify_email());
    } else {
      dispatch(set_email_verified_at_status("success"));
    }
  }, []);

  return (
    <div className="w-full flex justify-center items-center">
      <div className="bg-dark-background p-2 rounded shadow-lg w-full  max-w-xl mx-4">
        <div className="h-48 flex items-center justify-center text-pure-white">
          {user_data.email_verified_at_status === "loading" && (
            <SiSpinrilla className="animate-spin w-12 h-12" />
          )}
          {user_data.email_verified_at_status === "success" && (
            <BiCheck className="w-24 h-24" />
          )}
          {user_data.email_verified_at_status === "failed" && (
            <MdOutlineError className="w-12 h-12" />
          )}
        </div>
        <div>
          <h3 className="text-center font-semibold text-2xl ">
            Email Verification
          </h3>
          <div className="text-center flex justify-center gap-2 py-4">
            {user_data.email_verified_at_status === "loading" && (
              <>
                We are verifying your email please be
                <div className="text-primary">patient</div>
              </>
            )}
            {user_data.email_verified_at_status === "success" && (
              <>
                Your Email Address verified
                <div className="text-primary">Successfully</div>
              </>
            )}

            {user_data.email_verified_at_status === "failed" && (
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
