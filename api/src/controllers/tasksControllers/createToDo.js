/* *************** LOCAL **************** */

import tasks from "../../utils/allTasks.json" assert { type: "json" };
import fsPromises from "fs/promises";
import path from "path";

const dataFilePath = path.join(process.cwd(), "/src/utils/allTasks.json");

export const createToDo = async (req, res) => {
  const { task, userId  } = req.body;

  try {
    let lastId = !tasks[0] ? 0 : tasks.at(-1).id;

    const newTask = {
      id: lastId === 0 ? 1 : lastId + 1,
      task,
      completed:false,
      userId,
    };

    tasks.push(newTask);

    const updateTasks = JSON.stringify(tasks);

    await fsPromises.writeFile(dataFilePath, updateTasks);

    res.status(200).json({
      created: true,
      message: "The task has been created succesfully",
      newTask,
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      message: error.message,
    });
  }
};

/* *************** API **************** */

// import axios from "axios";

// export const createToDo = async (req, res) => {
//   try {
//     const data = req.body;
//     const json = await axios.post("https://dummyjson.com/todos/add", data);
//     res.status(201).json({ created: true, data: json.data });
//   } catch (error) {
//     console.error(error);
//   }
// };
