import React from "react";
import Task from "./Task";
import { useGlobalContext } from "../context";

const TaskList = () => {
  const { tasks } = useGlobalContext();
  return (
    <>
      <h1>Display tasks amount</h1>
      <ul>
        {tasks.map((task) => {
          return <Task key={task.id} {...task} />;
        })}
      </ul>
    </>
  );
};

export default TaskList;
