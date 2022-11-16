import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { BsTriangleFill } from "react-icons/bs";

const Nav_item_dp = ({ children, icon }) => {
  const [dp_hidden, set_dp_hidden] = useState(true);
  const button = useRef(null);

  useEffect(() => {
    const event_function = (event) => {
      if (event.target != button.current) set_dp_hidden(true);
    };

    if (!dp_hidden) {
      window.addEventListener("click", event_function);
    } else {
      window.removeEventListener("click", event_function);
    }
  }, [dp_hidden]);

  return (
    <div className="group relative bg-background h-10 flex justify-center text-lg items-center text-pure-white rounded">
      <button
        ref={button}
        onClick={() => set_dp_hidden(!dp_hidden)}
        className="group-hover:text-primary flex items-center justify-center w-full h-full"
      >
        <div className=" pointer-events-none">{icon}</div>
      </button>
      <div
        className={`absolute left-20 bottom-0 z-50 bg-dark-background shadow-md p-1 rounded ${
          dp_hidden && "hidden"
        } `}
      >
        <div className="relative flex items-end">
          <div className="absolute h-10 -left-4 text-sm text-dark-background flex items-center">
            <BsTriangleFill className="-rotate-90" />
          </div>
          <div className="flex flex-col gap-2 ">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Nav_item_dp;
