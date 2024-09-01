import { useState, useEffect } from "react";
import { IoAddCircleOutline } from "react-icons/io5";
import TempText from "../Components/TempText";
import Task from "../Components/Task";

const Home = () => {
  const [taskCount, setTaskCount] = useState(0);
  const [doneCount, setDoneCount] = useState(0);
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    // Load tasks from local storage on component mount
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(storedTasks);
    setTaskCount(storedTasks.length);
    const doneTasks = storedTasks.filter((task) => task.isDone);
    setDoneCount(doneTasks.length);
  }, []);

  useEffect(() => {
    // Save tasks to local storage whenever tasks change
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleInputChange = (e) => {
    setText(e.target.value);
  };

  const handleAddTask = () => {
    if (text.trim() === "") return;
    const newTask = {
      id: taskCount + 1,
      text,
      isDone: false,
    };
    setTasks([newTask, ...tasks]);
    setTaskCount(taskCount + 1);
    setText("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleAddTask();
    }
  };

  return (
    <div className="xl:px-28 px-8 sm:px-12 bg-primary min-h-[calc(100vh-200px)] max-h-[100vh]">
      <div className="container max-w-screen-lg m-auto flex flex-col gap-16">
        <div className="input w-full -mt-[28.8px] flex flex-col sm:flex-row gap-6 items-center">
          <div className="relative w-full sm:w-[80%] lg:w-[90%]">
            <input
              type="text"
              placeholder={`Write your note and press "Enter" ...`}
              className="bg-taskBg text-white px-6 py-4 border-blackC border-[1.5px] focus:outline-none rounded-[8px] w-full"
              value={text}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
            />
            <div className="hint-box">Date Format YYYY-MM-DD or YYYY/MM/DD</div>
          </div>

          <button
            className="bg-secondary hover:bg-secondaryL transition-all duration-300 px-4 py-4 text-whiteG sm:w-[20%] lg:w-[10%] flex justify-center items-center gap-2 text-[14px] font-bold rounded-[8px]"
            onClick={handleAddTask}
          >
            Add
            <IoAddCircleOutline className="text-[20px]" />
          </button>
        </div>

        <div className="tasks-div">
          <div className="head flex justify-between items-center text-[14px] font-bold">
            <div className="left flex items-center justify-center gap-2">
              <p className="text-secondaryL font-outline-1">Tasks</p>
              <span className="task-count bg-taskBg text-whiteH py-1 px-2 rounded-full">
                {taskCount}
              </span>
            </div>
            <div className="right flex items-center justify-center gap-2">
              <p className="text-burbleC">Done</p>
              <span className="done-count bg-taskBg text-whiteH py-1 px-2 rounded-full">
                {doneCount} of {taskCount}
              </span>
            </div>
          </div>

          {taskCount <= 0 ? (
            <TempText />
          ) : (
            <Task
              taskCount={taskCount}
              setTaskCount={setTaskCount}
              doneCount={doneCount}
              setDoneCount={setDoneCount}
              tasks={tasks}
              setTasks={setTasks}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
