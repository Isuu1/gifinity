import React from "react";
import { AuthProvider } from "./AuthProvider";
import { StorageProvider } from "./StorageProvider";
import { CollectionsProvider } from "./CollectionsProvider";

const AppProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <StorageProvider>
      <AuthProvider>
        <CollectionsProvider>{children}</CollectionsProvider>
      </AuthProvider>
    </StorageProvider>
  );
};

export default AppProviders;
