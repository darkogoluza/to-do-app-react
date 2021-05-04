import React, { useState } from "react";
import { useGlobalContext } from "../context";

const Input = () => {
  const [inputValue, setInputValue] = useState("");
  const { addTask } = useGlobalContext();

  const handleCreate = () => {
    addTask(inputValue);
    setInputValue("");
  };

  return (
    <>
      <div className="input">
        <label htmlFor="input" className="input__label">
          Create new task
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
          <button className="input__container__button" onClick={handleCreate}>
            Create
          </button>
        </div>
      </div>
    </>
  );
};

export default Input;
