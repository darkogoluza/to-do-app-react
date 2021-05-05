import React, { useState, useRef, useEffect } from "react";

const DropDown = ({ title = "", items = [], dropdownId = "" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState([]);
  const dropdown = useRef(null);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (id) => {
    setSelectedItem(items.find((item) => item.id === id));
    setTimeout(() => {
      setIsOpen(false);
    }, 300);
  };

  const calculateListHeight = () => {
    const items = [
      ...document
        .querySelector("#" + dropdownId)
        .querySelector(".dropdown__list").childNodes,
    ];

    return items.reduce((acc, item) => {
      acc += item.offsetHeight;
      return acc;
    }, 0);
  };

  const handleGlobalClick = (e) => {
    if (!dropdown.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleGlobalClick);

    setSelectedItem(items[0]);

    return () => {
      document.removeEventListener("mousedown", handleGlobalClick);
    };
  }, []);

  return (
    <div className="dropdown" ref={dropdown} id={dropdownId}>
      <button type="button" className="dropdown__header" onClick={handleClick}>
        <h3 className="dropdown__header__title">
          {title} {selectedItem.name}
        </h3>
        <h3 className="dropdown__header__state">{isOpen ? "Close" : "Open"}</h3>
      </button>
      <ul
        className="dropdown__list"
        style={{ height: isOpen ? calculateListHeight() : "0px" }}
      >
        {items.map(({ id, name }) => {
          return (
            <li
              key={id}
              className="dropdown__list__item"
              onClick={() => {
                handleItemClick(id);
              }}
            >
              <span>{name}</span>
              <span>{id === selectedItem.id && "selected"}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default DropDown;
