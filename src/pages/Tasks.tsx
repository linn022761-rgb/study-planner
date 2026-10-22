import { useMemo, useState } from "react";
import { FaEdit, FaTrash, FaSave, FaTimes } from "react-icons/fa";

import { useTaskContext } from "../context/TaskContent";
import type { Task } from "../types/Task";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type StatusFilter = "All" | "Pending" | "Completed";
type PriorityFilter = "All" | Task["priority"];

export default function Tasks() {
  const { tasks, toggleTask, deleteTask, updateTask } = useTaskContext();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("All");
  const [priorityFilter, setPriorityFilter] = useState<PriorityFilter>("All");

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState("");

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

  function handleEdit(task: Task) {
    setEditingId(task.id);
    setEditTitle(task.title);
  }

  function handleUpdate(id: number) {
    const title = editTitle.trim();

    if (!title) return;

    updateTask(id, title);
    setEditingId(null);
    setEditTitle("");
  }

  function handleCancel() {
    setEditingId(null);
    setEditTitle("");
  }

  function getPriorityClass(priority: Task["priority"]) {
    if (priority === "High") {
      return "border-red-200 bg-red-50 text-red-700";
    }

    if (priority === "Medium") {
      return "border-amber-200 bg-amber-50 text-amber-700";
    }

    return "border-green-200 bg-green-50 text-green-700";
  }

  function isOverdue(task: Task) {
    const today = new Date();
    const localToday = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

    return !task.completed && task.dueDate < localToday;
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
          <div className="space-y-2">
            <label htmlFor="task-search" className="text-sm font-medium">
              Search tasks
            </label>
            <Input
              id="task-search"
              placeholder="Search by task title or subject..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">Status</label>
              <Select
                value={statusFilter}
                onValueChange={(value) =>
                  setStatusFilter((value ?? "All") as StatusFilter)
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All statuses</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Priority</label>
              <Select
                value={priorityFilter}
                onValueChange={(value) =>
                  setPriorityFilter((value ?? "All") as PriorityFilter)
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Filter by priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All priorities</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button
            type="button"
            variant="outline"
            onClick={() => {
              setSearch("");
              setStatusFilter("All");
              setPriorityFilter("All");
            }}
          >
            Clear filters
          </Button>
        </CardContent>
      </Card>

      <div className="space-y-3">
        {filteredTasks.map((task) => (
          <Card key={task.id}>
            <CardContent className="flex flex-col gap-4 pt-4 sm:flex-row sm:items-start">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(task.id)}
                className="mt-1 h-4 w-4 accent-primary"
                aria-label={`Mark ${task.title} as completed`}
              />

              <div className="min-w-0 flex-1 space-y-2">
                {editingId === task.id ? (
                  <div className="flex flex-col gap-2 sm:flex-row">
                    <Input
                      value={editTitle}
                      onChange={(event) => setEditTitle(event.target.value)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter") {
                          handleUpdate(task.id);
                        }
                        if (event.key === "Escape") {
                          handleCancel();
                        }
                      }}
                      autoFocus
                      aria-label="Edit task title"
                    />

                    <Button
                      type="button"
                      size="icon"
                      onClick={() => handleUpdate(task.id)}
                      disabled={!editTitle.trim()}
                      aria-label="Save task"
                    >
                      <FaSave />
                    </Button>

                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={handleCancel}
                      aria-label="Cancel editing"
                    >
                      <FaTimes />
                    </Button>
                  </div>
                ) : (
                  <h2
                    className={`text-lg font-semibold ${
                      task.completed ? "text-muted-foreground line-through" : ""
                    }`}
                  >
                    {task.title}
                  </h2>
                )}

                <p className="text-sm text-muted-foreground">
                  Subject: {task.subject}
                </p>

                <p className="text-sm text-muted-foreground">
                  Due date: {task.dueDate}
                </p>

                <div className="flex flex-wrap gap-2">
                  <Badge className={getPriorityClass(task.priority)}>
                    {task.priority} Priority
                  </Badge>

                  <Badge variant={task.completed ? "secondary" : "outline"}>
                    {task.completed ? "Completed" : "Pending"}
                  </Badge>

                  {isOverdue(task) && (
                    <Badge variant="destructive">Overdue</Badge>
                  )}
                </div>
              </div>

              {editingId !== task.id && (
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => handleEdit(task)}
                    aria-label={`Edit ${task.title}`}
                  >
                    <FaEdit />
                  </Button>

                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    onClick={() => {
                      if (window.confirm(`Delete "${task.title}"?`)) {
                        deleteTask(task.id);
                      }
                    }}
                    aria-label={`Delete ${task.title}`}
                  >
                    <FaTrash />
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}

        {filteredTasks.length === 0 && (
          <Card>
            <CardContent className="flex flex-col items-center gap-2 py-12 text-center">
              <h2 className="text-lg font-semibold">No tasks found</h2>
              <p className="text-sm text-muted-foreground">
                Try changing your search or filters.
              </p>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setSearch("");
                  setStatusFilter("All");
                  setPriorityFilter("All");
                }}
              >
                Clear filters
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  );
}
