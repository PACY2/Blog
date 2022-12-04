import auth from "../assets/auth.jpg";
import python from "../assets/python.jpg";

const Post_card = ({ title, owner, created_at }) => {
  return (
    <div className="bg-dark-background rounded p-2 shadow-md text-xl">
      <div className="h-60 relative ">
        <img className="w-full h-full object-cover rounded" src={auth} alt="" />
        <div className=" bg-midtransparent-black-background w-full h-full absolute top-0 left-0 rounded"></div>
      </div>
      <div className="text-sm grid grid-cols-6 px-4">
        <div className="col-start-1 col-end-6 flex py-4 flex-col">
          <span className="flex-1 font-medium ">
            <span className="text-primary">@ </span>
            {owner}
          </span>
          <h4 className="flex-1 text-xl font-semibold py-2 underline">
            {title}
          </h4>
          <span className="flex-1  flex items-center gap-4 ">
            <span className="font-medium">45.6K views</span>
            <span className="font-medium">{created_at}</span>
          </span>
        </div>
        <div className="relative col-start-6 col-end-7 flex justify-start">
          <img
            className="absolute -top-12  w-20 h-20 rounded-full object-cover "
            src={python}
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Post_card;
