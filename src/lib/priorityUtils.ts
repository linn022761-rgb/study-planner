import { Priority } from "@/types/Task";

export function getPriorityClass(
  priority: Priority
) {
  if (priority === Priority.High) {
    return "border-red-200 bg-red-50 text-red-700";
  }

  if (priority === Priority.Medium) {
    return "border-amber-200 bg-amber-50 text-amber-700";
  }

  return "border-green-200 bg-green-50 text-green-700";
}