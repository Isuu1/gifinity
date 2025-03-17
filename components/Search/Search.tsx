"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

//Styles
import styles from "./Search.module.scss";

//Components
import Button from "../UI/Button";

//Icons
import { FaSearch } from "react-icons/fa";

type AutocompleteSearch = {
  name: string;
};

const Search: React.FC = () => {
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState<string | null>(null);

  const [autocompleteSearches, setAutocompleteSearches] = useState<
    AutocompleteSearch[] | null
  >(null);

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
    setAutocompleteSearches(null);
    setShowAutocomplete(false);
  };

  const handleAutoCompleteClick = (search: string) => {
    setSearchQuery(search);
    setAutocompleteSearches(null);
    setShowAutocomplete(false);
    router.push(`/search?q=${search}`);
  };
  console.log("searchQuery", searchQuery);

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
    }
  }, [searchQuery]);

  return (
    <div className={styles.searchContainer}>
      <input
        className={styles.inputField}
        onChange={handleChange}
        value={searchQuery || ""}
        placeholder="🚀 Explore endless GIFs & stickers!"
        maxLength={40}
      />

      {showAutocomplete && autocompleteSearches && (
        <div className={styles.autocompleteContainer}>
          {autocompleteSearches.map((search) => (
            <div
              key={search.name}
              className={styles.autocompleteItem}
              onClick={() => handleAutoCompleteClick(search.name)}
            >
              {search.name}
            </div>
          ))}
        </div>
      )}

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
