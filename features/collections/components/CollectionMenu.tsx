import React, { useEffect, useRef, useState } from "react";

//Icons
import { HiMenuAlt3 } from "react-icons/hi";
import { MdEditDocument } from "react-icons/md";
import { RiDeleteBin7Fill } from "react-icons/ri";

//Styles
import styles from "./CollectionMenu.module.scss";
//Animations
import { AnimatePresence, motion } from "framer-motion";

const menuVariants = {
  hidden: {
    opacity: 0,
    scale: 0,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.2,
      ease: "easeInOut",
    },
  },
  exit: {
    opacity: 0,
    scale: 0,
  },
};

const CollectionMenu: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const menuRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    // Attach the event listener to the document
    document.addEventListener("mousedown", handleClickOutside);
    // Cleanup function to remove the event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  return (
    <div className={styles.collectionMenuContainer}>
      <HiMenuAlt3
        className={styles.icon}
        onClick={() => setMenuOpen(!menuOpen)}
      />
      <AnimatePresence>
        {menuOpen && (
          <motion.ul
            ref={menuRef}
            className={styles.menu}
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <li className={styles.item}>
              <MdEditDocument />
              Rename
            </li>
            <li className={styles.item}>
              <RiDeleteBin7Fill />
              Delete
            </li>
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CollectionMenu;
