//Components
import CollectionItemsGrid from "@/features/collections/components/CollectionItemsGrid";

interface PageProps {
  params: Promise<{ collectionName: string }>;
}

export default async function Page({ params }: PageProps) {
  const { collectionName } = await params;

  return (
    <div>
      <CollectionItemsGrid collectionName={collectionName} />
    </div>
  );
}
