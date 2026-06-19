import axios from "axios";

const API = axios.create({
  baseURL:`${process.env.NEXT_PUBLIC_API_URL}/api/tasks`,
});

// Get all tasks
export const getTasks = async () => {
  try {
    const response = await API.get("/");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch tasks:", error);
    throw error;
  }
};

// Create task
export const createTask = async (task: {
  title: string;
  description: string;
  priority: string;
  due_date: string;
}) => {
  try {
    const response = await API.post("/", task);
    return response.data;
  } catch (error) {
    console.error("Failed to create task:", error);
    throw error;
  }
};

// Update task
export const updateTask = async (
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
    const response = await API.put(`/${id}`, task);
    return response.data;
  } catch (error) {
    console.error("Failed to update task:", error);
    throw error;
  }
};

// Delete task
export const deleteTask = async (id: number) => {
  try {
    const response = await API.delete(`/${id}`);
    return response.data;
  } catch (error) {
    console.error("Failed to delete task:", error);
    throw error;
  }
};

// Mark task complete
export const markComplete = async (id: number) => {
  try {
    const response = await API.patch(`/${id}/complete`);
    return response.data;
  } catch (error) {
    console.error("Failed to mark task complete:", error);
    throw error;
  }
};