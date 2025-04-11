"use client";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

//Components
import Modal from "@/components/UI/Modal";
import Button from "@/components/UI/Button";

//Animations
import { AnimatePresence } from "framer-motion";
import AuthModalNavMenu from "@/features/auth/components/AuthModalNavMenu";

export default function ModalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showModal, setShowModal] = useState<boolean>(true);

  const router = useRouter();

  const pathname = usePathname();

  // const closeModal = () => {
  //   setShowModal(false);
  // };

  //Always show modal on login and signup pages
  //This is necessary to put back modal state to true after closing it
  useEffect(() => {
    if (pathname.startsWith("/login") || pathname.startsWith("/signup")) {
      setShowModal(true);
    } else {
      setShowModal(false);
    }
  }, [pathname]);

  return (
    <div>
      {/* Using onExitComplete here is necessary to keep modal exit animation working */}
      <AnimatePresence mode="wait" onExitComplete={() => router.back()}>
        {showModal && (
          <Modal key="modal" theme="light" onClose={() => setShowModal(false)}>
            {/* <div className="margin-left-auto">
              <Button onClick={closeModal}>X</Button>
            </div> */}
            {!pathname.startsWith("/signup/success") && (
              <AuthModalNavMenu variant="dark" />
            )}
            {children}
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
}
