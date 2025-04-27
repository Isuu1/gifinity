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
//Components
import Modal from "@/shared/components/UI/Modal";
import Button from "@/shared/components/UI/Button";
//Interfaces
import { Gif } from "@/shared/interfaces/gifs";
import { Sticker } from "@/shared/interfaces/stickers";

interface ShareMediaProps {
  media: Gif | Sticker;
  closeModal: () => void;
}

const ShareMedia: React.FC<ShareMediaProps> = ({ media, closeModal }) => {
  const url = media ? media.images.original.url : "";

  return (
    <Modal theme="dark" onClose={closeModal}>
      <div className={styles.shareContainer}>
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
        <Button onClick={closeModal} variant="light">
          Dismiss
        </Button>
      </div>
    </Modal>
  );
};

export default ShareMedia;
