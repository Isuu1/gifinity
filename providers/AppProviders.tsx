import React from "react";
import { AuthProvider } from "./AuthProvider";
import { StorageProvider } from "./StorageProvider";
import { CollectionsProvider } from "./CollectionsProvider";
import { UploadProvider } from "./UploadProvider";

const AppProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <StorageProvider>
      <AuthProvider>
        <UploadProvider>
          <CollectionsProvider>{children}</CollectionsProvider>
        </UploadProvider>
      </AuthProvider>
    </StorageProvider>
  );
};

export default AppProviders;
