import Link from "next/link";
import React from "react";

//Components
import Button from "@/shared/components/UI/Button";

//Styles
import styles from "./SignupSuccess.module.scss";

interface IProps {
  email: string;
}

const SignupSuccess: React.FC<IProps> = ({ email }) => {
  const getEmailProviderUrl = (email: string) => {
    const domain = email.split("@")[1];
    switch (domain) {
      case "gmail.com":
        return "https://mail.google.com/";
      case "yahoo.com":
        return "https://mail.yahoo.com/";
      case "outlook.com":
      case "hotmail.com":
      case "live.com":
        return "https://outlook.live.com/";
      default:
        return "mailto:${email}"; //If there is no match, return dafault provider
    }
  };

  return (
    <div className={styles.signupSuccessContainer}>
      <h3>Your account has been created!</h3>
      <h3>Please confirm your email before you can log in.</h3>
      {/* Extract domain from email and provide a button to open their email */}
      {email && (
        <Link href={getEmailProviderUrl(email)}>
          <Button variant="light">Open email</Button>
        </Link>
      )}
    </div>
  );
};

export default SignupSuccess;
