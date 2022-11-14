import React from "react";
import { BiSearch } from "react-icons/bi";
import Input from "../../components/Input";
import Post_card from "../../components/Post_card";
import profile_cover from "../../assets/profile_cover.jpg";
import Sub_profile from "../../components/Sub_profile";

const Home = () => {
  return (
    <div className="w-full h-full flex flex-col gap-2 p-2 ">
      <Input
        placeholder="Search"
        name="search"
        icon={
          <button>
            <BiSearch />
          </button>
        }
      />
      <div
        className="h-[calc(100vh_-_70px)] flex flex-col-reverse gap-2 xl:grid grid-cols-12  items-stretch 
      overflow-y-scroll scrollbar pb-2 pr-2
      "
      >
        <div className="col-start-1 col-end-11">
          <div className="grid  md:grid-cols-2 xl:grid-cols-3  gap-2">
            {[
              1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6,
              7, 8,
            ].map((e) => (
              <Post_card key={e} />
            ))}
          </div>
        </div>
        <div className="p-0 col-start-11 col-end-13 relative">
          <div className=" sticky top-0">
            <Sub_profile />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
