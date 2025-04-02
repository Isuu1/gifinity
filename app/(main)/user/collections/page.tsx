import PageHeadline from "@/components/PageHeadline/PageHeadline";
import CollectionsGrid from "@/features/collections/components/CollectionsGrid";

export default function Page() {
  return (
    <div>
      <PageHeadline title="Collections" imageUrl="/images/collection.svg" />
      <CollectionsGrid />
    </div>
  );
}
