"use client";
import AuthPageNavMenu from "@/features/auth/components/AuthPageNavMenu";
import AuthPagesLayout from "@/features/auth/components/AuthPagesLayout";

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
