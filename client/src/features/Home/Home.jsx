import React from "react";
import { BiSearch } from "react-icons/bi";
import Input from "../../components/Input";
import Post_card from "../../components/Post_card";
import Sub_profile from "../../components/Sub_profile";
import gsap from "gsap";
import { useRef } from "react";
import { useLayoutEffect } from "react";
import Useful_tags from "../../components/Useful_tags";

const Home = () => {
  const container = useRef();

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo(
        "#search",
        { opacity: 0, translateY: -40 },
        { opacity: 1, translateY: 0, delay: 0.3 }
      );
      gsap.fromTo(
        ".postcard",
        { opacity: 0, translateY: 40 },
        { opacity: 1, translateY: 0, delay: 1.2, stagger: 0.1 }
      );
      gsap.fromTo(
        ".right-side > div",
        { opacity: 0, translateY: 40 },
        { opacity: 1, translateY: 0, delay: 0.7, stagger: 0.1 }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <div ref={container} className="w-full h-full flex flex-col gap-2 p-2 ">
      <Input
        id="search"
        placeholder="Search"
        name="search"
        icon={
          <button>
            <BiSearch />
          </button>
        }
      />
      <div className="h-full grid lg:grid-cols-4 overflow-y-scroll gap-2 scrollbar pr-2">
        <div className=" lg:col-start-1 lg:col-end-4 grid xl:grid-cols-2 gap-2 ">
          <Post_card />
        </div>
        <div className="right-side row-start-1  lg:col-start-4 lg:col-end-5 flex flex-col gap-2">
          <Sub_profile />
          <Useful_tags />
        </div>
      </div>
    </div>
  );
};

export default Home;
