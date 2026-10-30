import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlus} from "react-icons/fa";

import SummaryCards from "./components/SummaryCards";
import StudyProgress from "./components/StudyProgress";
import UpcomingDeadlines from "./components/UpcomingDeadlines";

import { useTaskContext } from "../../context/TaskContent";

import { Button } from "@/components/ui/button";

import { getLocalDateString } from "./uitls/getLocalDateString";


export default function Dashboard() {
  const { tasks } = useTaskContext();
  const navigate = useNavigate();

  const today = getLocalDateString(new Date());

  const stats = useMemo(() => {
    const completed = tasks.filter((task) => task.completed).length;
    const pending = tasks.filter((task) => !task.completed).length;
    const overdue = tasks.filter(
      (task) => !task.completed && task.dueDate < today,
    ).length;

    const completionRate =
      tasks.length === 0 ? 0 : Math.round((completed / tasks.length) * 100);

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
      .filter((task) => !task.completed && task.dueDate >= today)
      .sort((a, b) => a.dueDate.localeCompare(b.dueDate))
      .slice(0, 5);
  }, [tasks, today]);

  return (
    <section className="mx-auto max-w-6xl space-y-8">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm font-medium text-primary">
            YOUR LEARNING OVERVIEW
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="mt-2 text-muted-foreground">
            Keep track of your progress and upcoming study tasks.
          </p>
        </div>

        <Button onClick={() => navigate("/add-task")}>
          <FaPlus className="mr-2" />
          Add New Task
        </Button>
      </div>

      <SummaryCards stats={stats} />
      <StudyProgress stats={stats} />
      <UpcomingDeadlines upcomingTasks={upcomingTasks} />
    </section>
  );
}
