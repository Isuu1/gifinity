import AuthPagesLayout from "@/layouts/AuthPagesLayout";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthPagesLayout>{children}</AuthPagesLayout>;
}
