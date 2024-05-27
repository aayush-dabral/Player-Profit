import React from "react";
import ProfileSidebar from "../../components/profileSidebar";

const Profile = ({ children }) => {
  return (
    <div className="bg-black flex flex-col xl:flex-row">
      <div className="order-1">
        <ProfileSidebar />
      </div>
      <div className="order-2 flex-[1_0_16rem]">{children}</div>
    </div>
  );
};

export default Profile;
