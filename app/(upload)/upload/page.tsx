import Header from "@/shared/components/Header/Header";
import LayoutBackground from "@/features/upload/components/LayoutBackground";
import Upload from "@/features/upload/components/Upload";

export default async function Page() {
  return (
    <>
      <LayoutBackground />
      <div className="main-layout">
        <Header />
        <div className="page">
          <Upload />
        </div>
      </div>
    </>
  );
}
