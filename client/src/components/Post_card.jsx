import React from "react";
import { BiHeart } from "react-icons/bi";
import python from "../assets/python.jpg";
import gsap from "gsap";
import { useLayoutEffect } from "react";
import { useRef } from "react";

const Post_card = () => {
  const ctx = useRef();
  const image = useRef();

  useLayoutEffect(() => {
    ctx.current = gsap.context(() => {});
    return ctx.current.revert();
  }, []);

  function handle_mouse_over() {
    ctx.current.add(() => {
      gsap.to(image.current, { scale: 1.2 });
    });
  }

  function handle_mouse_out() {
    ctx.current.add(() => {
      gsap.to(image.current, { scale: 1 });
    });
  }

  return (
    <div
      onMouseOver={() => {
        handle_mouse_over();
      }}
      onMouseOut={() => {
        handle_mouse_out();
      }}
      className="postcard lg:h-60 bg-dark-background rounded  lg:grid grid-cols-4 items-stretch shadow-md"
    >
      <div className=" relative col-start-1 col-end-3 overflow-hidden">
        <img
          ref={image}
          src={python}
          className="w-full h-60 object-cover rounded-tl rounded-bl"
          alt=""
        />
        <div className="absolute w-full h-full top-0 bg-midtransparent-black-background"></div>
      </div>
      <div className="p-4 col-start-3 col-end-5 flex flex-col">
        {/* // tags */}
        <div className="flex gap-2 whitespace-nowrap text-ellipsis">
          <p className="bg-background p-1 px-2 text-sm rounded">python</p>
          <p className="bg-background p-1 px-2 text-sm rounded">Google Ads</p>
          <p className="bg-background p-1 px-2 text-sm rounded">
            data structures
          </p>
        </div>

        <div className="flex h-full  flex-col">
          <h3 className="my-2 text-lg font-semibold hover:underline">
            Lorem, ipsum dolor sit amet con...
          </h3>
          <p className="flex-1 mb-4 lg:m-0">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint, animi
            reprehenderit doloremque nobis...
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-sm">
              <div>
                <img className="w-10 h-10 rounded-full" src={python} alt="" />
              </div>
              <div>
                <p className="font-semibold">Camado Choaib</p>
                <p>25min ago</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <BiHeart className="text-primary" />
              652
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post_card;
