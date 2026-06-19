export interface Task {
  id: number;
  title: string;
  description: string;
  priority: "High" | "Medium" | "Low";
  due_date: string;
  status: "Pending" | "Completed";
}