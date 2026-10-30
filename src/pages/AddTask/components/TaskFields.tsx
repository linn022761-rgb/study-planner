import type { UseFormRegister, Control, FieldErrors } from "react-hook-form";
import type { TaskFormData } from "@/pages/Tasks/taskSchema";
import { Controller } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type TaskFieldsProps = {
  register: UseFormRegister<TaskFormData>;
  control: Control<TaskFormData>;
  errors: FieldErrors<TaskFormData>;
  minDueDate: string;
};
export default function TaskFields({
  register,
  control,
  errors,
  minDueDate,
}: TaskFieldsProps) {
  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor="title">Task title</Label>
        <Input
          id="title"
          placeholder="e.g. Learn React Hooks"
          aria-invalid={!!errors.title}
          {...register("title")}
        />
        {errors.title && (
          <p className="text-sm text-destructive">{errors.title.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="subject">Subject</Label>
        <Input
          id="subject"
          placeholder="e.g. Web Development"
          aria-invalid={!!errors.subject}
          {...register("subject")}
        />
        {errors.subject && (
          <p className="text-sm text-destructive">{errors.subject.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="dueDate">Due date</Label>
        <Input
          id="dueDate"
          type="date"
          min={minDueDate}
          aria-invalid={!!errors.dueDate}
          {...register("dueDate")}
        />
        {errors.dueDate && (
          <p className="text-sm text-destructive">{errors.dueDate.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label>Priority</Label>
        <Controller
          name="priority"
          control={control}
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Choose priority" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="Low">Low</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="High">High</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
        {errors.priority && (
          <p className="text-sm text-destructive">{errors.priority.message}</p>
        )}
      </div>
    </div>
  );
}
