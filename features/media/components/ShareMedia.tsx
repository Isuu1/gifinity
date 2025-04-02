import React from "react";

//Social share
import {
  FacebookShareButton,
  FacebookMessengerShareButton,
  TwitterShareButton,
} from "react-share";

//Icons
import { FaFacebook } from "react-icons/fa6";
import { FaFacebookMessenger } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaCopy } from "react-icons/fa";

//Styles
import styles from "./ShareMedia.module.scss";

//Utils
import { copyToClipboard } from "@/utils/utils";

//Animations
import { motion } from "motion/react";
import { useCollections } from "@/context/CollectionsProvider";

const shareMediaAnimation = {
  hidden: {
    opacity: 0,
    y: 100,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.2,
    },
  },
  exit: {
    opacity: 0,
    y: 100,
    transition: {
      duration: 0.2,
    },
  },
};

const ShareMedia: React.FC = () => {
  const { media } = useCollections();

  const url = media ? media.images.original.url : "";

  return (
    <motion.div
      className={styles.shareContainer}
      variants={shareMediaAnimation}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <FacebookShareButton url={url}>
        <FaFacebook className={`${styles.shareButton} ${styles.fbIcon}`} />
      </FacebookShareButton>
      <FacebookMessengerShareButton appId="9465764380166645" url={url}>
        <FaFacebookMessenger
          className={`${styles.shareButton} ${styles.messengerIcon}`}
        />
      </FacebookMessengerShareButton>
      <TwitterShareButton url={url}>
        <FaSquareXTwitter className={`${styles.shareButton} ${styles.xIcon}`} />
      </TwitterShareButton>
      <FaCopy
        className={`${styles.shareButton} ${styles.copyIcon}`}
        onClick={() => copyToClipboard(url)}
      />
    </motion.div>
  );
};

export default ShareMedia;
