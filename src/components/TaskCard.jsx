import React from 'react';
import { Edit, Trash2, MoreVertical } from 'lucide-react';

const statusLabels = {
  todo: 'To do',
  'in-progress': 'In progress',
  completed: 'Completed'
};

const priorityLabels = {
  low: 'Low',
  medium: 'Medium',
  high: 'High'
};

export default function TaskCard({
  task,
  onEdit,
  onDelete,
  onStatusChange,
  isMobile = false
}) {
  const statusClass = `status-badge ${task.status}`;
  const priorityClass = `priority-badge ${task.priority}`;

  if (isMobile) {
    return (
      <article className="task-row" role="listitem" aria-label={`${task.title}, ${statusLabels[task.status]}, ${priorityLabels[task.priority]} priority`}>
        <div className="task-row-header">
          <span>Task</span>
          <span>Category</span>
          <span>Status</span>
          <span>Priority</span>
          <span>Due Date</span>
          <span>Actions</span>
        </div>

        <div className="task-cell task-title-cell">
          <div>
            <h3 className="task-title">{task.title}</h3>
            {task.description && <p className="task-desc">{task.description}</p>}
            <span className="task-category">{task.category}</span>
          </div>
        </div>

        <div className="task-cell">
          <span className="task-cell-label">Status</span>
          <select
            className={`form-select ${statusClass}`}
            value={task.status}
            onChange={(e) => onStatusChange(task.id, e.target.value)}
            aria-label={`Change status for ${task.title}`}
          >
            <option value="todo">To do</option>
            <option value="in-progress">In progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div className="task-cell">
          <span className="task-cell-label">Priority</span>
          <span className={priorityClass}>{priorityLabels[task.priority]}</span>
        </div>

        <div className="task-cell">
          <span className="task-cell-label">Due</span>
          <time className="due-date" dateTime={task.dueDate}>
            {new Date(task.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
          </time>
        </div>

        <div className="task-cell task-actions">
          <span className="task-cell-label">Actions</span>
          <div className="task-actions">
            <button
              className="action-btn"
              onClick={() => onEdit(task)}
              aria-label={`Edit ${task.title}`}
            >
              <Edit size={16} strokeWidth={2} aria-hidden="true" />
            </button>
            <button
              className="action-btn delete"
              onClick={() => onDelete(task.id)}
              aria-label={`Delete ${task.title}`}
            >
              <Trash2 size={16} strokeWidth={2} aria-hidden="true" />
            </button>
          </div>
        </div>
      </article>
    );
  }

  // Desktop layout
  return (
    <div className="task-row" role="listitem" aria-label={`${task.title}, ${statusLabels[task.status]}, ${priorityLabels[task.priority]} priority`}>
      <div className="task-cell task-title-cell">
        <h3 className="task-title">{task.title}</h3>
        {task.description && <p className="task-desc">{task.description}</p>}
      </div>
      <div className="task-cell">
        <span className="task-category">{task.category}</span>
      </div>
      <div className="task-cell">
        <span className={statusClass}>{statusLabels[task.status]}</span>
      </div>
      <div className="task-cell">
        <span className={priorityClass}>{priorityLabels[task.priority]}</span>
      </div>
      <div className="task-cell">
        <time className="due-date" dateTime={task.dueDate}>
          {new Date(task.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
        </time>
      </div>
      <div className="task-cell task-actions">
        <button
          className="action-btn"
          onClick={() => onEdit(task)}
          aria-label={`Edit ${task.title}`}
        >
          <Edit size={16} strokeWidth={2} aria-hidden="true" />
        </button>
        <button
          className="action-btn delete"
          onClick={() => onDelete(task.id)}
          aria-label={`Delete ${task.title}`}
        >
          <Trash2 size={16} strokeWidth={2} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}