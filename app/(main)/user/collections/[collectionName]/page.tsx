import { Suspense } from "react";

//Components
import Loading from "@/components/Loading/Loading";
import CollectionItemsGrid from "@/features/collections/components/CollectionItemsGrid";

interface PageProps {
  params: Promise<{ collectionName: string }>;
}

export default async function Page({ params }: PageProps) {
  const { collectionName } = await params;
  console.log(collectionName);
  return (
    <div>
      <Suspense fallback={<Loading />}>
        <CollectionItemsGrid collectionName={collectionName} />
      </Suspense>
    </div>
  );
}
