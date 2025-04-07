"use client";

import UploadSummary from "@/features/upload/components/UploadSummary";
import { useUpload } from "@/providers/UploadProvider";
import { useRouter } from "next/navigation";

export default function Page() {
  const { file } = useUpload();
  const router = useRouter();
  if (!file) {
    // Redirect to upload page if no file is selected

    router.push("/upload");
  }
  //   const router = useRouter();
  //   const file = false;
  //   if (!file) {
  //     setTimeout(() => {
  //       router.push("/upload");
  //     }, 3000);
  //   }
  return <UploadSummary file={file} />;
}
