import Button from "@/components/UI/Button";
import React from "react";

//Icons
import { FcGoogle } from "react-icons/fc";
import { ImFacebook2 } from "react-icons/im";

//Styles
import styles from "./Providers.module.scss";

const Providers: React.FC = () => {
  return (
    <div className={styles.providersContainer}>
      <Button
        className={styles.loginWithGoogleButton}
        icon={<FcGoogle />}
        iconPosition="right"
      >
        Log in with Google
      </Button>
      <Button
        className={styles.loginWithFacebookButton}
        icon={<ImFacebook2 />}
        iconPosition="right"
      >
        Log in with Facebook
      </Button>
    </div>
  );
};

export default Providers;
