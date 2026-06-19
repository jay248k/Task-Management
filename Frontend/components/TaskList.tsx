"use client";

import { useState, useEffect, useCallback } from "react";
import { Task } from "../types/task";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  markComplete,
} from "../services/taskApi";
import { toast } from "react-toastify";
import TaskForm from "./TaskForm";
import TaskItem from "./TaskItem";
import FilterBar from "./FilterBar";

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [editTask, setEditTask] = useState<Task | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getTasks();
      setTasks(data);
    } catch {
      toast.error("Failed to load tasks.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleCreate = async (task: {
    title: string;
    description: string;
    priority: string;
    due_date: string;
  }) => {
    try {
      await createTask(task);
      toast.success("Task added successfully.");
      setShowForm(false);
      fetchTasks();
    } catch {
      toast.error("Failed to add task.");
    }
  };

  const handleUpdate = async (
    id: number,
    task: {
      title: string;
      description: string;
      priority: string;
      due_date: string;
      status: string;
    }
  ) => {
    try {
      await updateTask(id, task);
      toast.success("Task updated.");
      setEditTask(null);
      setShowForm(false);
      fetchTasks();
    } catch {
      toast.error("Failed to update task.");
    }
  };

  const handleDelete = async (id: number) => {
    // if (!confirm("Delete this task?")) return;
    try {
      await deleteTask(id);
      toast.success("Task deleted.");
      fetchTasks();
    } catch {
      toast.error("Failed to delete task.");
    }
  };

  const handleMarkComplete = async (id: number) => {
    try {
      await markComplete(id);
      toast.success("Task marked as completed.");
      fetchTasks();
    } catch {
      toast.error("Failed to mark task complete.");
    }
  };

  const handleEdit = (task: Task) => {
    setEditTask(task);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancelForm = () => {
    setEditTask(null);
    setShowForm(false);
  };

  // Filter logic
  const filteredTasks = tasks.filter((task) => {
    const matchPriority =
      priorityFilter === "All" || task.priority === priorityFilter;
    const matchStatus =
      statusFilter === "All" || task.status === statusFilter;
    return matchPriority && matchStatus;
  });

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Task Manager</h1>
          <p className="text-gray-500 text-sm mt-0.5">
            {tasks.length} task{tasks.length !== 1 ? "s" : ""} total
          </p>
        </div>
        {!showForm && (
          <button
            onClick={() => {
              setEditTask(null);
              setShowForm(true);
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            + Add Task
          </button>
        )}
      </div>

      {/* Task Form */}
      {showForm && (
        <TaskForm
          onSubmit={handleCreate}
          onCancel={handleCancelForm}
          editTask={editTask}
          onUpdate={handleUpdate}
        />
      )}

      {/* Filter Bar */}
      <FilterBar
        priorityFilter={priorityFilter}
        statusFilter={statusFilter}
        onPriorityChange={setPriorityFilter}
        onStatusChange={setStatusFilter}
        onClearFilters={() => {
          setPriorityFilter("All");
          setStatusFilter("All");
        }}
      />

      {/* Task List */}
      {loading ? (
        <div className="text-center py-12 text-gray-500 text-sm">
          Loading tasks...
        </div>
      ) : filteredTasks.length === 0 ? (
        <div className="text-center py-12 border border-dashed border-gray-200 rounded text-gray-400 text-sm">
          {tasks.length === 0
            ? 'No tasks yet. Click "+ Add Task" to get started.'
            : "No tasks match the selected filters."}
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {filteredTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onMarkComplete={handleMarkComplete}
            />
          ))}
        </div>
      )}
    </div>
  );
}
