import React from 'react';

const statusTabs = [
  { value: 'all', label: 'All' },
  { value: 'todo', label: 'To do' },
  { value: 'in-progress', label: 'In progress' },
  { value: 'completed', label: 'Completed' }
];

const priorityOptions = [
  { value: 'all', label: 'All priorities' },
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' }
];

export default function FilterTabs({ statusFilter, onStatusChange, priorityFilter, onPriorityChange }) {
  return (
    <div className="filter-group" role="group" aria-label="Task filters">
      <div className="filter-tabs" role="tablist" aria-label="Status filters">
        {statusTabs.map((tab) => (
          <button
            key={tab.value}
            className={`filter-tab ${statusFilter === tab.value ? 'active' : ''}`}
            onClick={() => onStatusChange(tab.value)}
            role="tab"
            aria-selected={statusFilter === tab.value}
            aria-controls={`status-panel-${tab.value}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <select
        className="priority-select"
        value={priorityFilter}
        onChange={(e) => onPriorityChange(e.target.value)}
        aria-label="Filter by priority"
      >
        {priorityOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}