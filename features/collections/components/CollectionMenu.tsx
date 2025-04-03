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
import { useCollections } from "@/providers/CollectionsProvider";
//Components
import ConfirmAction from "@/components/ConfirmAction/ConfirmAction";
import EditCollectionNameForm from "./EditCollectionNameForm";
import { usePathname } from "next/navigation";
import { toastStyle } from "@/styles/toast";
import toast from "react-hot-toast";

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
  variant: "collectionsGrid" | "collectionItemsGrid";
}

const CollectionMenu: React.FC<CollectionProps> = ({ collection, variant }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const [deletePromptOpen, setDeletePromptOpen] = useState<boolean>(false);

  const [editPromptOpen, setEditPromptOpen] = useState<boolean>(false);

  const [error, setError] = useState<string | null>(null);

  const { fetchCollections } = useCollections();

  const menuRef = useRef<HTMLDivElement>(null);

  const pathname = usePathname();

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
    try {
      const result = await deleteCollection(collection);

      console.log("result", result);

      if (result.error) {
        setError(result.error);
        return;
      }

      if (result.success) {
        toast.success("Collection deleted successfully", toastStyle);
      }
      fetchCollections();
      //If user deletes the collection while viewing it, redirect to collections page
      if (pathname === `/user/collections/${collection.id}`) {
        window.location.href = "/user/collections";
      }
    } catch (error) {
      setError(error as string);
    }
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
            errorMessage={error}
          />
        )}
      </AnimatePresence>
      <div
        className={`${styles.collectionMenuContainer} ${styles[variant]}`}
        ref={menuRef}
      >
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
                onClick={() => {
                  setDeletePromptOpen(true);
                  setError(null);
                }}
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
