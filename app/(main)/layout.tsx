import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import { AuthProvider } from "@/context/AuthContext";
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
          <Header />
          {children}
          <Footer />
        </AuthProvider>
      </StorageProvider>
    </div>
  );
}
