"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.markComplete = exports.deleteTask = exports.updateTask = exports.getTasks = exports.createTask = void 0;
const db_1 = require("../config/db");
// Create Task
const createTask = async (req, res) => {
    try {
        const { title, description, priority, due_date } = req.body;
        const task = await (0, db_1.sql) `
      INSERT INTO tasks(title, description, priority, due_date)
      VALUES(${title}, ${description}, ${priority}, ${due_date})
      RETURNING *`;
        res.status(201).json(task[0]);
    }
    catch (error) {
        res.status(500).json({ message: "Failed to create task", error });
    }
};
exports.createTask = createTask;
// Get Tasks
const getTasks = async (req, res) => {
    try {
        const tasks = await (0, db_1.sql) `SELECT * FROM tasks ORDER BY id DESC`;
        res.status(200).json(tasks);
    }
    catch (error) {
        res.status(500).json({ message: "Failed to fetch tasks", error });
    }
};
exports.getTasks = getTasks;
// Update Task
const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, priority, due_date, status } = req.body;
        const task = await (0, db_1.sql) `
      UPDATE tasks
      SET title=${title},
          description=${description},
          priority=${priority},
          due_date=${due_date},
          status=${status}
      WHERE id=${id}
      RETURNING *`;
        res.status(200).json({
            success: true,
            message: "Task updated successfully",
            data: task[0],
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to update task",
            error,
        });
    }
};
exports.updateTask = updateTask;
// Delete Task
const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        await (0, db_1.sql) `DELETE FROM tasks WHERE id=${id}`;
        res.status(200).json({
            success: true,
            message: "Task deleted successfully",
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to delete task",
            error,
        });
    }
};
exports.deleteTask = deleteTask;
// Mark Complete
const markComplete = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await (0, db_1.sql) `
      UPDATE tasks
      SET status='Completed'
      WHERE id=${id}
      RETURNING *`;
        res.status(200).json({
            success: true,
            message: "Task marked as completed",
            data: task[0],
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to mark task complete",
            error,
        });
    }
};
exports.markComplete = markComplete;
