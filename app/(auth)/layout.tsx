"use client";
import AuthPageNavMenu from "@/features/auth/components/AuthPageNavMenu";
import AuthPagesLayout from "@/features/auth/components/AuthPagesLayout";
import { usePathname } from "next/navigation";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <AuthPagesLayout>
      <h1>Welcome to Gifinity</h1>
      {pathname.startsWith("/login") && pathname.startsWith("/signup") && (
        <AuthPageNavMenu variant="light" />
      )}
      {children}
    </AuthPagesLayout>
  );
}
