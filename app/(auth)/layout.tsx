"use client";
import AuthPageNavMenu from "@/components/Authentication/AuthPageNavMenu/AuthPageNavMenu";
import AuthPagesLayout from "@/layouts/AuthPagesLayout";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthPagesLayout>
      <h1>Welcome to Gifinity</h1>
      <AuthPageNavMenu variant="light" />
      {children}
    </AuthPagesLayout>
  );
}
