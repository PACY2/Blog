import React from "react";
import profile_cover from "../assets/profile_cover.jpg";

const Sub_profile = () => {
  return (
    <div className="Sub_profile bg-dark-background rounded ">
      <div className="relative">
        <img
          src={profile_cover}
          className="h-52 w-full rounded-tr rounded-tl object-cover"
          alt=""
        />
        <div className="absolute w-full h-full bg-gradient-to-b from-dark-background top-0"></div>
      </div>
      <div className="p-2">
        <div className="h-4 relative flex justify-center">
          <img
            src={profile_cover}
            className="absolute bottom-0 w-20 rounded-full h-20 shadow-lg"
            alt=""
          />
        </div>
        <div className="text-center my-2 text-xl text-pure-white font-semibold">
          <span className="text-primary">Mouharch</span> Choaib
        </div>
        <div className="grid grid-cols-3 text-center gap-2 py-4 text-sm lg:text-md">
          <div className="border-r-2">
            <p>400+</p>
            <p>Followers</p>
          </div>
          <div className="border-r-2">
            <p>65+</p>
            <p>Posts</p>
          </div>
          <div>
            <p>1024+</p>
            <p>Total likes</p>
          </div>
        </div>
        <div className="text-center pb-4 text-xs lg:text-md">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nobis,
          incidunt.
        </div>
      </div>
    </div>
  );
};

export default Sub_profile;
