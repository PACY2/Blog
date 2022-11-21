import { Link } from "react-router-dom";
import { MdRoomService } from "react-icons/md";
import { BiUser, BiPlus } from "react-icons/bi";
import { useRef } from "react";
import Nav_item from "./Nav_item";
import Nav_item_dp from "./Nav_item_dp";
import gsap from "gsap";
import { useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { reset_auth } from "../../features/Auth/UserSlice";
import { useLogoutMutation } from "../../features/Auth/authApi";
import { select_auth_connected } from "../../features/Auth/UserSlice";

const Navbar = () => {
  const nav = useRef();
  const dispatch = useDispatch();
  const [logout] = useLogoutMutation();
  const is_user_connected = useSelector(select_auth_connected);

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

  async function log_out() {
    await logout();
    dispatch(reset_auth());
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
          {!is_user_connected && (
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
          {is_user_connected && (
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
