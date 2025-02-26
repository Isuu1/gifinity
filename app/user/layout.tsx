import Image from "next/image";

export default function Page({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="page">
      <div
        style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: 20 }}
      >
        <div>
          <Image
            src="/images/avatar.svg"
            width={100}
            height={100}
            alt="avatar"
            priority
          />
          <h1>User menu</h1>
        </div>
        {children}
      </div>
    </div>
  );
}
