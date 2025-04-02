import React, { useEffect, useRef, useState } from "react";

//Icons
import { HiMenuAlt3 } from "react-icons/hi";
import { MdEditDocument } from "react-icons/md";
import { RiDeleteBin7Fill } from "react-icons/ri";
//Styles
import styles from "./CollectionMenu.module.scss";
//Animations
import { AnimatePresence, motion } from "framer-motion";
//Types
import { Collection } from "@/features/collections/types/collection";
//Actions
import { deleteCollection } from "@/features/collections/lib/actions/deleteCollection";
//Hooks
import { useCollections } from "@/context/CollectionsProvider";
//Components
import ConfirmAction from "@/components/ConfirmAction/ConfirmAction";
import EditCollectionNameForm from "./EditCollectionNameForm";

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

interface CollectionProps {
  collection: Collection;
}

const CollectionMenu: React.FC<CollectionProps> = ({ collection }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const [deletePromptOpen, setDeletePromptOpen] = useState<boolean>(false);

  const [editPromptOpen, setEditPromptOpen] = useState<boolean>(false);

  const { fetchCollections } = useCollections();

  const menuRef = useRef<HTMLDivElement>(null);

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

  const handleDeleteCollection = async (collection: Collection) => {
    const result = await deleteCollection(collection);
    console.log("result", result);
    fetchCollections();
  };

  return (
    <>
      <AnimatePresence>
        {editPromptOpen && (
          <EditCollectionNameForm
            closeForm={() => setEditPromptOpen(false)}
            collection={collection}
          />
        )}
        {deletePromptOpen && (
          <ConfirmAction
            onConfirm={() => handleDeleteCollection(collection)}
            onCancel={() => setDeletePromptOpen(false)}
            message={`Delete collection ${collection.name}?`}
          />
        )}
      </AnimatePresence>
      <div className={styles.collectionMenuContainer} ref={menuRef}>
        <HiMenuAlt3
          className={styles.icon}
          onClick={() => setMenuOpen(!menuOpen)}
        />
        <AnimatePresence>
          {menuOpen && (
            <motion.ul
              className={styles.menu}
              variants={menuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <li
                className={styles.item}
                onClick={() => setEditPromptOpen(true)}
              >
                <MdEditDocument />
                Rename
              </li>
              <li
                className={styles.item}
                onClick={() => setDeletePromptOpen(true)}
              >
                <RiDeleteBin7Fill />
                Delete
              </li>
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default CollectionMenu;
