import PageHeadline from "@/shared/components/PageHeadline/PageHeadline";
import UploadsGrid from "@/features/upload/components/UploadsGrid";

export default function Page() {
  return (
    <div>
      <PageHeadline title="Uploads" imageUrl="/images/upload.svg" />
      <UploadsGrid />
    </div>
  );
}
