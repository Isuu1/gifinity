import React, { useEffect, useState } from "react";
import { useActionState } from "react";

//Components
import Button from "@/components/UI/Button";
import Form from "@/components/UI/Form";
import Input from "@/components/UI/Input";
import SignupSuccess from "../SignupSuccess/SignupSuccess";
import Error from "../Error/Error";

//Icons
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { FcGoogle } from "react-icons/fc";
import { ImFacebook2 } from "react-icons/im";

//Styles
import styles from "./SignupForm.module.scss";

//Utils
import { signup } from "@/actions/auth";
import { normalizeErrors } from "@/utils/authHelpers";

const SignupForm: React.FC = () => {
  const initialState = {
    error: null,
    success: "",
    data: { email: "", password: "", confirmPassword: "" },
  };

  const [error, setError] = useState<string[]>([]);

  const [state, formAction, isPending] = useActionState(signup, initialState);

  //Set error message whenever form state returns one
  useEffect(() => {
    if (state.error) {
      const normalizedErrors = normalizeErrors(state.error);
      setError(normalizedErrors);
    }
  }, [state.resetKey, state.error]);

  // Function to clear the error when user focuses on an input
  const handleFocus = () => {
    setError([]);
  };

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
              onFocus={handleFocus}
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
              onFocus={handleFocus}
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
              onFocus={handleFocus}
            />

            {error.length > 0 && <Error key="error" error={error} />}

            <Button active disabled={isPending}>
              {isPending ? "Creating account..." : "Sign up"}
            </Button>
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
