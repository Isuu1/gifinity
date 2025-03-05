import React from "react";

//Components
import Button from "@/components/UI/Button";
import Form from "@/components/UI/Form";
import Input from "@/components/UI/Input";

//Icons
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { FcGoogle } from "react-icons/fc";
import { ImFacebook2 } from "react-icons/im";

//Styles
import styles from "./LoginForm.module.scss";

//Utils
import { login } from "@/app/login/actions";

const LoginForm: React.FC = () => {
  return (
    <div className={styles.loginFormContainer}>
      <h2>Log in to Gifinity</h2>
      <h4>Access your favorites, sync across devices, and more!</h4>
      <Form action={login}>
        <Input
          type="email"
          id="email"
          label="Email"
          required
          theme="white"
          labelHidden
          placeholder="Email"
          icon={<MdEmail />}
        />
        <Input
          type="password"
          id="password"
          label="Password"
          required
          theme="white"
          labelHidden
          placeholder="Password"
          icon={<RiLockPasswordFill />}
        />
        <Button active>Log in</Button>
      </Form>
      <h4>——— or ———</h4>
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

export default LoginForm;
