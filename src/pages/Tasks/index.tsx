import { useMemo, useState } from "react";

import { useTaskContext } from "../../context/TaskContent";

import TaskFilters from "./components/TaskFilters";
import TaskList from "./components/TaskList";

import type { StatusFilter, PriorityFilter } from "./types";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Tasks() {
  const { tasks, toggleTask, deleteTask, updateTask } = useTaskContext();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("All");
  const [priorityFilter, setPriorityFilter] = useState<PriorityFilter>("All");

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const searchText = search.trim().toLowerCase();

      const matchesSearch =
        task.title.toLowerCase().includes(searchText) ||
        task.subject.toLowerCase().includes(searchText);

      const matchesStatus =
        statusFilter === "All" ||
        (statusFilter === "Completed" && task.completed) ||
        (statusFilter === "Pending" && !task.completed);

      const matchesPriority =
        priorityFilter === "All" || task.priority === priorityFilter;

      return matchesSearch && matchesStatus && matchesPriority;
    });
  }, [tasks, search, statusFilter, priorityFilter]);

  function clearFilters() {
    setSearch("");
    setStatusFilter("All");
    setPriorityFilter("All");
  }

  return (
    <section className="mx-auto max-w-5xl space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-medium text-primary">STAY ORGANIZED</p>
          <h1 className="mt-1 text-3xl font-bold tracking-tight">My Tasks</h1>
          <p className="mt-2 text-muted-foreground">
            Manage your study tasks in one place.
          </p>
        </div>

        <Badge variant="secondary" className="w-fit px-3 py-1">
          {filteredTasks.length} of {tasks.length} tasks
        </Badge>
      </div>

      <Card>
        <CardContent className="space-y-4 pt-4">
          <TaskFilters
            search={search}
            setSearch={setSearch}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            priorityFilter={priorityFilter}
            setPriorityFilter={setPriorityFilter}
            onClear={clearFilters}
          />
        </CardContent>
      </Card>
      <TaskList
        tasks={filteredTasks}
        onToggle={toggleTask}
        onDelete={deleteTask}
        onUpdate={updateTask}
        onClearFilters={clearFilters}
      />
    </section>
  );
}
