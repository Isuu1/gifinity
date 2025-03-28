import CategoriesMenu from "@/features/categories/components/CategoriesMenu";
import PageHeadline from "@/components/PageHeadline/PageHeadline";

export default function Categories({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="page">
      <PageHeadline title="Categories" imageUrl="/images/trending4.svg" />
      <CategoriesMenu />
      {children}
    </div>
  );
}
