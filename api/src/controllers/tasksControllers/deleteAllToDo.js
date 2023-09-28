import tasks from "../../utils/allTasks.json" assert { type: "json" };
import fsPromises from "fs/promises";
import path from "path";

const dataFilePath = path.join(process.cwd(), "/src/utils/allTasks.json");

export const deleteAllToDo = async (req, res) => {
  const { userId } = req.params;

  try {
    const newTasks = tasks.filter((el) => el.userId != userId);

    const updateTasks = JSON.stringify(newTasks);

    await fsPromises.writeFile(dataFilePath, updateTasks);

    res.status(200).json({ delete: true, tasks: [] });
  } catch (error) {
    res.status(400).json({ delete: false, error: error.message });
  }
};
