
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaTasks,
  FaCheckCircle,
  FaClock,
  FaExclamationTriangle,
  FaPlus,
  FaArrowRight,
} from "react-icons/fa";

import { useTaskContext } from "../context/TaskContent";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

function getLocalDateString(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export default function Dashboard() {
  const { tasks } = useTaskContext();
  const navigate = useNavigate();

  const today = getLocalDateString(new Date());

  const stats = useMemo(() => {
    const completed = tasks.filter((task) => task.completed).length;
    const pending = tasks.filter((task) => !task.completed).length;
    const overdue = tasks.filter(
      (task) => !task.completed && task.dueDate < today
    ).length;

    const completionRate =
      tasks.length === 0
        ? 0
        : Math.round((completed / tasks.length) * 100);

    return {
      total: tasks.length,
      completed,
      pending,
      overdue,
      completionRate,
    };
  }, [tasks, today]);

  const upcomingTasks = useMemo(() => {
    return tasks
      .filter(
        (task) =>
          !task.completed &&
          task.dueDate >= today
      )
      .sort((a, b) => a.dueDate.localeCompare(b.dueDate))
      .slice(0, 5);
  }, [tasks, today]);

  const summaryCards = [
    {
      title: "Total Tasks",
      value: stats.total,
      icon: FaTasks,
      description: "All your study tasks",
    },
    {
      title: "Completed",
      value: stats.completed,
      icon: FaCheckCircle,
      description: "Tasks you have finished",
    },
    {
      title: "Pending",
      value: stats.pending,
      icon: FaClock,
      description: "Tasks still to do",
    },
    {
      title: "Overdue",
      value: stats.overdue,
      icon: FaExclamationTriangle,
      description: "Tasks past their due date",
    },
  ];

  return (
    <section className="mx-auto max-w-6xl space-y-8">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm font-medium text-primary">
            YOUR LEARNING OVERVIEW
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight">
            Dashboard
          </h1>
          <p className="mt-2 text-muted-foreground">
            Keep track of your progress and upcoming study tasks.
          </p>
        </div>

        <Button onClick={() => navigate("/add-task")}>
          <FaPlus className="mr-2" />
          Add New Task
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {summaryCards.map((item) => {
          const Icon = item.icon;

          return (
            <Card key={item.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {item.title}
                </CardTitle>
                <Icon className="text-muted-foreground" />
              </CardHeader>

              <CardContent>
                <p className="text-3xl font-bold">{item.value}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {item.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between gap-3">
            <CardTitle>Study Progress</CardTitle>
            <Badge variant="secondary">
              {stats.completionRate}% completed
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="h-3 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-primary transition-all duration-500"
              style={{ width: `${stats.completionRate}%` }}
            />
          </div>

          <div className="flex flex-wrap justify-between gap-2 text-sm text-muted-foreground">
            <span>
              {stats.completed} of {stats.total} tasks completed
            </span>
            <span>{stats.pending} remaining</span>
          </div>

          {stats.total === 0 && (
            <p className="text-sm text-muted-foreground">
              Add your first task to start tracking your progress.
            </p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <div>
              <CardTitle>Upcoming Deadlines</CardTitle>
              <p className="mt-1 text-sm text-muted-foreground">
                Your next five unfinished tasks.
              </p>
            </div>

            <Button
              variant="outline"
              onClick={() => navigate("/tasks")}
            >
              View All Tasks
              <FaArrowRight className="ml-2" />
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          {upcomingTasks.length === 0 ? (
            <div className="py-8 text-center">
              <p className="font-medium">No upcoming tasks</p>
              <p className="mt-2 text-sm text-muted-foreground">
                You can add a new task whenever you are ready.
              </p>
              <Button
                className="mt-4"
                variant="outline"
                onClick={() => navigate("/add-task")}
              >
                <FaPlus className="mr-2" />
                Add a Task
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              {upcomingTasks.map((task) => (
                <div
                  key={task.id}
                  className="flex flex-col justify-between gap-3 rounded-lg border p-4 sm:flex-row sm:items-center"
                >
                  <div className="min-w-0">
                    <p className="font-medium">{task.title}</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {task.subject}
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Due: {task.dueDate}
                    </p>
                  </div>

                  <Badge
                    variant="outline"
                    className={
                      task.priority === "High"
                        ? "border-red-200 bg-red-50 text-red-700"
                        : task.priority === "Medium"
                          ? "border-amber-200 bg-amber-50 text-amber-700"
                          : "border-green-200 bg-green-50 text-green-700"
                    }
                  >
                    {task.priority} Priority
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </section>
  );
}
