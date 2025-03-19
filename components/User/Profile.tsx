import React from "react";

//Styles
import styles from "./Profile.module.scss";

const Profile: React.FC = () => {
  return (
    <div className={styles.profile}>
      <h1>Profile</h1>
      <h3>My work</h3>

      <p>You did not uploaded any gifs or stickers yet</p>
    </div>
  );
};

export default Profile;
