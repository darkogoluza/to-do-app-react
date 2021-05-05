import React from "react";
import DropDown from "./DropDown";
import { filterByData, sortByData } from "../data/data";

const DropDownsContainer = () => {
  return (
    <section className="dropdown-container">
      <DropDown
        title="Filter by"
        dropdownId="dropdown-filter"
        items={filterByData}
      />
      <DropDown title="Sort by" dropdownId="dropdown-sort" items={sortByData} />
    </section>
  );
};

export default DropDownsContainer;
