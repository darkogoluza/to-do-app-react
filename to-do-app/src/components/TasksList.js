import React from "react";
import Task from "./Task";
import { useGlobalContext } from "../context";

const TaskList = () => {
  const { tasks } = useGlobalContext();
  const tasksLength = tasks.reduce((acc, task) => {
    if (!task.hide) {
      acc += 1;
    }
    return acc;
  }, 0);
  return (
    <section className="task-list">
      <h1 className="task-list__title">
        {tasksLength > 0
          ? tasksLength === 1
            ? `${tasksLength} Task`
            : `${tasksLength} Tasks`
          : "No tasks"}
      </h1>
      <ul className="task-list__content">
        {tasks.map((task) => {
          return <Task key={task.id} {...task} />;
        })}
      </ul>
    </section>
  );
};

export default TaskList;
