import Image from "next/image";
import React from "react";

const Profile: React.FC = () => {
  return (
    <div>
      <h2>Profile</h2>
      {/* <div>
        <Image
          src="/images/avatar.svg"
          width={100}
          height={100}
          alt="avatar"
          priority
        />
      </div> */}
      <h3>My work</h3>
      <p>You did not uploaded any gifs or stickers yet</p>
    </div>
  );
};

export default Profile;
