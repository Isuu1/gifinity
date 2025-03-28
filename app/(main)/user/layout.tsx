import UserNavMenu from "@/features/user/components/UserNavMenu";
import UserPageLayout from "@/layouts/UserPageLayout";
//import Image from "next/image";

export default function Page({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="page">
      <UserPageLayout>
        <UserNavMenu />
        {children}
      </UserPageLayout>
    </div>
  );
}
