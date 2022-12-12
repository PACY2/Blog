import React from "react";
import { useSelector } from "react-redux";
import { select_auth_user } from "../UserSlice";
import { useParams } from "react-router-dom";
import Loading from "../../../components/Loading";
import { useGetProfileByIdQuery } from "../authApi";
import { useEffect } from "react";
import { useState } from "react";
import ProfileContent from "./ProfileContent";

const Profile = () => {
  const user_data = useSelector(select_auth_user);
  const [profile_data, setProfile_data] = useState(user_data);
  const { id } = useParams();
  const data = useGetProfileByIdQuery({ id }, { skip: user_data.id == id });

  useEffect(() => {
    if (user_data.id == id) {
      setProfile_data(user_data);
    }
  }, [id]);

  useEffect(() => {
    setProfile_data(user_data);
  }, [user_data]);

  useEffect(() => {
    if (user_data.id != id && !data.isLoading && data.isSuccess) {
      setProfile_data(data.data);
    }

    console.log(data);
  }, [data]);

  return (
    <>
      {user_data.id == id ? (
        <ProfileContent
          profile_data={profile_data}
          is_profile={user_data.id == id}
        />
      ) : data.isLoading || data.isFetching ? (
        <Loading />
      ) : data.isError ? (
        "Page Not FOund"
      ) : (
        <ProfileContent
          profile_data={profile_data}
          is_profile={user_data.id == id}
        />
      )}
    </>
  );
};

export default Profile;
