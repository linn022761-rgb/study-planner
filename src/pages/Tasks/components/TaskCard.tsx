
import { useState } from "react";
import { FaEdit, FaTrash, FaSave, FaTimes } from "react-icons/fa";

import type { Task } from "@/types/Task";
import { getPriorityClass } from "@/lib/priorityUtils";
import { isTaskOverdue } from "../utils/isTaskOverdue";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

type TaskCardProps = {
  task: Task;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onUpdate: (id: number, title: string) => void;
};

export default function TaskCard({
  task,
  onToggle,
  onDelete,
  onUpdate,
}: TaskCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);

  function handleEdit() {
    setEditTitle(task.title);
    setIsEditing(true);
  }

  function handleUpdate() {
    const title = editTitle.trim();

    if (!title) return;

    onUpdate(task.id, title);
    setIsEditing(false);
  }

  function handleCancel() {
    setEditTitle(task.title);
    setIsEditing(false);
  }

  function handleDelete() {
    if (window.confirm(`Delete "${task.title}"?`)) {
      onDelete(task.id);
    }
  }

  return (
    <Card>
      <CardContent className="flex flex-col gap-4 pt-4 sm:flex-row sm:items-start">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
          className="mt-1 h-4 w-4 accent-primary"
          aria-label={`Mark ${task.title} as completed`}
        />

        <div className="min-w-0 flex-1 space-y-2">
          {isEditing ? (
            <div className="flex flex-col gap-2 sm:flex-row">
              <Input
                value={editTitle}
                onChange={(event) => setEditTitle(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    handleUpdate();
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
                onClick={handleUpdate}
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
                task.completed
                  ? "text-muted-foreground line-through"
                  : ""
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

            {isTaskOverdue(task) && (
              <Badge variant="destructive">Overdue</Badge>
            )}
          </div>
        </div>

        {!isEditing && (
          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={handleEdit}
              aria-label={`Edit ${task.title}`}
            >
              <FaEdit />
            </Button>

            <Button
              type="button"
              variant="destructive"
              size="icon"
              onClick={handleDelete}
              aria-label={`Delete ${task.title}`}
            >
              <FaTrash />
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
