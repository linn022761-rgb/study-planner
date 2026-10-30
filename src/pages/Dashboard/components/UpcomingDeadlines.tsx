import { useNavigate } from "react-router-dom";
import type { Task } from "@/types/Task";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getPriorityClass } from "@/lib/priorityUtils";

import { FaPlus, FaArrowRight } from "react-icons/fa";
import { Button } from "@/components/ui/button";

type UpcomingDeadlinesProps = {
  upcomingTasks: Task[];
};
export default function UpcomingDeadlines({
  upcomingTasks
}: UpcomingDeadlinesProps) {
  const navigate = useNavigate();
  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <div>
              <CardTitle>Upcoming Deadlines</CardTitle>
              <p className="mt-1 text-sm text-muted-foreground">
                Your next five unfinished tasks.
              </p>
            </div>

            <Button variant="outline" onClick={() => navigate("/tasks")}>
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
                    className={getPriorityClass(task.priority)}
                  >
                    {task.priority} Priority
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
}
