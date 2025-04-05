import React from "react";
import { AuthProvider } from "./AuthProvider";
import { StorageProvider } from "./StorageProvider";
import { CollectionsProvider } from "./CollectionsProvider";

const AppProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <StorageProvider>
        <AuthProvider>
          <CollectionsProvider>{children}</CollectionsProvider>
        </AuthProvider>
      </StorageProvider>
    </div>
  );
};

export default AppProviders;
