"use client";
import ModalNavMenu from "@/components/Authentication/ModalNavMenu/ModalNavMenu";
import AuthPagesLayout from "@/layouts/AuthPagesLayout";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthPagesLayout>
      <ModalNavMenu variant="dark" />
      {children}
    </AuthPagesLayout>
  );
}
