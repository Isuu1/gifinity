import { login } from "@/app/login/actions";
import Button from "@/components/UI/Button";
import Form from "@/components/UI/Form";
import Input from "@/components/UI/Input";
import React from "react";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";

const LoginForm: React.FC = () => {
  return (
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
  );
};

export default LoginForm;
