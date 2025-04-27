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
import { RiTwitterXLine } from "react-icons/ri";

import { FaCopy } from "react-icons/fa";

//Styles
import styles from "./ShareMedia.module.scss";

//Utils
import { copyToClipboard } from "@/utils/utils";

//Animations
import { motion } from "motion/react";
import { useCollections } from "@/providers/CollectionsProvider";
import Modal from "@/shared/components/UI/Modal";
import Button from "@/shared/components/UI/Button";

const shareMediaAnimation = {
  hidden: {
    opacity: 0,
    scale: 0,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.2,
    },
  },
  exit: {
    opacity: 0,
    scale: 0,
    transition: {
      duration: 0.2,
    },
  },
};

interface ShareMediaProps {
  setShowShareContainer: React.Dispatch<React.SetStateAction<boolean>>;
}

const ShareMedia: React.FC<ShareMediaProps> = ({ setShowShareContainer }) => {
  const { media } = useCollections();

  const url = media ? media.images.original.url : "";

  return (
    <Modal theme="dark" onClose={() => setShowShareContainer(false)}>
      <motion.div
        className={styles.shareContainer}
        variants={shareMediaAnimation}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <h2>Share media</h2>
        <div className={styles.buttons}>
          <FacebookShareButton url={url}>
            <FaFacebook className={`${styles.shareButton} ${styles.fbIcon}`} />
          </FacebookShareButton>
          <FacebookMessengerShareButton appId="9465764380166645" url={url}>
            <FaFacebookMessenger
              className={`${styles.shareButton} ${styles.messengerIcon}`}
            />
          </FacebookMessengerShareButton>
          <TwitterShareButton url={url}>
            <RiTwitterXLine
              className={`${styles.shareButton} ${styles.xIcon}`}
            />
          </TwitterShareButton>
          <FaCopy
            className={`${styles.shareButton} ${styles.copyIcon}`}
            onClick={() => copyToClipboard(url)}
          />
        </div>
        <Button onClick={() => setShowShareContainer(false)} variant="light">
          Dismiss
        </Button>
      </motion.div>
    </Modal>
  );
};

export default ShareMedia;
