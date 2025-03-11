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
          <div>
            <Image
              src="/images/avatar.svg"
              width={100}
              height={100}
              alt="avatar"
              priority
            />
          </div>
          <ul>
            <li style={{ background: "#ff204e" }}>Profile</li>
            <li>Favourites</li>
            <li>Log in</li>
            <li>Sign up</li>
          </ul>
        </div>
        {children}
      </div>
    </div>
  );
}
