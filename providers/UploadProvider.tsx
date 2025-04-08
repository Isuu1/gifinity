"use client";

import React, { createContext, useContext, useState } from "react";

interface UploadContextType {
  file: File | null;
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
}

export const UploadContext = createContext<UploadContextType | null>(null);

export const UploadProvider = ({ children }: { children: React.ReactNode }) => {
  const [file, setFile] = useState<File | null>(null);

  return (
    <UploadContext.Provider value={{ file, setFile }}>
      {children}
    </UploadContext.Provider>
  );
};

export const useUpload = () => {
  const context = useContext(UploadContext);
  if (!context) {
    throw new Error("useUpload must be used within an UploadProvider");
  }
  return context;
};
