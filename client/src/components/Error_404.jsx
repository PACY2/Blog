import React from "react";
import { BiWorld } from "react-icons/bi";

const Error_404 = () => {
  return (
    <div className="w-full flex justify-center items-center">
      <div className="max-w-[80%] flex flex-col gap-4">
        <h1 className="text-8xl flex justify-center items-center">
          4<BiWorld className="animate-spin" />4
        </h1>
        <h3 className="text-center">
          Oops looks like your ship reached a place doesn't exist
        </h3>
      </div>
    </div>
  );
};

export default Error_404;
