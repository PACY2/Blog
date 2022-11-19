import { BsTriangleFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { MdRoomService } from "react-icons/md";
import { BiHome, BiWorld, BiUser, BiPlus } from "react-icons/bi";
import { TiArrowSortedDown } from "react-icons/ti";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import Nav_item from "./Nav_item";
import Nav_item_dp from "./Nav_item_dp";
import gsap from "gsap";
import { useLayoutEffect } from "react";
import { logout, fetch_user_state } from "../../features/Auth/UserSlice";
import { useDispatch, useSelector } from "react-redux";

const Navbar = () => {
  const nav = useRef();
  const dispatch = useDispatch();
  const user_data = useSelector(fetch_user_state);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo(
        nav.current,
        {
          translateX: -40,
          opacity: 0,
        },
        {
          translateX: 0,
          opacity: 1,
          delay: 0.3,
        }
      );
    });
    return () => ctx.revert();
  }, []);

  function log_out() {
    dispatch(logout());
  }

  return (
    <nav
      ref={nav}
      className="w-14 bg-dark-background p-2 flex flex-col justify-between"
    >
      <div className="flex flex-col gap-2">
        <div className="bg-primary h-10 flex justify-center items-center text-2xl text-pure-white rounded">
          <MdRoomService />
        </div>
        <Nav_item to="/login" text={<BiPlus />} desc="Add new post" />
      </div>
      <div>
        <Nav_item_dp icon={<BiUser />}>
          {!user_data.user && (
            <>
              <Link
                className="text-pure-white hover:text-primary font-semibold rounded transition duration-200 py-1 pl-2 pr-3"
                to="/login"
              >
                Login
              </Link>
              <Link
                className="text-pure-white hover:text-primary font-semibold rounded transition duration-200 py-1 pl-2 pr-3"
                to="/register"
              >
                Register
              </Link>
            </>
          )}
          {user_data.user && (
            <>
              <Link
                className="text-pure-white hover:text-primary font-semibold rounded transition duration-200 py-1 pl-2 pr-3"
                to="/profile"
              >
                Profile
              </Link>
              <button
                onClick={() => log_out()}
                className="text-pure-white hover:text-primary font-semibold  rounded  py-1 pl-2 pr-3 shadow-lg"
                to="/logout"
              >
                Logout
              </button>
            </>
          )}
        </Nav_item_dp>
      </div>
    </nav>
  );
};

export default Navbar;
