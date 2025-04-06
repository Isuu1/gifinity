import Header from "@/components/Header/Header";
import LayoutBackground from "@/features/upload/components/LayoutBackground";
import AppProviders from "@/providers/AppProviders";

export default function UploadLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppProviders>
      <LayoutBackground />
      <div className="main-layout">
        <Header />
        {children}
      </div>
    </AppProviders>
  );
}
