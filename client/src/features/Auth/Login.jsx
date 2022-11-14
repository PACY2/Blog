import { MdRoomService } from "react-icons/md";
import { Link } from "react-router-dom";
import auth from "../../assets/auth.jpg";

const Login = () => {
  return (
    <div className="w-full lg:grid lg:grid-cols-2">
      <div className="hidden lg:block relative">
        <img className="w-full h-full object-cover" src={auth} alt="" />
        <div className="bg-gradient-to-b from-primary absolute top-0 w-full h-full"></div>
      </div>
      <div className="w-full h-full flex flex-col justify-center  items-center px-4">
        <form className="flex flex-col  gap-3 w-full max-w-sm">
          <h2 className="text-8xl  flex justify-center items-center ">
            <Link to="/" className="text-pure-white">
              <MdRoomService />
            </Link>
          </h2>
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
          <div className="flex justify-center">
            <button className="bg-primary w-full p-2 rounded max-w-[60%] text-pure-white hover:opacity-90">
              Login
            </button>
          </div>
        </form>

        <div className="text-center p-4">
          <p>
            Dont have an account ? <Link to="/register">Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
