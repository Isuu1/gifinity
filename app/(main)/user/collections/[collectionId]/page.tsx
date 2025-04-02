import { Suspense } from "react";

//Components
import Loading from "@/components/Loading/Loading";
import CollectionItemsGrid from "@/features/collections/components/CollectionItemsGrid";

interface PageProps {
  params: {
    collectionId: string;
  };
}

export default async function Page({ params }: PageProps) {
  const { collectionId } = await params;

  return (
    <div>
      <Suspense fallback={<Loading />}>
        <CollectionItemsGrid collectionId={collectionId} />
      </Suspense>
    </div>
  );
}
