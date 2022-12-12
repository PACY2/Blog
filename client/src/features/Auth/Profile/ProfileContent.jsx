import { formatDistance, subDays } from "date-fns";
import { useEffect } from "react";
import auth from "../../../assets/auth.jpg";
import Post_card from "../../../components/Post_card";
import SubProfile from "../SubProfile";
import UpdateProfile from "../UpdateProfile";
import { apiConfig } from "../../../config/api";

const ProfileContent = ({ profile_data, is_profile }) => {
  return (
    <div className="h-screen w-full overflow-y-scroll scrollbar">
      <div className="container px-4 mx-auto  py-8 grid lg:grid-cols-12 gap-4 ">
        <div className="lg:col-start-1 lg:col-end-10 flex flex-col gap-4 ">
          {/* {is_profile && <UpdateProfile />} */}
          <div className="grid lg:grid-cols-2 gap-4 ">
            <h3 className="bg-dark-background rounded p-2 shadow-md text-xl col-start-1 lg:col-end-3">
              <span className="text-primary">Posts</span> by{" "}
              {profile_data.username}
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
                  owner={profile_data.username}
                />
              ))
            ) : (
              <h3 className="bg-dark-background rounded p-2 shadow-md text-md text-end col-start-1 lg:col-end-3">
                <span className="text-primary">No Posts</span> by
                {profile_data.username}
              </h3>
            )}
          </div>
        </div>
        <div className="row-start-1 lg:col-start-10 lg:col-end-13">
          <SubProfile
            is_profile={is_profile}
            cover={profile_data.cover}
            profile={profile_data.profile}
            role={profile_data.role.name}
            username={profile_data.username}
            posts_count={profile_data.posts_count}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileContent;
