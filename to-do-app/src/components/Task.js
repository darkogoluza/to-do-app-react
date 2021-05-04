import React from "react";
import { formatISO9075 } from "date-fns";
import { useGlobalContext } from "../context";

const Task = ({ id, name, isDone, date }) => {
  const { removeTask, toggleTask, startRename } = useGlobalContext();
  return (
    <>
      <li className="task">
        <div className={`task__info ${isDone && "task-done"}`}>
          <h1>{name}</h1>
          <p>Created on : {formatISO9075(date)}</p>
        </div>
        <div className="task_buttons">
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
