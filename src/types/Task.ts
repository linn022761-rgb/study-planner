export type Task = {
  id: number;
  title: string;
  subject: string;
  dueDate: string;
  priority: "Low" | "Medium" | "High";
  completed: boolean;
};