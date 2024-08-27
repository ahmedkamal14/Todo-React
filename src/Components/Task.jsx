import { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import PropTypes from "prop-types";

const Task = ({ setTaskCount, setDoneCount, tasks, setTasks }) => {
  const [animatingId, setAnimatingId] = useState(null); // State for animation

  const handleDoneChange = (e) => {
    const id = e.target.id;
    const newTasks = tasks.map((task) => {
      if (task.id === parseInt(id)) {
        task.isDone = !task.isDone;
      }
      return task;
    });
    setTasks(newTasks);
    const doneTasks = newTasks.filter((task) => task.isDone);
    setDoneCount(doneTasks.length);
  };

  const handleDelete = (id) => {
    setAnimatingId(id);
    setTimeout(() => {
      const newTasks = tasks.filter((task) => task.id !== id);
      setTasks(newTasks);
      setTaskCount(newTasks.length);
      const doneTasks = newTasks.filter((task) => task.isDone);
      setDoneCount(doneTasks.length);
      setAnimatingId(null); // Reset animation state
    }, 200); // Match this with the CSS transition duration
  };

  return (
    <div className="container max-w-screen-lg mx-auto mt-8">
      <div className="tasks flex flex-col gap-4">
        {tasks.map((task) => (
          <div
            key={task.id}
            className={`task flex justify-between items-center py-4 px-4 sm:py-5 sm:px-6 rounded-lg bg-taskBg border gap-4 transition-transform duration-300 ${
              task.isDone ? "border-none" : "border-taskBorder"
            } ${animatingId === task.id ? "task-swiping" : ""}`}
          >
            <button className="status-check flex items-center">
              <input
                type="checkbox"
                className="custom-checkbox"
                onChange={handleDoneChange}
                id={task.id}
              />
            </button>

            <div className="content flex-grow sm:text-left">
              <p
                className={`text-[14px] font-outline-1 ${
                  task.isDone
                    ? "line-through decoration-[#808080] text-[#808080]"
                    : "text-whiteG"
                }`}
              >
                {task.text}
              </p>
            </div>

            <div className="actions flex items-center">
              <button
                className="delete flex items-center justify-center bg-transparent"
                onClick={() => handleDelete(task.id)}
              >
                <RiDeleteBin6Line className="text-gray-400 text-lg hover:text-red-900 transition-all duration-300" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

Task.propTypes = {
  tasks: PropTypes.array.isRequired,
  setTasks: PropTypes.func.isRequired,
  setTaskCount: PropTypes.func.isRequired,
  setDoneCount: PropTypes.func.isRequired,
};

export default Task;
