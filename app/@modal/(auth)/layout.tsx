"use client";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

//Components
import Modal from "@/shared/components/UI/Modal";
import AuthModalNavMenu from "@/features/auth/components/AuthModalNavMenu";
//Animations
import { AnimatePresence } from "motion/react";

export default function ModalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showModal, setShowModal] = useState<boolean>(true);

  const router = useRouter();

  const pathname = usePathname();

  console.log("pathname", pathname);

  //Always show modal on login and signup pages
  //This is necessary to put back modal state to true after closing it
  useEffect(() => {
    if (
      pathname.startsWith("/login") ||
      pathname.startsWith("/signup") ||
      pathname.startsWith("/forgot-password")
    ) {
      setShowModal(true);
    } else {
      setShowModal(false);
    }
  }, [pathname]);

  return (
    <div>
      {/* Using onExitComplete here is necessary to keep modal exit animation working */}
      <AnimatePresence mode="wait" onExitComplete={() => router.push("/")}>
        {showModal && (
          <Modal key="modal" theme="light" onClose={() => setShowModal(false)}>
            {(pathname.startsWith("/login") ||
              pathname.startsWith("/signup")) && (
              <AuthModalNavMenu variant="dark" />
            )}
            {children}
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
}
