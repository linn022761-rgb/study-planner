
import type { Task } from "@/types/Task";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import TaskCard from "./TaskCard";

type TaskListProps = {
  tasks: Task[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onUpdate: (id: number, title: string) => void;
  onClearFilters: () => void;
};

export default function TaskList({
  tasks,
  onToggle,
  onDelete,
  onUpdate,
  onClearFilters,
}: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center gap-2 py-12 text-center">
          <h2 className="text-lg font-semibold">No tasks found</h2>

          <p className="text-sm text-muted-foreground">
            Try changing your search or filters.
          </p>

          <Button
            type="button"
            variant="outline"
            onClick={onClearFilters}
          >
            Clear filters
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}
    </div>
  );
}
