import React, { useContext, useState } from "react";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  const addTask = (taskName) => {
    const newTask = { id: "1", name: taskName, date: new Date() };
    setTasks([...tasks, newTask]);
  };

  return (
    <AppContext.Provider value={{ tasks, addTask }}>
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppProvider, AppContext };
