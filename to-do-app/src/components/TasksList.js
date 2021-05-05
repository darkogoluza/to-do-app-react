import React from "react";
import Task from "./Task";
import { useGlobalContext } from "../context";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const TaskList = () => {
  const { tasks, setTasks, isDraggable } = useGlobalContext();
  const tasksLength = tasks.reduce((acc, task) => {
    if (!task.searchHide && !task.filterHide) {
      acc += 1;
    }
    return acc;
  }, 0);

  function handleOnDragEnd(result) {
    if (!result.destination) return;

    const items = Array.from(tasks);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setTasks(items);
  }

  return (
    <section className="task-list">
      <h1 className="task-list__title">
        {tasksLength > 0
          ? tasksLength === 1
            ? `${tasksLength} Task`
            : `${tasksLength} Tasks`
          : "No tasks"}
      </h1>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="characters">
          {(provided) => (
            <ul
              className="task-list__content"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {tasks.map((task, index) => {
                return (
                  <Draggable
                    key={task.id}
                    draggableId={task.id}
                    index={index}
                    isDragDisabled={!isDraggable}
                  >
                    {(provided) => (
                      <li
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="task-wrapper"
                      >
                        <Task {...task} />
                      </li>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </section>
  );
};

export default TaskList;
