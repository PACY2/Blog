import { useEffect } from "react";
import { useRef } from "react";
import { MdRoomService } from "react-icons/md";
import { Link } from "react-router-dom";
import auth from "../../assets/auth.jpg";

const Register = () => {
  return (
    <div className="w-full lg:grid lg:grid-cols-2">
      <div className="w-full h-full flex flex-col justify-center  items-center px-4">
        <form className="flex flex-col  gap-3 w-full max-w-lg">
          <h2 className="text-8xl  flex justify-center items-center ">
            <Link to="/" className="text-pure-white">
              <MdRoomService />
            </Link>
          </h2>
          <div className="grid md:grid-cols-2 gap-2">
            <input
              placeholder="First Name..."
              className="outline-none border-2 border-dark-background  bg-dark-background p-3 rounded"
              type="text"
              name="firstname"
            />
            <input
              name="lastname"
              placeholder="Last Name..."
              className="outline-none border-2 border-dark-background focus:border-primary bg-dark-background p-3 rounded"
              type="text"
            />
            <input
              name="username"
              placeholder="Username..."
              className="outline-none border-2 border-dark-background focus:border-primary bg-dark-background p-3 rounded"
              type="text"
            />
            <input
              placeholder="Email Address..."
              className="outline-none border-2 border-dark-background focus:border-primary bg-dark-background p-3 rounded"
              type="email"
              name="email"
            />
            <input
              name="password"
              placeholder="Password..."
              className="outline-none border-2 border-dark-background focus:border-primary bg-dark-background p-3 rounded"
              type="password"
            />
            <input
              name="password_confirmation"
              placeholder="Password..."
              className="outline-none border-2 border-dark-background focus:border-primary bg-dark-background p-3 rounded"
              type="password"
            />
          </div>
          <div className="flex justify-center">
            <button className="bg-primary w-full p-2 rounded max-w-[60%] text-pure-white hover:opacity-90">
              Register
            </button>
          </div>
        </form>
        <div className="py-4">
          <p>
            Already have an account ? <Link to="/login">Login</Link>
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
