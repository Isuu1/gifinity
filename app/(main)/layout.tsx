import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import StickyHeader from "@/components/StickyHeader/StickyHeader";
import { AuthProvider } from "@/context/AuthContext";
import { CollectionsProvider } from "@/context/CollectionsProvider";
import { StorageProvider } from "@/context/StorageContext";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="main-layout">
      <StorageProvider>
        <AuthProvider>
          <CollectionsProvider>
            <Header />
            <StickyHeader />
            {children}
            <Footer />
          </CollectionsProvider>
        </AuthProvider>
      </StorageProvider>
    </div>
  );
}
