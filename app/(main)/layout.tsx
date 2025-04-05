import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import StickyHeader from "@/components/StickyHeader/StickyHeader";
import AppProviders from "@/providers/AppProviders";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="main-layout">
      {/* <StorageProvider>
        <AuthProvider>
          <CollectionsProvider> */}
      <AppProviders>
        <Header />
        <StickyHeader />
        {children}
        <Footer />
      </AppProviders>
      {/* </CollectionsProvider>
        </AuthProvider>
      </StorageProvider> */}
    </div>
  );
}
