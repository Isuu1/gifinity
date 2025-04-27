import type { Metadata } from "next";
import { Neucha } from "next/font/google";
import { Toaster } from "react-hot-toast";

//Styles
import "@/shared/styles/globals.scss";
import AppProviders from "@/providers/AppProviders";
import { siteMetadata } from "@/shared/config/metadata.config";

const neucha = Neucha({
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = siteMetadata;

export default async function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${neucha.className}`} id="modal-root">
        <AppProviders>
          <Toaster />
          {children}
          {modal}
        </AppProviders>
      </body>
    </html>
  );
}
