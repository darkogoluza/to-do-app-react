import React, { useContext, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [isRename, setIsRename] = useState({ state: false, id: undefined });
  const [isSearchBarActive, setIsSearchBarActive] = useState(false);

  const addTask = (taskName) => {
    const newTask = {
      id: uuidv4().toString(),
      name: taskName,
      isDone: false,
      date: new Date(),
      hide: false,
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
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  const getTaskName = (id) => {
    return tasks.find((task) => id === task.id).name;
  };

  const filterTasksBySearch = (name) => {
    if (name === "") {
      setTasks(
        tasks.map((task) => {
          const newTask = task;
          newTask.hide = false;
          return newTask;
        })
      );

      return;
    }

    const regex = new RegExp(`^${name}`, "gi");
    setTasks(
      tasks.map((task) => {
        const newTask = task;
        newTask.hide = !newTask.name.match(regex);
        return newTask;
      })
    );
  };

  useEffect(() => {
    let loadedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (loadedTasks) {
      loadedTasks = loadedTasks.map((task) => {
        return { ...task, date: new Date(task.date), hide: false };
      });
      setTasks(loadedTasks);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    setIsSearchBarActive(tasks.length >= 2);
  }, [tasks]);

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
        isSearchBarActive,
        filterTasksBySearch,
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
