"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

//Styles
import styles from "./Search.module.scss";

//Components
import Button from "../UI/Button";

//Icons
import { FaSearch } from "react-icons/fa";

const Search: React.FC = () => {
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState<string | null>(null);

  const handleSearch = () => {
    if (!searchQuery) return;
    router.push(`/search?q=${searchQuery}`);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const clearInput = () => {
    setSearchQuery("");
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
