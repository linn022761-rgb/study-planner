import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";

import { taskSchema, type TaskFormData } from "../Tasks/taskSchema";
import { useTaskContext } from "../../context/TaskContent";
import { getTodayDateString } from "./utils/getTodayDateString";
import TaskFields from "./components/TaskFields";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
            <TaskFields
              register={register}
              control={control}
              errors={errors}
              minDueDate={minDueDate}
            />

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
