import { Router } from "express";
import { createTask, deleteTask, getTasks, markComplete, updateTask } from "../controller/task.controller";

const taskRoutes = Router();

taskRoutes.post("/", createTask);
taskRoutes.get("/", getTasks);
taskRoutes.put("/:id", updateTask);
taskRoutes.delete("/:id", deleteTask);
taskRoutes.patch("/:id/complete", markComplete);

export default taskRoutes;