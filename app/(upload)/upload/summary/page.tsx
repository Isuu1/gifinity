"use client";

import { useUpload } from "@/providers/UploadProvider";
import { useRouter } from "next/navigation";

//If this page was accessed directly (after hard refresh), redirect to upload page
export default function Page() {
  const { file } = useUpload();

  const router = useRouter();

  if (!file && typeof window !== "undefined") {
    // window.location.href = "/upload";
    router.push("/upload");
    return null;
  }
  return null;
}
