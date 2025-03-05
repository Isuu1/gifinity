import { login } from "@/app/login/actions";
import React from "react";

const LoginForm: React.FC = () => {
  return (
    <form>
      <label htmlFor="email">Email:</label>
      <input id="email" name="email" type="email" required />
      <label htmlFor="password">Password:</label>
      <input id="password" name="password" type="password" required />
      <button formAction={login}>Log in</button>
      {/* <button formAction={signup}>Sign up</button> */}
    </form>
  );
};

export default LoginForm;
