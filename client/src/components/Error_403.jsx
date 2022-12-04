import React from "react";
import { BiWorld } from "react-icons/bi";

const Error_403 = () => {
  return (
    <div className="w-full flex justify-center items-center">
      <div className="max-w-[80%] flex flex-col gap-4">
        <h1 className="text-8xl flex justify-center items-center">
          4<BiWorld className="animate-spin" />3
        </h1>
        <h3 className="text-center">
          Oops looks like you don't have the permission to be here
        </h3>
      </div>
    </div>
  );
};

export default Error_403;
