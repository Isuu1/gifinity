/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";

import React, { useEffect, useRef, useState } from "react";
// @ts-expect-error
import WAVES from "vanta/dist/vanta.waves.min";
// @ts-expect-error
import * as THREE from "three";

//Styles
import styles from "./AuthPagesLayout.module.scss";

const AuthPagesLayout = ({ children }: { children: React.ReactNode }) => {
  const [vantaEffect, setVantaEffect] = useState(null);
  const authBackgroundRef = useRef(null);
  useEffect(() => {
    if (typeof window !== "undefined" && !vantaEffect) {
      setVantaEffect(
        WAVES({
          THREE: THREE,
          el: authBackgroundRef.current,
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
    <div className={styles.authPageLayout}>
      <div className={styles.formWrapper}>
        <h1>Gifinity</h1>
        <div className={styles.form}>{children}</div>
      </div>
      <div className={styles.authBackground} ref={authBackgroundRef}></div>
    </div>
  );
};

export default AuthPagesLayout;
