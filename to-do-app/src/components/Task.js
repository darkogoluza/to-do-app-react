import React from "react";

const Task = ({ name, date }) => {
  return (
    <>
      <li>
        <h1>{name}</h1>
        <p>{date.toString()}</p>
      </li>
    </>
  );
};

export default Task;
