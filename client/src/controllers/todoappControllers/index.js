export async function getTasks(axios, setTasks) {
  const user = JSON.parse(window.localStorage.getItem("user"));
  const json = user
    ? await axios.get(`http://localhost:3001/getTasks/${user.id}`)
    : "";
  setTasks(json.data.tasks);
}

export async function addTask(
  axios,
  taskToAdd,
  setTaskToAdd,
  setTasks,
  tasks,
  user
) {
  const json = await axios.post("http://localhost:3001/newTask", taskToAdd);
  setTaskToAdd({ task: "", userId: user ? user.id : null });
  setTasks([...tasks, json.data.newTask]);
}

export async function updateTaskName(
  axios,
  taskToAdd,
  setTaskToAdd,
  setTasks,
  setCreateTask,
  user
) {
  const json = await axios.put(
    `http://localhost:3001/updateTaskName/${taskToAdd.id}`,
    taskToAdd
  );
  setTaskToAdd({ task: "", userId: user ? user.id : null });
  setCreateTask(true);
  setTasks(json.data.tasks);
}

export async function completeTask(axios, id, setTasks) {
  const json = await axios.put(`http://localhost:3001/updateTask/${id}`);
  setTasks(json.data.tasks);
}

export async function deleteTask(axios, id, setTasks) {
  const json = await axios.delete(`http://localhost:3001/deleteTask/${id}`);
  setTasks(json.data.tasks);
}

export async function deleteAllTask(axios, user, setTasks) {
    const json = await axios.delete(
      `http://localhost:3001/deleteAllTask/${user.id}`
    );
    setTasks(json.data.tasks);
  }
