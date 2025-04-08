import Header from "@/components/Header/Header";
import LayoutBackground from "@/features/upload/components/LayoutBackground";

export default function UploadLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <LayoutBackground />
      <div className="main-layout">
        <Header />
        {children}
      </div>
    </>
  );
}
