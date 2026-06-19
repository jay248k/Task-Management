"use client";

import { Task } from "../types/task";
import { toast } from "react-toastify";

interface TaskItemProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
  onMarkComplete: (id: number) => void;
}

const priorityColors: Record<string, string> = {
  High: "bg-red-100 text-red-700",
  Medium: "bg-yellow-100 text-yellow-700",
  Low: "bg-green-100 text-green-700",
};

export default function TaskItem({
  task,
  onEdit,
  onDelete,
  onMarkComplete,
}: TaskItemProps) {
  const handleMarkComplete = () => {
    // Logical validations
    if (!task.due_date) {
      toast.error("Cannot complete: Due date is missing.");
      return;
    }
    if (task.description.trim().length < 20) {
      toast.error("Cannot complete: Description must be at least 20 characters.");
      return;
    }
    onMarkComplete(task.id);
  };

  const formattedDate = task.due_date
    ? new Date(task.due_date).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "No due date";

  return (
    <div
      className={`bg-white border rounded p-4 flex flex-col gap-3 ${
        task.status === "Completed"
          ? "border-green-300 opacity-80"
          : "border-gray-200"
      }`}
    >
      {/* Top row: title + status badge */}
      <div className="flex items-start justify-between gap-2">
        <h3
          className={`font-semibold text-gray-800 text-sm leading-snug ${
            task.status === "Completed" ? "line-through text-gray-400" : ""
          }`}
        >
          {task.title}
        </h3>
        <span
          className={`text-xs px-2 py-0.5 rounded-full shrink-0 font-medium ${
            task.status === "Completed"
              ? "bg-green-100 text-green-700"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          {task.status}
        </span>
      </div>

      {/* Description */}
      <p className="text-gray-600 text-sm leading-relaxed">{task.description}</p>

      {/* Meta: priority + due date */}
      <div className="flex items-center gap-3 text-xs">
        <span
          className={`px-2 py-0.5 rounded font-medium ${priorityColors[task.priority] ?? "bg-gray-100 text-gray-600"}`}
        >
          {task.priority}
        </span>
        <span className="text-gray-500">Due: {formattedDate}</span>
      </div>

      {/* Action buttons */}
      <div className="flex items-center gap-2 pt-1 border-t border-gray-100">
        {task.status !== "Completed" && (
          <button
            onClick={handleMarkComplete}
            className="text-xs bg-green-600 text-white px-3 py-1.5 rounded hover:bg-green-700 transition-colors font-medium"
          >
            Mark Complete
          </button>
        )}
        <button
          onClick={() => onEdit(task)}
          className="text-xs bg-blue-50 text-blue-700 px-3 py-1.5 rounded hover:bg-blue-100 transition-colors font-medium"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="text-xs bg-red-50 text-red-600 px-3 py-1.5 rounded hover:bg-red-100 transition-colors font-medium"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
