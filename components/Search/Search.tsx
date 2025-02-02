"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

//Styles
import styles from "./Search.module.scss";
import Button from "../UI/Button";

//Icons
import { FaSearch } from "react-icons/fa";

const Search: React.FC = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
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
        value={searchQuery}
      />
      <div className={styles.buttons}>
        {searchQuery.length > 0 && <Button onClick={clearInput}>x</Button>}
        <Button onClick={handleSearch} icon={<FaSearch />}>
          Search
        </Button>
      </div>
    </div>
  );
};

export default Search;
