import React from "react";
import { useActionState } from "react";

//Components
import Button from "@/components/UI/Button";
import Form from "@/components/UI/Form";
import Input from "@/components/UI/Input";
import SignupSuccess from "../SignupSuccess/SignupSuccess";

//Icons
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { FcGoogle } from "react-icons/fc";
import { ImFacebook2 } from "react-icons/im";

//Styles
import styles from "./SignupForm.module.scss";

//Utils
import { signup } from "@/actions/auth";

const SignupForm: React.FC = () => {
  const initialState = {
    error: null,
    success: "",
    data: { email: "", password: "", confirmPassword: "" },
  };

  const [state, formAction, isPending] = useActionState(signup, initialState);

  return (
    <div className={styles.signupFormContainer}>
      <h2>Signup to Gifinity</h2>

      {state.success ? (
        <SignupSuccess
          email={state.data.email}
          successMessage={state.success}
        />
      ) : (
        <>
          <h4>
            Create account to access your favorites, sync across devices, and
            more!
          </h4>
          <Form action={formAction}>
            <Input
              type="email"
              id="email"
              label="Email"
              required
              theme="white"
              labelHidden
              placeholder="Email"
              icon={<MdEmail />}
              defaultValue={state.data?.email}
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
            {typeof state.error === "string" && (
              <p className={styles.errorMessage}>{state.error}</p>
            )}

            {state.error &&
              typeof state.error === "object" &&
              Object.entries(state.error).map(([key, value]) => {
                const errorsArray = Array.isArray(value)
                  ? value
                  : value._errors;

                return errorsArray.map((error, index) => (
                  <p key={`${key}-${index}`} className={styles.errorMessage}>
                    {error}
                  </p>
                ));
              })}
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
        </>
      )}
    </div>
  );
};

export default SignupForm;
