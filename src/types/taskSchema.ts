
import { z } from "zod";

export const taskSchema = z.object({
  title: z.string().trim().min(1, "Task title is required"),
  subject: z.string().trim().min(1, "Subject is required"),
  dueDate: z.string().min(1, "Please select a due date"),
  priority: z.enum(["Low", "Medium", "High"]),
});

export type TaskFormData = z.infer<typeof taskSchema>;
