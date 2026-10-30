export type Task = {
  id: number;
  title: string;
  subject: string;
  dueDate: string;
  priority: Priority;
  completed: boolean;
};

export type Priority = "Low" | "Medium" | "High";

export const Priority = {
  High : "High",
  Medium : "Medium",
  Low : "Low",
}as const;