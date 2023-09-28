import tasks from "../../utils/allTasks.json" assert { type: "json" };
import fsPromises from "fs/promises";
import path from "path";

const dataFilePath = path.join(process.cwd(), "/src/utils/allTasks.json");

export const updateToDoName = async (req, res) => {
  const { id } = req.params;
  const { task } = req.body;

  try {
    const taskToChangeName = tasks.find((el) => el.id == id);

    const newTasks = tasks.map((el) => {
      if (el.id == id) {
        el.task = task;
        return el;
      } else {
        return el;
      }
    });

    const responseTasks = newTasks.filter(
      (el) => el.userId == taskToChangeName.userId
    );
    const updateTasks = JSON.stringify(newTasks);

    await fsPromises.writeFile(dataFilePath, updateTasks);

    res.status(200).json({ update: true, tasks: responseTasks });
  } catch (error) {
    console.error(error);
  }
};
