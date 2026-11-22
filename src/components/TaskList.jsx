import React from 'react';
import { ListChecks, Filter } from 'lucide-react';
import TaskCard from './TaskCard';

export default function TaskList({
  tasks,
  onEdit,
  onDelete,
  onStatusChange,
  isMobile = false
}) {
  if (tasks.length === 0) {
    return (
      <div className="empty-state" role="status" aria-live="polite">
        <ListChecks className="empty-icon" aria-hidden="true" size={64} strokeWidth={1.5} />
        <h3 className="empty-title">No tasks found</h3>
        <p className="empty-desc">
          {tasks.length === 0 && !isMobile
            ? 'Get started by creating your first task'
            : 'Try adjusting your search or filters'}
        </p>
      </div>
    );
  }

  return (
    <div className="task-list" role="list" aria-label="Task list">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onEdit={onEdit}
          onDelete={onDelete}
          onStatusChange={onStatusChange}
          isMobile={isMobile}
        />
      ))}
    </div>
  );
}