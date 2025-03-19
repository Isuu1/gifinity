import NavMenu from "@/components/UserProfile/NavMenu/NavMenu";
import UserPageLayout from "@/layouts/UserPageLayout";
//import Image from "next/image";

export default function Page({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="page">
      <UserPageLayout>
        <div>
          {/* <div>
            <Image
              src="/images/avatar.svg"
              width={100}
              height={100}
              alt="avatar"
              priority
            />
          </div> */}
          <NavMenu />
        </div>
        {children}
      </UserPageLayout>
    </div>
  );
}
