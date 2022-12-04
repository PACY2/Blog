import auth from "../../assets/auth.jpg";
import python from "../../assets/python.jpg";

const SubProfile = ({ role, username, posts_count }) => {
  return (
    <div className="bg-dark-background shadow-md rounded">
      <div className="h-52 relative">
        <img src={auth} className="h-full w-full object-cover rounded" alt="" />
        <div className="absolute top-0 left-0 w-full h-full bg-midtransparent-black-background rounded ">
          <span
            className={`uppercase px-2 text-sm text-pure-white bg-success rounded p-2 m-2  block w-fit ${
              role === "admin" && "bg-danger"
            }`}
          >
            {role}
          </span>
        </div>
      </div>
      <div className="flex justify-center h-10">
        <img
          src={python}
          className="-translate-y-14 w-24 h-24 shadow-lg rounded-full"
          alt=""
        />
      </div>
      <div className="text-center pt-3 uppercase font-medium text-md">
        <span className="text-primary text-xl">@</span>
        {username}
      </div>
      <div className="flex items-stretch text-center py-4">
        <div className="flex-1 ">
          <div className="font-bold">Followers</div>
          <div>+652</div>
        </div>
        <div className="flex-1 border-x">
          <div className="font-bold">Posts</div>
          <div>{posts_count}</div>
        </div>
        <div className="flex-1 ">
          <div className="font-bold">Visits</div>
          <div>+212</div>
        </div>
      </div>
      <div className="p-2 text-center pb-6">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Modi, optio.
      </div>
    </div>
  );
};

export default SubProfile;
