"use client";

import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const file = false;
  if (!file) {
    setTimeout(() => {
      router.push("/upload");
    }, 3000);
  }
  return null;
}
