import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type StudyProgressProps ={
     stats: {
    total: number;
    completed: number;
    pending: number;
    overdue: number;
    completionRate: number;
  };
}

export default function StudyProgress({stats}:StudyProgressProps){
    return(
        <>
        <Card>
        <CardHeader>
          <div className="flex items-center justify-between gap-3">
            <CardTitle>Study Progress</CardTitle>
            <Badge variant="secondary">{stats.completionRate}% completed</Badge>
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
        </>
    )
}