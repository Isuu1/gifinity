import { toastStyle } from "@/shared/styles/toast";
import toast from "react-hot-toast";

export function copyToClipboard(text: string) {
  navigator.clipboard.writeText(text);
  toast.success("Copied to clipboard", toastStyle);
}
