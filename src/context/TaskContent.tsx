
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import type { Task } from "../types/Task";

type NewTask = Omit<Task, "id" | "completed">;

type TaskContextType = {
  tasks: Task[];
  addTask: (newTask: NewTask) => void;
  toggleTask: (id: number) => void;
  deleteTask: (id: number) => void;
  updateTask: (id: number, newTitle: string) => void;
};

const TaskContext = createContext<TaskContextType | undefined>(
  undefined
);

const STORAGE_KEY = "light-study-planner-tasks";

const initialTasks: Task[] = [
  {
    id: 1,
    title: "Learn React",
    subject: "Web Development",
    dueDate: "2026-10-20",
    priority: "High",
    completed: false,
  },
  {
    id: 2,
    title: "Study Database",
    subject: "DBMS",
    dueDate: "2026-10-22",
    priority: "Medium",
    completed: true,
  },
];

function getInitialTasks(): Task[] {
  try {
    const savedTasks = localStorage.getItem(STORAGE_KEY);

    if (savedTasks !== null) {
      const parsedTasks: unknown = JSON.parse(savedTasks);

      if (Array.isArray(parsedTasks)) {
        return parsedTasks as Task[];
      }
    }
  } catch (error) {
    console.error("Could not load saved tasks:", error);
  }

  return initialTasks;
}

export function TaskProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [tasks, setTasks] = useState<Task[]>(getInitialTasks);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (error) {
      console.error("Could not save tasks:", error);
    }
  }, [tasks]);

  function addTask(newTask: NewTask) {
    const task: Task = {
      ...newTask,
      id: Date.now(),
      completed: false,
    };

    setTasks((previousTasks) => [...previousTasks, task]);
  }

  function toggleTask(id: number) {
    setTasks((previousTasks) =>
      previousTasks.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  }

  function deleteTask(id: number) {
    setTasks((previousTasks) =>
      previousTasks.filter((task) => task.id !== id)
    );
  }

  function updateTask(id: number, newTitle: string) {
    setTasks((previousTasks) =>
      previousTasks.map((task) =>
        task.id === id
          ? { ...task, title: newTitle }
          : task
      )
    );
  }

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        toggleTask,
        deleteTask,
        updateTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export function useTaskContext() {
  const context = useContext(TaskContext);

  if (!context) {
    throw new Error(
      "useTaskContext must be used inside TaskProvider"
    );
  }

  return context;
}
