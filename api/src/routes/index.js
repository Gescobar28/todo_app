import { Router } from "express";
import { getToDo } from "../controllers/tasksControllers/getToDo.js";
import { createToDo } from "../controllers/tasksControllers/createToDo.js";
import { updateToDo } from "../controllers/tasksControllers/updateToDo.js";
import { deleteToDo } from "../controllers/tasksControllers/deleteToDo.js";
import { createUser } from "../controllers/userControllers/createUser.js";
import { getUser } from "../controllers/userControllers/getUser.js";
import { deleteAllToDo } from "../controllers/tasksControllers/deleteAllToDo.js";
import { updateToDoName } from "../controllers/tasksControllers/updateToDoName.js";

const router = Router();

/********** USERS *********/

router.post("/getUser", getUser);
router.post("/newUser", createUser);


/********** TO-DO *********/
router.get("/getTasks/:id", getToDo);
router.post("/newTask", createToDo);
router.put("/updateTask/:id", updateToDo);
router.put("/updateTaskName/:id", updateToDoName);
router.delete("/deleteAllTask/:userId", deleteAllToDo);
router.delete("/deleteTask/:id", deleteToDo);


export default router;
