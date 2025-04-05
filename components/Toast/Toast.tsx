import React from "react";
import toast from "react-hot-toast";

interface ToastProps {
  message: string;
  duration?: number;
  variant: "success" | "error" | "info";
}

const Toast: React.FC<ToastProps> = ({ message, variant }) => {
  return (
    <div>
      {variant === "success" && toast.success({ message })}
      {variant === "error" && toast.error({ message })}
    </div>
  );
};

export default Toast;
