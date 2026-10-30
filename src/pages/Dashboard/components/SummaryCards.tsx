import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  FaTasks,
  FaCheckCircle,
  FaClock,
  FaExclamationTriangle,
} from "react-icons/fa";

type StudyProgressProps = {
  stats: {
    total: number;
    completed: number;
    pending: number;
    overdue: number;
    completionRate: number;
  };
};

export default function SummaryCards({ stats }:StudyProgressProps) {
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
    <>
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
    </>
  );
}
