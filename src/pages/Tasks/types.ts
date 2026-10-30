import type{Task} from "@/types/Task"

export type StatusFilter = "All" | "Pending" | "Completed";
export type PriorityFilter = "All" | Task["priority"];