import UploadPageLayout from "@/layouts/UploadPageLayout";
import AppProviders from "@/providers/AppProviders";

export default function UploadLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppProviders>
      <UploadPageLayout>{children}</UploadPageLayout>
    </AppProviders>
  );
}
