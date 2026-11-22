import React from 'react';
import { X } from 'lucide-react';
import { categories, statusOptions, priorityOptions } from '../data/sampleTasks';

export default function TaskForm({
  initialData,
  onSubmit,
  onCancel,
  isEditing = false
}) {
  const [formData, setFormData] = React.useState({
    title: '',
    description: '',
    category: 'Design',
    status: 'todo',
    priority: 'medium',
    dueDate: new Date().toISOString().split('T')[0]
  });

  const [errors, setErrors] = React.useState({});
  const [touched, setTouched] = React.useState({});

  // Initialize form with data when editing
  React.useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        description: initialData.description || '',
        category: initialData.category || 'Design',
        status: initialData.status || 'todo',
        priority: initialData.priority || 'medium',
        dueDate: initialData.dueDate || new Date().toISOString().split('T')[0]
      });
      setErrors({});
      setTouched({});
    }
  }, [initialData, isEditing]);

  const validateField = (name, value) => {
    switch (name) {
      case 'title':
        if (!value.trim()) return 'Title is required';
        if (value.trim().length < 2) return 'Title must be at least 2 characters';
        return '';
      case 'category':
        if (!value) return 'Category is required';
        return '';
      case 'status':
        if (!value) return 'Status is required';
        return '';
      case 'priority':
        if (!value) return 'Priority is required';
        return '';
      case 'dueDate':
        if (!value) return 'Due date is required';
        return '';
      default:
        return '';
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Validate on change if field was touched
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate all fields
    const newErrors = {};
    let hasErrors = false;

    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) {
        newErrors[key] = error;
        hasErrors = true;
      }
    });

    setErrors(newErrors);
    setTouched({
      title: true,
      description: true,
      category: true,
      status: true,
      priority: true,
      dueDate: true
    });

    if (!hasErrors) {
      // Generate unique ID for new tasks
      const taskData = {
        ...formData,
        title: formData.title.trim(),
        id: initialData?.id || Date.now()
      };
      onSubmit(taskData);
    }
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <form onSubmit={handleSubmit} className="modal-body" noValidate>
      <div className="form-group">
        <label htmlFor="title" className="form-label">
          Title <span aria-hidden="true">*</span>
        </label>
        <input
          type="text"
          id="title"
          name="title"
          className={`form-input ${errors.title && touched.title ? 'error' : ''}`}
          value={formData.title}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Enter task title"
          aria-required="true"
          aria-invalid={errors.title && touched.title ? 'true' : 'false'}
          aria-describedby={errors.title && touched.title ? 'title-error' : undefined}
          autoFocus
        />
        {errors.title && touched.title && (
          <span id="title-error" className="form-error" role="alert">{errors.title}</span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="description" className="form-label">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          className="form-textarea"
          value={formData.description}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Add a description (optional)"
          rows={4}
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="category" className="form-label">
            Category <span aria-hidden="true">*</span>
          </label>
          <select
            id="category"
            name="category"
            className={`form-select ${errors.category && touched.category ? 'error' : ''}`}
            value={formData.category}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-required="true"
            aria-invalid={errors.category && touched.category ? 'true' : 'false'}
            aria-describedby={errors.category && touched.category ? 'category-error' : undefined}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          {errors.category && touched.category && (
            <span id="category-error" className="form-error" role="alert">{errors.category}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="status" className="form-label">
            Status <span aria-hidden="true">*</span>
          </label>
          <select
            id="status"
            name="status"
            className={`form-select ${errors.status && touched.status ? 'error' : ''}`}
            value={formData.status}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-required="true"
            aria-invalid={errors.status && touched.status ? 'true' : 'false'}
            aria-describedby={errors.status && touched.status ? 'status-error' : undefined}
          >
            {statusOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          {errors.status && touched.status && (
            <span id="status-error" className="form-error" role="alert">{errors.status}</span>
          )}
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="priority" className="form-label">
            Priority <span aria-hidden="true">*</span>
          </label>
          <select
            id="priority"
            name="priority"
            className={`form-select ${errors.priority && touched.priority ? 'error' : ''}`}
            value={formData.priority}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-required="true"
            aria-invalid={errors.priority && touched.priority ? 'true' : 'false'}
            aria-describedby={errors.priority && touched.priority ? 'priority-error' : undefined}
          >
            {priorityOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          {errors.priority && touched.priority && (
            <span id="priority-error" className="form-error" role="alert">{errors.priority}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="dueDate" className="form-label">
            Due Date <span aria-hidden="true">*</span>
          </label>
          <input
            type="date"
            id="dueDate"
            name="dueDate"
            className={`form-input ${errors.dueDate && touched.dueDate ? 'error' : ''}`}
            value={formData.dueDate}
            onChange={handleChange}
            onBlur={handleBlur}
            min={new Date().toISOString().split('T')[0]}
            aria-required="true"
            aria-invalid={errors.dueDate && touched.dueDate ? 'true' : 'false'}
            aria-describedby={errors.dueDate && touched.dueDate ? 'dueDate-error' : undefined}
          />
          {errors.dueDate && touched.dueDate && (
            <span id="dueDate-error" className="form-error" role="alert">{errors.dueDate}</span>
          )}
        </div>
      </div>

      <div className="modal-footer">
        <button
          type="button"
          className="btn btn-secondary"
          onClick={handleCancel}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="btn btn-primary"
        >
          {isEditing ? 'Update Task' : 'Create Task'}
        </button>
      </div>
    </form>
  );
}