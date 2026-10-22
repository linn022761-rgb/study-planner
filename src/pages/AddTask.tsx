import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";

import { taskSchema, type TaskFormData } from "../types/taskSchema";
import { useTaskContext } from "../context/TaskContent";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";



function getTodayDateString() {
  const today = new Date();

  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}



export default function AddTask() {
  const { addTask } = useTaskContext();
  const navigate = useNavigate();
  const minDueDate = getTodayDateString();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: "",
      subject: "",
      dueDate: "",
      priority: "Medium",
    },
  });

  function onSubmit(data: TaskFormData) {
    addTask(data);
    reset();
    navigate("/tasks");
  }

  return (
    <section className="mx-auto max-w-2xl">
      <div className="mb-6">
        <p className="text-sm font-medium text-primary">PLAN YOUR LEARNING</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight">Add New Task</h1>
        <p className="mt-2 text-muted-foreground">
          Organise your study tasks and keep track of deadlines.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Task Details</CardTitle>
          <CardDescription>
            Fill in the information for your new study task.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="title">Task title</Label>
              <Input
                id="title"
                placeholder="e.g. Learn React Hooks"
                aria-invalid={!!errors.title}
                {...register("title")}
              />
              {errors.title && (
                <p className="text-sm text-destructive">
                  {errors.title.message}
                </p>
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
                <p className="text-sm text-destructive">
                  {errors.subject.message}
                </p>
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
                <p className="text-sm text-destructive">
                  {errors.dueDate.message}
                </p>
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
                <p className="text-sm text-destructive">
                  {errors.priority.message}
                </p>
              )}
            </div>

            <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/tasks")}
              >
                Cancel
              </Button>
              <Button type="submit">Create Task</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </section>
  );
}
