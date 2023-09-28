/* *************** LOCAL **************** */

import tasks from "../../utils/allTasks.json" assert { type: "json" };
import fsPromises from "fs/promises";
import path from "path";

const dataFilePath = path.join(process.cwd(), "/src/utils/allTasks.json");

export const deleteToDo = async (req, res) => {
  const { id } = req.params;
  console.log(id);

  try {
    const taskToDelete = tasks.find((el) => el.id == id);

    const newTasks = tasks.filter((el) => el.id != id);

    const responseTasks = newTasks.filter(el => el.userId == taskToDelete.userId)
    const updateTasks = JSON.stringify(newTasks);

    await fsPromises.writeFile(dataFilePath, updateTasks);

    res.status(200).json({ delete: true, tasks: responseTasks });
  } catch (error) {
    res.status(400).json({ delete: false, error: error.message });
  }
};

/************* API *********** */

// import axios from "axios";

// export const deleteToDo = async (req, res) => {
//   try {
//     const json = await axios.delete("https://dummyjson.com/todos/1");
//     res.status(200).json({ delete: true, data: json.data });
//   } catch (error) {
//     console.error(error);
//   }
// };