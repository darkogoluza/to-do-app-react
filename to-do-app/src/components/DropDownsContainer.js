import React from "react";
import DropDown from "./DropDown";
import { filterByData, sortByData } from "../data/data";
import { useGlobalContext } from "../context";

const DropDownsContainer = () => {
  const { filterTasks, sortTasks } = useGlobalContext();

  return (
    <section className="dropdown-container">
      <DropDown
        title="Filter by"
        dropdownId="dropdown-filter"
        items={filterByData}
        onSelect={filterTasks}
      />
      <DropDown
        title="Sort by"
        dropdownId="dropdown-sort"
        items={sortByData}
        onSelect={sortTasks}
        defaultType={localStorage.getItem("sortType")}
      />
    </section>
  );
};

export default DropDownsContainer;
