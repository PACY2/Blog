import React from "react";
import { BiHeart } from "react-icons/bi";
import python from "../assets/python.jpg";

const Post_card = () => {
  return (
    <div className="postcard ">
      <div className="relative">
        <div className="bg-midtransparent-black-background rounded absolute top-0 right-0 w-full h-full"></div>
        <img src={python} className="rounded w-full object-cover h-52" alt="" />
      </div>
      <div className="px-2 h-4">
        <div className="-translate-y-5 flex justify-between items-stretch ">
          <div className="bg-dark-background border-4 border-background h-10 p-2 text-sm rounded flex items-center">
            Python is the most...
          </div>
          <div className="bg-dark-background border-4 border-background h-10 flex items-center justify-center rounded gap-1 px-2 ">
            <BiHeart className="text-primary" />
            541
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post_card;
