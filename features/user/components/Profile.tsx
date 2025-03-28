import React from "react";

//Styles
import styles from "./Profile.module.scss";

const Profile: React.FC = () => {
  return (
    <div className={styles.profile}>
      <h1>Profile</h1>
      <h3 className={styles.noContent}>
        You did not uploaded any gifs or stickers yet.
      </h3>
    </div>
  );
};

export default Profile;
