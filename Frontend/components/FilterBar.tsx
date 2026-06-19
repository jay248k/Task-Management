"use client";

interface FilterBarProps {
  priorityFilter: string;
  statusFilter: string;
  onPriorityChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onClearFilters: () => void;
}

export default function FilterBar({
  priorityFilter,
  statusFilter,
  onPriorityChange,
  onStatusChange,
  onClearFilters,
}: FilterBarProps) {
  const hasFilter = priorityFilter !== "All" || statusFilter !== "All";

  return (
    <div className="flex flex-wrap items-center gap-3 mb-5 bg-gray-50 border border-gray-200 rounded p-3">
      <span className="text-sm font-medium text-gray-600">Filter by:</span>

      {/* Priority filter */}
      <div className="flex items-center gap-1.5">
        <label className="text-xs text-gray-500">Priority</label>
        <select
          value={priorityFilter}
          onChange={(e) => onPriorityChange(e.target.value)}
          className="border border-gray-300 rounded px-2 py-1 text-sm bg-white focus:outline-none focus:border-blue-500"
        >
          <option value="All">All</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </div>

      {/* Status filter */}
      <div className="flex items-center gap-1.5">
        <label className="text-xs text-gray-500">Status</label>
        <select
          value={statusFilter}
          onChange={(e) => onStatusChange(e.target.value)}
          className="border border-gray-300 rounded px-2 py-1 text-sm bg-white focus:outline-none focus:border-blue-500"
        >
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      {/* Clear button */}
      {hasFilter && (
        <button
          onClick={onClearFilters}
            className="ml-3 px-3 py-1.5 bg-blue-600 text-white text-sm font-medium rounded-md shadow-sm hover:bg-blue-700 transition-colors duration-200"

        >
          Clear filters
        </button>
      )}
    </div>
  );
}
