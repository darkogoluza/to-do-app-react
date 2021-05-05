import React, { useContext, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [isRename, setIsRename] = useState({ state: false, id: undefined });
  const [isSearchBarActive, setIsSearchBarActive] = useState(false);
  const [isDraggable, setIsDraggable] = useState(false);

  const addTask = (taskName) => {
    const newTask = {
      id: uuidv4().toString(),
      name: taskName,
      isDone: false,
      date: new Date(),
      searchHide: false,
      filterHide: false,
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
          newTask.searchHide = false;
          return newTask;
        })
      );
      return;
    }

    const regex = new RegExp(`^${name}`, "gi");
    setTasks(
      tasks.map((task) => {
        const newTask = task;
        newTask.searchHide = !newTask.name.match(regex);
        return newTask;
      })
    );
  };

  const filterTasks = (filterType) => {
    if (tasks.length === 0) return;
    switch (filterType) {
      case "All":
        setTasks(
          tasks.map((task) => {
            const newTask = task;
            newTask.filterHide = false;
            return newTask;
          })
        );
        break;
      case "Done":
        setTasks(
          tasks.map((task) => {
            const newTask = task;
            newTask.filterHide = !newTask.isDone;
            return newTask;
          })
        );
        break;
      case "Not Done":
        setTasks(
          tasks.map((task) => {
            const newTask = task;
            newTask.filterHide = newTask.isDone;
            return newTask;
          })
        );
        break;
    }
  };

  const sortTasks = (sortType) => {
    localStorage.setItem("sortType", sortType);
    if (tasks.length === 0) return;
    setIsDraggable(false);
    switch (sortType) {
      case "Name":
        setTasks(getSortedTasksByName([...tasks]));
        break;
      case "Name Descending":
        setTasks(getSortedTasksByName([...tasks]).reverse());
        break;
      case "Newest":
        setTasks(getSortedTasksByDate([...tasks]));
        break;
      case "Oldest":
        setTasks(getSortedTasksByDate([...tasks]).reverse());
        break;
      case "Manual":
        setIsDraggable(true);
    }
  };

  const getSortedTasksByName = (items) => {
    return items.sort((a, b) => {
      const nameA = a.name.toUpperCase();
      const nameB = b.name.toUpperCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }

      return 0;
    });
  };

  const getSortedTasksByDate = (items) => {
    return items.sort((a, b) => {
      const dateA = a.date;
      const dateB = b.date;

      if (dateA < dateB) {
        return -1;
      }
      if (dateA > dateB) {
        return 1;
      }

      return 0;
    });
  };

  useEffect(() => {
    let loadedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (loadedTasks) {
      loadedTasks = loadedTasks.map((task) => {
        return {
          ...task,
          date: new Date(task.date),
          searchHide: false,
          filterHide: false,
        };
      });
      setTasks(loadedTasks);
      setIsDraggable(localStorage.getItem("sortType") === "Manual");
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
        setTasks,
        removeTask,
        toggleTask,
        isRename,
        startRename,
        renameTask,
        getTaskName,
        isSearchBarActive,
        filterTasksBySearch,
        filterTasks,
        sortTasks,
        isDraggable,
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
