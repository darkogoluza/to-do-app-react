import React, { useState } from "react";
import { formatISO9075 } from "date-fns";
import { useGlobalContext } from "../context";

const Task = ({ id, name, isDone, date, filterHide, searchHide }) => {
  const [isRemove, setIsRemove] = useState(false);
  const { removeTask, toggleTask, startRename } = useGlobalContext();
  return (
    <>
      <div
        className={`task ${(filterHide || searchHide) && "task-hide"} ${
          isRemove && "task-remove"
        }`}
      >
        <div className={`task__info ${isDone && "task-done"}`}>
          <h1>
            Task: <span className="task__info-highlight"> {name}</span>
          </h1>
          <p>
            Created on:{" "}
            <span className="task__info-highlight">{formatISO9075(date)}</span>
          </p>
        </div>
        <div className="task__buttons">
          <button
            className="task__button task--mark-as-done"
            onClick={() => {
              toggleTask(id);
            }}
          >
            Mark as done
          </button>
          <button
            className="task__button task--rename"
            onClick={() => {
              startRename(id);
            }}
          >
            Rename
          </button>
          <button
            className="task__button task--remove"
            onClick={() => {
              setIsRemove(true);
              setTimeout(() => {
                removeTask(id);
              }, 300);
            }}
          >
            Remove
          </button>
        </div>
      </div>
    </>
  );
};

export default Task;
