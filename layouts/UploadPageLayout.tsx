/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";
import React, { useEffect, useRef, useState } from "react";
// @ts-expect-error
import WAVES from "vanta/dist/vanta.waves.min";
// @ts-expect-error
import * as THREE from "three";
//Styles
import styles from "./UploadPageLayout.module.scss";
import Header from "@/components/Header/Header";

export default function UploadPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [vantaEffect, setVantaEffect] = useState(null);
  const uploadBackgroundRef = useRef(null);
  useEffect(() => {
    if (typeof window !== "undefined" && !vantaEffect) {
      setVantaEffect(
        WAVES({
          THREE: THREE,
          el: uploadBackgroundRef.current,
          color: 0x870922,
        })
      );
    }
    return () => {
      // @ts-expect-error
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  return (
    <div className={styles.uploadPageLayout} ref={uploadBackgroundRef}>
      <div className={styles.wrapper}>
        <Header />
        <div className={styles.container}>{children}</div>
      </div>
    </div>
  );
}
