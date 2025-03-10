"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

//Components
import Modal from "@/components/Modal/Modal";
import Button from "@/components/UI/Button";
import SignupForm from "@/components/Authentication/SignupForm/SignupForm";

//Animations
import { AnimatePresence } from "framer-motion";

export default function InterceptedSignup() {
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
            <SignupForm />
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
}
