
import { z } from "zod";

const meaningfulText = (fieldName: string) =>
  z
    .string()
    .trim()
    .min(1, `${fieldName} is required`)
    .refine((value) => !/^\d+$/.test(value), {
      message: `${fieldName} cannot contain only numbers`,
    });

function getLocalDateString(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export const taskSchema = z.object({
  title: meaningfulText("Task title"),
  subject: meaningfulText("Subject"),

  dueDate: z
    .string()
    .min(1, "Please select a due date")
    .refine(
      (date) => {
        if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return false;

        const parsed = new Date(`${date}T00:00:00`);

        if (
          Number.isNaN(parsed.getTime()) ||
          getLocalDateString(parsed) !== date
        ) {
          return false;
        }

        return date >= getLocalDateString(new Date());
      },
      {
        message: "Due date must be today or a future date",
      }
    ),

  priority: z.enum(["Low", "Medium", "High"]),
});

export type TaskFormData = z.infer<typeof taskSchema>;
