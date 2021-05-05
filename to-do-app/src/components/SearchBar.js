import React, { useState } from "react";
import { useGlobalContext } from "../context";

const SearchBar = () => {
  const [inputValue, setInputValue] = useState("");
  const { isSearchBarActive, filterTasksBySearch } = useGlobalContext();

  return (
    <>
      <section
        className={`search-bar ${isSearchBarActive && "search-bar--active"}`}
      >
        <label htmlFor="search" className="search-bar__label">
          Find task
        </label>
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Task name..."
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            filterTasksBySearch(e.target.value);
          }}
        />
      </section>
    </>
  );
};

export default SearchBar;
