import { Request, Response } from "express";
import { sql } from "../config/db";

// Create Task
export const createTask = async (req: Request, res: Response) => {
  try {
    const { title, description, priority, due_date } = req.body;

    const task = await sql`
      INSERT INTO tasks(title, description, priority, due_date)
      VALUES(${title}, ${description}, ${priority}, ${due_date})
      RETURNING *`;

    res.status(201).json(task[0]);
  } catch (error) {
    res.status(500).json({ message: "Failed to create task", error });
  }
};

// Get Tasks
export const getTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await sql`SELECT * FROM tasks ORDER BY id DESC`;

    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch tasks", error });
  }
};

// Update Task
export const updateTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description, priority, due_date, status } = req.body;

    const task = await sql`
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
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update task",
      error,
    });
  }
};


// Delete Task
export const deleteTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await sql`DELETE FROM tasks WHERE id=${id}`;

    res.status(200).json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete task",
      error,
    });
  }
};

// Mark Complete
export const markComplete = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const task = await sql`
      UPDATE tasks
      SET status='Completed'
      WHERE id=${id}
      RETURNING *`;

    res.status(200).json({
      success: true,
      message: "Task marked as completed",
      data: task[0],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to mark task complete",
      error,
    });
  }
};