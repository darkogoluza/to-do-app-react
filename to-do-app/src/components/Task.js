import React from "react";
import { formatISO9075 } from "date-fns";
import { useGlobalContext } from "../context";

const Task = ({ id, name, isDone, date, hide }) => {
  const { removeTask, toggleTask, startRename } = useGlobalContext();
  return (
    <>
      <li className={`task ${hide && "task-hide"}`}>
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
              removeTask(id);
            }}
          >
            Remove
          </button>
        </div>
      </li>
    </>
  );
};

export default Task;
