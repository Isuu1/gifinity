import React, { useEffect, useRef, useState } from "react";

//Animations
import { motion } from "framer-motion";

//Styles
import styles from "./Autocomplete.module.scss";
import { useRouter } from "next/navigation";

type AutocompleteSearch = {
  name: string;
};

interface IProps {
  setSearchQuery: (name: string) => void;
  searchQuery: string | null;
  setShowAutocomplete: (show: boolean) => void;
}

const autocompleteContainerVariants = {
  hidden: {
    opacity: 0,
    maxHeight: 0,
  },
  visible: {
    opacity: 1,
    maxHeight: 300, //Can be any value as long as it fits content
    transition: {
      duration: 0.2,
    },
  },
  exit: {
    opacity: 0,
    maxHeight: 0,
    transition: {
      duration: 0.2,
    },
  },
};

const Autocomplete: React.FC<IProps> = ({
  setSearchQuery,
  searchQuery,
  setShowAutocomplete,
}) => {
  const [autocompleteSearches, setAutocompleteSearches] = useState<
    AutocompleteSearch[] | null
  >(null);

  const containerRef = useRef<HTMLDivElement>(null);

  const router = useRouter();

  useEffect(() => {
    const fetchAutocompleteSearches = async () => {
      try {
        const response = await fetch(
          `/api/search/autocomplete?q=${searchQuery}`
        );
        const data = await response.json();
        setAutocompleteSearches(data.data);
      } catch (error) {
        console.error("Error fetching autocomplete searches", error);
      }
    };
    if (searchQuery) {
      fetchAutocompleteSearches();
    } else {
      setAutocompleteSearches(null);
    }
  }, [searchQuery]);

  useEffect(() => {
    //Close autocomplete when clicking outside
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setShowAutocomplete(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setShowAutocomplete]);

  const handleAutoCompleteClick = (search: string) => {
    setSearchQuery(search);
    setShowAutocomplete(false);
    router.push(`/search?q=${search}`);
  };

  if (!autocompleteSearches || autocompleteSearches.length === 0) return null;

  return (
    <motion.div
      className={styles.autocompleteContainer}
      ref={containerRef}
      variants={autocompleteContainerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {autocompleteSearches.map((search) => (
        <p
          key={search.name}
          className={styles.autocompleteItem}
          onClick={() => handleAutoCompleteClick(search.name)}
        >
          {search.name}
        </p>
      ))}
    </motion.div>
  );
};

export default Autocomplete;
