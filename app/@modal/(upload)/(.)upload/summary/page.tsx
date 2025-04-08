"use client";
import Modal from "@/components/UI/Modal";
import UploadSummary from "@/features/upload/components/UploadSummary";
import { useUpload } from "@/providers/UploadProvider";
import { AnimatePresence } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const { file } = useUpload();

  const [showModal, setShowModal] = useState<boolean>(true);

  const pathname = usePathname();

  const router = useRouter();

  console.log("file in upload summary", file);

  const closeModal = () => {
    setShowModal(false);
  };
  console.log("showModal", showModal);
  useEffect(() => {
    if (pathname === "/upload/summary") {
      setShowModal(true);
    } else {
      setShowModal(false);
    }
  }, [pathname]);

  return (
    <AnimatePresence onExitComplete={() => router.back()}>
      {showModal && (
        <Modal theme="dark">
          <UploadSummary file={file} closeSummary={closeModal} />
        </Modal>
      )}
    </AnimatePresence>
  );
}
