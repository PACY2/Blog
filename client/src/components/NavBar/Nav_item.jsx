import { Link } from "react-router-dom";
import { BsTriangleFill } from "react-icons/bs";

const Nav_item = ({ to, text, desc }) => {
  return (
    <div className="group relative bg-background h-12 flex justify-center text-lg items-center rounded">
      <Link
        to={to}
        className="group-hover:text-primary flex items-center justify-center w-full h-full text-pure-white"
      >
        {text}
      </Link>
      {desc && (
        <div className="group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 -translate-x-3 opacity-0 pointer-events-none  absolute left-20 z-50 text-sm p-1 shadow-md bg-primary text-pure-white rounded">
          <div className="flex relative">
            <div className="absolute -left-3 text-primary h-full text-xs flex items-center">
              <BsTriangleFill className="-rotate-90" />
            </div>
            <div className=" whitespace-nowrap">{desc}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Nav_item;
