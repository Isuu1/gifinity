"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

//Styles
import styles from "./Search.module.scss";

//Components
import Button from "../../../components/UI/Button";
import Autocomplete from "./Autocomplete";

//Icons
import { FaSearch } from "react-icons/fa";

//Animations
import { AnimatePresence } from "framer-motion";

const Search: React.FC = () => {
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState<string | null>(null);

  const [showAutocomplete, setShowAutocomplete] = useState(false);

  const handleSearch = () => {
    if (!searchQuery) return;
    setShowAutocomplete(false);
    router.push(`/search?q=${searchQuery}`);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setShowAutocomplete(true);
  };

  const clearInput = () => {
    setSearchQuery(null);
    setShowAutocomplete(false);
  };

  return (
    <div className={styles.searchContainer}>
      <input
        className={styles.inputField}
        onChange={handleChange}
        value={searchQuery || ""}
        placeholder="🚀 Explore endless GIFs & stickers!"
        maxLength={40}
      />

      <AnimatePresence>
        {showAutocomplete && (
          <Autocomplete
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            setShowAutocomplete={setShowAutocomplete}
          />
        )}
      </AnimatePresence>

      <div className={styles.buttons}>
        {searchQuery && (
          <Button className={styles.clearButton} onClick={clearInput}>
            X
          </Button>
        )}
        <Button
          className={styles.searchButton}
          onClick={handleSearch}
          icon={<FaSearch />}
          variant="light"
        >
          Search
        </Button>
      </div>
    </div>
  );
};

export default Search;
