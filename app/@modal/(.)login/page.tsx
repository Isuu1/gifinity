"use client";

import Modal from "@/components/Modal/Modal";
import Button from "@/components/UI/Button";
import { AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function InterceptedLogin() {
  const [showModal, setShowModal] = useState<boolean>(true);

  const router = useRouter();

  const closeModal = () => {
    setShowModal(false);
  };
  return (
    <div>
      <AnimatePresence mode="wait" onExitComplete={() => router.back()}>
        {showModal && (
          <Modal key="modal">
            <Button onClick={() => closeModal()}>X</Button>
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
}
