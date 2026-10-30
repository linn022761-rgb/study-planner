import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import type { StatusFilter, PriorityFilter } from "../types";

type TaskFiltersProps = {
  search: string;
  setSearch: (value: string) => void;
  statusFilter: StatusFilter;
  setStatusFilter: (value: StatusFilter) => void;
  priorityFilter: PriorityFilter;
  setPriorityFilter: (value: PriorityFilter) => void;
  onClear: () => void;
};

export default function TaskFilters({
  search,
  setSearch,
  statusFilter,
  setStatusFilter,
  priorityFilter,
  setPriorityFilter,
  onClear,
}:TaskFiltersProps) {
  return (
    <div className="space-y-4">
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
        onClick={onClear}
      >
        Clear filters
      </Button>
    </div>
  );
}
