
import type { Task } from "@/types/Task";

export function isTaskOverdue(task: Task): boolean {
  const today = new Date();

  const localToday = `${today.getFullYear()}-${String(
    today.getMonth() + 1
  ).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

  return !task.completed && task.dueDate < localToday;
}
