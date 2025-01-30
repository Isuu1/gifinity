"use client";

import React, { useContext, useEffect, useState } from "react";
import { createContext } from "react";

interface StorageContextType {
  userGifs: string[];
  addItem: (item: string) => void;
}

export const StorageContext = createContext<StorageContextType | null>(null);

export const StorageProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [userGifs, setUserGifs] = useState<string[]>(() => {
    if (typeof window !== "undefined") {
      const localData = localStorage.getItem("userGifs");
      return localData ? JSON.parse(localData) : [];
    }
  });

  console.log(userGifs);

  useEffect(() => {
    localStorage.setItem("userGifs", JSON.stringify(userGifs));
  }, [userGifs]);

  const addItem = (item: string) => {
    if (userGifs.some((gif) => gif === item)) {
      alert("Gif already saved");
      return;
    }
    setUserGifs([...userGifs, item]);
  };

  return (
    <StorageContext.Provider value={{ userGifs, addItem }}>
      {children}
    </StorageContext.Provider>
  );
};

export const useStorage = () => {
  const context = useContext(StorageContext);
  if (!context) {
    throw new Error("useStorage must be used within a StorageProvider");
  }
  return context;
};
