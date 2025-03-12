import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import { StorageProvider } from "@/context/StorageContext";
import { createClient } from "@/utils/supabase/server";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  const { data } = await supabase.auth.getUser();
  return (
    <div>
      <StorageProvider>
        <Header user={data.user} />
        {children}
        <Footer />
      </StorageProvider>
    </div>
  );
}
