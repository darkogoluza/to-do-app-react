import React, { useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [isRename, setIsRename] = useState({ state: false, id: undefined });

  const addTask = (taskName) => {
    const newTask = {
      id: uuidv4().toString(),
      name: taskName,
      isDone: false,
      date: new Date(),
    };
    setTasks([...tasks, newTask]);
  };

  const removeTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          task.isDone = !task.isDone;
        }
        return task;
      })
    );
  };

  const renameTask = (id, newName) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          task.name = newName;
        }
        return task;
      })
    );
    setIsRename({ state: false, id: undefined });
  };

  const startRename = (id) => {
    setIsRename({ state: true, id: id });
  };

  const getTaskName = (id) => {
    return tasks.find((task) => id === task.id).name;
  };

  return (
    <AppContext.Provider
      value={{
        tasks,
        addTask,
        removeTask,
        toggleTask,
        isRename,
        startRename,
        renameTask,
        getTaskName,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppProvider, AppContext };
