import { Outlet } from "react-router-dom";
import Navbar from "../../components/NavBar/Navbar";

const Main = () => {
  return (
    <section className="flex items-stretch w-full flex-row-reverse">
      <section className="flex-1 h-screen">
        <Outlet />
      </section>
      <Navbar />
    </section>
  );
};

export default Main;
