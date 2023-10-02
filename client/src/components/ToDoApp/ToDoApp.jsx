import axios from "axios";
import { useEffect, useState } from "react";
import {
  addTask,
  completeTask,
  deleteAllTask,
  deleteTask,
  getTasks,
  updateTaskName,
} from "../../controllers/todoappControllers";

export default function ToDoApp() {
  const [user, setUser] = useState("");
  const [tasks, setTasks] = useState([]);
  const [createTask, setCreateTask] = useState(true);
  const [taskToAdd, setTaskToAdd] = useState({
    task: "",
    userId: "",
  });

  const pendingTasks = tasks.filter((el) => el.completed === false);
  const tasksCompleted = tasks.filter((el) => el.completed === true);

  async function loadUserFromLocalStorage() {
    setUser(JSON.parse(window.localStorage.getItem("user")));
  }

  useEffect(() => {
    loadUserFromLocalStorage();
    getTasks(axios, setTasks);
  }, []);

  async function handleAddTask(e) {
    e.preventDefault();
    addTask(axios, taskToAdd, setTaskToAdd, setTasks, tasks);
  }

  function handleChange(e) {
    setTaskToAdd({
      ...taskToAdd,
      [e.target.name]: e.target.value,
      userId: user.id,
    });
  }

  async function handleEditTask(id, task, e) {
    e.preventDefault();
    setTaskToAdd({
      ...taskToAdd,
      id,
      task,
      userId: user.id,
    });
    setCreateTask(false);
  }

  function handleLogout() {
    const emptyUser = { username: "", id: "" };
    setUser(emptyUser);
    window.localStorage.setItem("user", JSON.stringify(emptyUser));
    window.location.href = "http://localhost:3000/";
  }

  async function handleUpdateTaskName(e) {
    e.preventDefault();
    updateTaskName(
      axios,
      taskToAdd,
      setTaskToAdd,
      setTasks,
      setCreateTask,
      user
    );
  }

  async function handleCompleteTask(id, e) {
    e.preventDefault();
    completeTask(axios, id, setTasks);
  }

  async function handleDeleteTask(id, e) {
    e.preventDefault();
    deleteTask(axios, id, setTasks);
  }

  async function handleDeleteAllTask(e) {
    e.preventDefault();
    deleteAllTask(axios, user, setTasks);
  }

  return (
    <div className=" mt-md-5 bg-color-form px-3 d-flex justify-content-center">
      {user.name ? (
        <div className="container-flex bg-white rounded width-todo-device my-3 pt-4 py-md-5 shadow">
          <div className="d-flex justify-content-center">
            <button className="btn p-0 mt-md-5" onClick={() => handleLogout()}>
              <svg
                width="30"
                height="30"
                viewBox="0 0 1200 1200"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="#ef4444"
                  d="M513.94 0v693.97h172.12V0H513.94zM175.708 175.708C67.129 284.287 0 434.314 0 600c0 331.371 268.629 600 600 600s600-268.629 600-600c0-165.686-67.13-315.713-175.708-424.292l-120.85 120.85c77.66 77.658 125.684 184.952 125.684 303.442c0 236.981-192.146 429.126-429.126 429.126c-236.981 0-429.126-192.145-429.126-429.126c0-118.49 48.025-225.784 125.684-303.442l-120.85-120.85z"
                />
              </svg>
            </button>
          </div>
          <div>
            <h5 className="text-center text-md-end mt-md-5 mt-4 me-md-5 font-light">
              {user ? `Welcome, ${user.name[0].toUpperCase()}` : ""}
            </h5>
            <p className="text-center text-md-end me-md-5 fw-bold">
              {tasks[0]
                ? pendingTasks[0]
                  ? `You have ${pendingTasks.length} task(s) to do!`
                  : "You have no tasks to do, GOOD JOB!"
                : ""}
            </p>
          </div>

          <form className="d-flex justify-content-center my-5">
            <input
              type="text"
              className="w-75 rounded-start-2 border border-white bg-light p-0"
              name="task"
              value={taskToAdd.task}
              onChange={(e) => handleChange(e)}
              placeholder="  Enter a task"
            ></input>
            <button
              className={`btn ${
                createTask ? "btn-success" : "btn-warning"
              } rounded-start-0 rounded-end-2 fw-bold text-wrap p-1 py-2`}
              onClick={(e) => {
                createTask ? handleAddTask(e) : handleUpdateTaskName(e);
              }}
              disabled={taskToAdd.task.length < 4 ? true : false}
            >
              {createTask ? "Add Task" : "Update Task"}
            </button>
          </form>
          <div>
            <div className="mb-3 mx-2 mx-sm-5 container-flex">
              {tasks[0] ? (
                pendingTasks.map((t, index) => (
                  <div
                    className="d-flex align-items-center w-100 border rounded mb-2 py-2 px-1"

                    key={index}
                  >
                    <button
                      className="btn p-0"
                      onClick={(e) => handleCompleteTask(t.id, e)}
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 16 16"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill="#ef4444"
                          d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293L5.354 4.646z"
                        />
                      </svg>
                    </button>
                    <p className={`w-75 fs-6 fw-bold m-auto ms-3 text-danger`}>
                      {t.task.toUpperCase()}
                    </p>
                    <button
                      className="btn p-0 me-2"
                      onClick={(e) => handleEditTask(t.id, t.task, e)}
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 32 32"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill="#000000"
                          d="M2 26h28v2H2zM25.4 9c.8-.8.8-2 0-2.8l-3.6-3.6c-.8-.8-2-.8-2.8 0l-15 15V24h6.4l15-15zm-5-5L24 7.6l-3 3L17.4 7l3-3zM6 22v-3.6l10-10l3.6 3.6l-10 10H6z"
                        />
                      </svg>
                    </button>
                    <button
                      className="btn p-0"
                      onClick={(e) => handleDeleteTask(t.id, e)}
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 16 16"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill="#000000"
                          d="M2 5v10c0 .55.45 1 1 1h9c.55 0 1-.45 1-1V5H2zm3 9H4V7h1v7zm2 0H6V7h1v7zm2 0H8V7h1v7zm2 0h-1V7h1v7zm2.25-12H10V.75A.753.753 0 0 0 9.25 0h-3.5A.753.753 0 0 0 5 .75V2H1.75a.752.752 0 0 0-.75.75V4h13V2.75a.752.752 0 0 0-.75-.75zM9 2H6v-.987h3V2z"
                        />
                      </svg>
                    </button>
                  </div>
                ))
              ) : (
                <div className="d-flex justify-content-center">
                  <p className="fs-4">There are no tasks to do</p>
                </div>
              )}
            </div>
            <p
              className={`${
                tasksCompleted[0] ? "" : "d-none"
              } text-center fs-3`}
            >
              <span className="border-bottom border-success p-1">
                Completed
              </span>
            </p>
            <div className="mb-5 mx-2 mx-sm-5  container-flex">
              {tasks[0]
                ? tasksCompleted.map((t, index) => (
                    <div
                      className="d-flex  align-items-center border rounded mb-2 py-2 px-1"
                      key={index}
                    >
                      <button
                        className="btn p-0"
                        onClick={(e) => handleCompleteTask(t.id, e)}
                      >
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 16 16"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill="#22c55e"
                            d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417L5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"
                          />
                        </svg>
                      </button>
                      <p
                        className={`w-75 fs-6 fw-bold m-auto ms-3 text-success`}
                      >
                        {t.task.toUpperCase()}
                      </p>
                      <button
                        className="btn p-0"
                        onClick={(e) => handleDeleteTask(t.id, e)}
                      >
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 16 16"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill="#000000"
                            d="M2 5v10c0 .55.45 1 1 1h9c.55 0 1-.45 1-1V5H2zm3 9H4V7h1v7zm2 0H6V7h1v7zm2 0H8V7h1v7zm2 0h-1V7h1v7zm2.25-12H10V.75A.753.753 0 0 0 9.25 0h-3.5A.753.753 0 0 0 5 .75V2H1.75a.752.752 0 0 0-.75.75V4h13V2.75a.752.752 0 0 0-.75-.75zM9 2H6v-.987h3V2z"
                          />
                        </svg>
                      </button>
                    </div>
                  ))
                : ""}
            </div>
          </div>
          <div
            className={` ${
              tasks[0] ? "d-flex" : "d-none"
            } justify-content-center mb-5`}
          >
            <button
              className="btn btn-outline-danger "
              onClick={(e) => handleDeleteAllTask(e)}
            >
              <span className="text-black fw-bold me-2">Delete All</span>
              <svg
                width="24"
                height="24"
                viewBox="0 0 16 16"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="#000000"
                  d="M2 5v10c0 .55.45 1 1 1h9c.55 0 1-.45 1-1V5H2zm3 9H4V7h1v7zm2 0H6V7h1v7zm2 0H8V7h1v7zm2 0h-1V7h1v7zm2.25-12H10V.75A.753.753 0 0 0 9.25 0h-3.5A.753.753 0 0 0 5 .75V2H1.75a.752.752 0 0 0-.75.75V4h13V2.75a.752.752 0 0 0-.75-.75zM9 2H6v-.987h3V2z"
                />
              </svg>
            </button>
          </div>
        </div>
      ) : (
        <div className="container my-5 py-5">
          <p className="text-center fs-5">
            You need to be logged in to use the application
          </p>
          <div className=" d-flex justify-content-center">
            <button className="btn btn-success" onClick={() => handleLogout()}>
              Sign in
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
