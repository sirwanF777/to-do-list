const express = require("express");
const taskRouter = express.Router();

const taskController = require("../controllers/taskController");


taskRouter.get("/list", taskController.taskList);
taskRouter.post("/add", taskController.addTask);
taskRouter.delete("/delete", taskController.deleteTask);
taskRouter.patch("/update", taskController.updateTask);


module.exports = taskRouter;