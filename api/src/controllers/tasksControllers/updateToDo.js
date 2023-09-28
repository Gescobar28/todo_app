/* *************** LOCAL **************** */


import tasks from "../../utils/allTasks.json" assert { type: "json" };
import fsPromises from "fs/promises";
import path from "path";

const dataFilePath = path.join(process.cwd(), "/src/utils/allTasks.json");

export const updateToDo = async (req, res) => {
  const { id } = req.params;
  console.log(id);

  try {
    const taskToChangeStatus = tasks.find((el) => el.id == id);

    const newTasks = tasks.map((el) => {
      if (el.id == id) {
        el.completed = !el.completed;
        return el;
      } else {
        return el;
      }
    });

    const responseTasks = newTasks.filter(el => el.userId == taskToChangeStatus.userId)
    const updateTasks = JSON.stringify(newTasks);

    await fsPromises.writeFile(dataFilePath, updateTasks);

    res.status(200).json({ update: true, tasks: responseTasks });
  } catch (error) {
    console.error(error);
  }
};

/* *************** API **************** */

// import axios from "axios";

// export const updateToDo = async (req, res) => {
//   try {
//     const data = req.body;
//     const json = await axios.put("https://dummyjson.com/todos/1", data);
//     res.status(200).json({ updated: true, data: json.data });
//   } catch (error) {
//     console.error(error);
//   }
// };