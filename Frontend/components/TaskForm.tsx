"use client";

import { useState, useEffect } from "react";
import { Task } from "../types/task";

interface TaskFormProps {
    onSubmit: (task: {
        title: string;
        description: string;
        priority: string;
        due_date: string;
    }) => void;
    onCancel?: () => void;
    editTask?: Task | null;
    onUpdate?: (
        id: number,
        task: {
            title: string;
            description: string;
            priority: string;
            due_date: string;
            status: string;
        }
    ) => void;
}

const defaultForm = {
    title: "",
    description: "",
    priority: "Medium",
    due_date: "",
};

export default function TaskForm({
    onSubmit,
    onCancel,
    editTask,
    onUpdate,
}: TaskFormProps) {
    const [form, setForm] = useState(defaultForm);
    const [errors, setErrors] = useState<Record<string, string>>({});

    useEffect(() => {
        if (editTask) {
            setForm({
                title: editTask.title,
                description: editTask.description,
                priority: editTask.priority,
                due_date: editTask.due_date?.slice(0, 10) ?? "",
            });
        } else {
            setForm(defaultForm);
        }
        setErrors({});
    }, [editTask]);

    const validate = () => {
        const newErrors: Record<string, string> = {};
        if (!form.title.trim()) newErrors.title = "Title is required.";
        if (!form.description.trim()) {
            newErrors.description = "Description is required.";
        } else if (form.description.trim().length < 20) {
            newErrors.description = "Description must be at least 20 characters.";
        }
        if (!form.due_date) newErrors.due_date = "Due date is required.";
        return newErrors;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        if (editTask && onUpdate) {
            onUpdate(editTask.id, { ...form, status: editTask.status });
        } else {
            onSubmit(form);
        }
        setForm(defaultForm);
        setErrors({});
    };

    return (
        <div className="bg-white border border-gray-200 rounded p-5 mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
                {editTask ? "Edit Task" : "Add New Task"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Title */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Title
                    </label>
                    <input
                        type="text"
                        value={form.title}
                        onChange={(e) => setForm({ ...form, title: e.target.value })}
                        placeholder="Task title"
                        className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                    />
                    {errors.title && (
                        <p className="text-red-500 text-xs mt-1">{errors.title}</p>
                    )}
                </div>

                {/* Description */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Description
                    </label>
                    <textarea
                        value={form.description}
                        onChange={(e) => setForm({ ...form, description: e.target.value })}
                        placeholder="Task description (min 20 chars to mark complete)"
                        rows={3}
                        className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500 resize-none"
                    />
                    <p className="text-gray-400 text-xs mt-1">
                        {form.description.length} characters
                    </p>
                    {errors.description && (
                        <p className="text-red-500 text-xs mt-1">{errors.description}</p>
                    )}
                </div>

                {/* Priority & Due Date */}
                <div className="flex gap-4">
                    <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Priority
                        </label>
                        <select
                            value={form.priority}
                            onChange={(e) => setForm({ ...form, priority: e.target.value })}
                            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500 bg-white"
                        >
                            <option value="High">High</option>
                            <option value="Medium">Medium</option>
                            <option value="Low">Low</option>
                        </select>
                    </div>
                    <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Due Date
                        </label>
                        <input
                            type="date"
                            value={form.due_date}
                            onChange={(e) => setForm({ ...form, due_date: e.target.value })}
                            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                        />
                        {errors.due_date && (
                            <p className="text-red-500 text-xs mt-1">{errors.due_date}</p>
                        )}
                    </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-3 pt-1">
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded text-sm font-medium hover:bg-blue-700 transition-colors"
                    >
                        {editTask ? "Update Task" : "Add Task"}
                    </button>
                    {onCancel && (
                        <button
                            type="button"
                            onClick={onCancel}
                            className="bg-gray-100 text-gray-700 px-4 py-2 rounded text-sm font-medium hover:bg-gray-200 transition-colors"
                        >
                            Cancel
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
}
