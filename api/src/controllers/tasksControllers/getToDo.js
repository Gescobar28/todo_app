/* *************** LOCAL **************** */

import tasks from "../../utils/allTasks.json" assert { type: "json" };

export const getToDo = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  if (id) {
    try {
      const tasksById = tasks.filter((el) => el.userId == id);
      console.log(tasksById);
      if (tasksById[0]) {
        res.status(200).json({
          error: false,
          tasks: tasksById,
        });
      } else {
        res.status(200).json({
          error: true,
          message: "There are no tasks to do",
          tasks: []
        });
      }
    } catch (error) {
      console.error(error);
    }
  }else{
    res.status(200).json({
      error: true,
      message: "id undefined",
    });
  }
};

/* *************** API **************** */

// import axios from "axios";

// export const getToDo = async (req, res) => {
//   try {
//     const json = await axios.get("https://dummyjson.com/todos/user/26");
//     res.status(200).json(json.data.todos);
//   } catch (error) {
//     console.error(error);
//   }
// };

