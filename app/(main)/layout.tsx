import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import StickyHeader from "@/components/StickyHeader/StickyHeader";

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
