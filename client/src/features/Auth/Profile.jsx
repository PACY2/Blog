import React from "react";
import { useSelector } from "react-redux";
import auth from "../../assets/auth.jpg";
import SubProfile from "./SubProfile";
import UpdateProfile from "./UpdateProfile";
import { select_auth } from "./UserSlice";
import Post_card from "../../components/Post_card";
import { formatDistance, subDays } from "date-fns";
import { useParams } from "react-router-dom";
import Loading from "../../components/Loading";
import { useGetProfileByIdQuery } from "./authApi";
import { useEffect } from "react";
import { useState } from "react";
import { danger_notif } from "../../components/Notifications";

const Profile = () => {
  const [is_loading, set_is_loading] = useState(true);
  const user = useSelector(select_auth);
  const [skip, set_skip] = useState(true);
  const [profile_data, set_profile_data] = useState(null);
  const { id } = useParams();
  const { data, isSuccess, isError } = useGetProfileByIdQuery(
    {
      id,
    },
    { skip }
  );

  useEffect(() => {
    if (user.user.id !== id) {
      set_skip(false);
    } else {
      set_profile_data(user.user);
      set_is_loading(false);
    }
  }, []);

  useEffect(() => {
    if (isSuccess) {
      set_profile_data(data);
      set_is_loading(false);
    }

    if (isError) {
      danger_notif("An Error Occured Please Try again later");
    }
  }, [data]);

  return (
    <>
      {is_loading ? (
        <Loading />
      ) : (
        <div className="h-screen w-full overflow-y-scroll">
          <div className="w-full relative h-64 ">
            <img src={auth} className="h-full w-full object-cover" alt="" />
            <div className="bg-midtransparent-black-background w-full h-64 absolute top-0 left-0"></div>
          </div>
          <div className="container px-4 mx-auto -translate-y-12 grid lg:grid-cols-12 gap-4 ">
            <div className="lg:col-start-1 lg:col-end-10 flex flex-col gap-4 ">
              {user.user.id == id && <UpdateProfile />}
              <div className="grid lg:grid-cols-2 gap-4 ">
                <h3 className="bg-dark-background rounded p-2 shadow-md text-xl col-start-1 lg:col-end-3">
                  <span className="text-primary">Posts</span> by{" "}
                  {user.user.username}
                </h3>
                {profile_data.posts_count ? (
                  profile_data.posts.map((post, i) => (
                    <Post_card
                      key={i}
                      title={post.title}
                      created_at={formatDistance(
                        subDays(new Date(), new Date(post.created_at).getDay()),
                        new Date(),
                        {
                          addSuffix: true,
                        }
                      )}
                      owner={user.user.username}
                    />
                  ))
                ) : (
                  <h3 className="bg-dark-background rounded p-2 shadow-md text-md text-end col-start-1 lg:col-end-3">
                    <span className="text-primary">No Posts</span> by{" "}
                    {user.user.username}
                  </h3>
                )}
              </div>
            </div>
            <div className="row-start-1 lg:col-start-10 lg:col-end-13">
              <SubProfile
                role={profile_data.role.name}
                username={profile_data.username}
                posts_count={profile_data.posts_count}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
