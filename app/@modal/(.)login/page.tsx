"use client";

import LoginForm from "@/components/Authentication/LoginForm/LoginForm";
import Modal from "@/components/Modal/Modal";
import Button from "@/components/UI/Button";
import { AnimatePresence } from "framer-motion";
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
      {/* Using onExitComplete here is necessary to keep modal exit animation working */}
      <AnimatePresence mode="wait" onExitComplete={() => router.back()}>
        {showModal && (
          <Modal key="modal" theme="light">
            <div className="margin-left-auto">
              <Button onClick={() => closeModal()}>X</Button>
            </div>
            <LoginForm />
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
}
