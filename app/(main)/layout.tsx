import Footer from "@/shared/components/Footer/Footer";
import Header from "@/shared/components/Header/Header";
import StickyHeader from "@/shared/components/StickyHeader/StickyHeader";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="main-layout">
      <Header />
      <StickyHeader />
      {children}
      <Footer />
    </div>
  );
}
