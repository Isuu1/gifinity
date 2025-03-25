import NavMenu from "@/components/User/NavMenu/NavMenu";
import UserPageLayout from "@/layouts/UserPageLayout";
//import Image from "next/image";

export default function Page({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="page">
      <UserPageLayout>
        <NavMenu />
        {children}
      </UserPageLayout>
    </div>
  );
}
