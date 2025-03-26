"use client";

import React, { useState } from "react";

//Animations
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import Link from "next/link";
import Image from "next/image";

//Styles
import styles from "./StickyHeader.module.scss";
import Search from "../Search/Search";
import { useAuth } from "@/context/AuthContext";
import UserModal from "../User/UserModal/UserModal";

//Icons
import { TiThMenu } from "react-icons/ti";
//import CategoriesMenu from "../CategoriesMenu/CategoriesMenu";
import Button from "../UI/Button";

const stickyHeaderAnimation = {
  initial: {
    y: -100,
    transition: {
      duration: 0.3,
    },
  },
  animate: {
    y: 0,
    transition: {
      duration: 0.3,
    },
  },
};

const StickyHeader = () => {
  const [isVisible, setIsVisible] = useState(false);

  const { user } = useAuth();

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  });

  return (
    <motion.header
      className={styles.stickyHeader}
      variants={stickyHeaderAnimation}
      initial="initial"
      animate={isVisible ? "animate" : "initial"}
    >
      <Link href="/">
        <Image src="/images/logo.png" alt="Gifinity" width={75} height={75} />
      </Link>
      <Search />
      {user ? <UserModal /> : null}
      <Button icon={<TiThMenu />}>Menu</Button>
    </motion.header>
  );
};

export default StickyHeader;
