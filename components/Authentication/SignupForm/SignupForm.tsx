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
import styles from "./SignupForm.module.scss";

//Utils
import { login } from "@/app/login/actions";

const LoginForm: React.FC = () => {
  return (
    <div className={styles.signupFormContainer}>
      <h2>Signup to Gifinity</h2>
      <h4>
        Create account to access your favorites, sync across devices, and more!
      </h4>
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
        <Input
          type="password"
          id="confirmPassword"
          label="confirmPassword"
          required
          theme="white"
          labelHidden
          placeholder="Confirm password"
          icon={<RiLockPasswordFill />}
        />
        <Button active>Sign up</Button>
      </Form>
      <h4>——— or ———</h4>
      <Button
        className={styles.signupWithGoogleButton}
        icon={<FcGoogle />}
        iconPosition="right"
      >
        Sign up with Google
      </Button>
      <Button
        className={styles.signupWithFacebookButton}
        icon={<ImFacebook2 />}
        iconPosition="right"
      >
        Sign up with Facebook
      </Button>
    </div>
  );
};

export default LoginForm;
