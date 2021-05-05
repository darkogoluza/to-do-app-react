import React, { useState, useEffect } from "react";
import { useGlobalContext } from "../context";

const Input = () => {
  const [inputValue, setInputValue] = useState("");
  const {
    addTask,
    isRename: { state: renameState, id: renameId },
    renameTask,
    getTaskName,
  } = useGlobalContext();

  const handleClick = () => {
    if (renameState) {
      renameTask(renameId, inputValue);
      setInputValue("");
    } else {
      addTask(inputValue);
      setInputValue("");
    }
  };

  useEffect(() => {
    if (renameState) setInputValue(getTaskName(renameId));
  }, [renameState, renameId]);

  return (
    <>
      <div className="input">
        <label htmlFor="input" className="input__label">
          {renameState ? "Change name" : "Create new task"}
        </label>
        <div className="input__container">
          <input
            type="text"
            name="input"
            id="input"
            placeholder="Enter task..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button
            className={`input__container__button ${
              inputValue === "" && "button--deactivate"
            }`}
            onClick={handleClick}
          >
            {renameState ? "Rename" : "Create"}
          </button>
        </div>
        {inputValue === "" && (
          <p className="input__warning">
            Enter valid name (name can not be empty)
          </p>
        )}
      </div>
    </>
  );
};

export default Input;
