import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { Plus, LayoutDashboard, ListChecks, Calendar, Settings, HelpCircle } from 'lucide-react';
import { sampleTasks, statusOptions, priorityOptions } from './data/sampleTasks';
import { useTasks } from './hooks/useLocalStorage';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import StatCard from './components/StatCard';
import FocusNotes from './components/FocusNotes';
import SearchBar from './components/SearchBar';
import FilterTabs from './components/FilterTabs';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import ConfirmDialog from './components/ConfirmDialog';
import ToastContainer from './components/ToastContainer';

const statIcons = {
  total: LayoutDashboard,
  inProgress: ListChecks,
  completed: Calendar,
  completion: Settings
};

export default function App() {
  // State management
  const [tasks, setTasks, addTask, updateTask, deleteTask, updateTaskStatus] = useTasks(sampleTasks);
  const [activeNav, setActiveNav] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [toasts, setToasts] = useState([]);

  // Toast helpers
  const showToast = useCallback((message, type = 'info') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
  }, []);

  const dismissToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Computed statistics
  const stats = useMemo(() => {
    const total = tasks.length;
    const inProgress = tasks.filter((t) => t.status === 'in-progress').length;
    const completed = tasks.filter((t) => t.status === 'completed').length;
    const completion = total > 0 ? Math.round((completed / total) * 100) : 0;

    return { total, inProgress, completed, completion };
  }, [tasks]);

  // Filtered tasks
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      // Search filter
      const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase());

      // Status filter
      const matchesStatus = statusFilter === 'all' || task.status === statusFilter;

      // Priority filter
      const matchesPriority = priorityFilter === 'all' || task.priority === priorityFilter;

      return matchesSearch && matchesStatus && matchesPriority;
    });
  }, [tasks, searchQuery, statusFilter, priorityFilter]);

  // Handlers
  const handleCreateTask = useCallback((taskData) => {
    addTask(taskData);
    setIsFormOpen(false);
    showToast('Task created successfully', 'success');
  }, [addTask, showToast]);

  const handleUpdateTask = useCallback((taskData) => {
    updateTask(taskData.id, taskData);
    setIsFormOpen(false);
    setEditingTask(null);
    showToast('Task updated successfully', 'success');
  }, [updateTask, showToast]);

  const handleEditTask = useCallback((task) => {
    setEditingTask(task);
    setIsFormOpen(true);
  }, []);

  const handleDeleteTask = useCallback((id) => {
    setDeleteConfirm(id);
  }, []);

  const confirmDelete = useCallback(() => {
    if (deleteConfirm) {
      deleteTask(deleteConfirm);
      setDeleteConfirm(null);
      showToast('Task deleted', 'success');
    }
  }, [deleteConfirm, deleteTask, showToast]);

  const handleStatusChange = useCallback((id, status) => {
    updateTaskStatus(id, status);
    showToast('Status updated', 'info');
  }, [updateTaskStatus, showToast]);

  const handleSearchChange = useCallback((value) => {
    setSearchQuery(value);
  }, []);

  const handleSearchClear = useCallback(() => {
    setSearchQuery('');
  }, []);

  const handleStatusFilterChange = useCallback((value) => {
    setStatusFilter(value);
  }, []);

  const handlePriorityFilterChange = useCallback((value) => {
    setPriorityFilter(value);
  }, []);

  const openCreateForm = useCallback(() => {
    setEditingTask(null);
    setIsFormOpen(true);
  }, []);

  const closeForm = useCallback(() => {
    setIsFormOpen(false);
    setEditingTask(null);
  }, []);

  // Close sidebar on navigation (mobile)
  const handleNavClick = useCallback((item) => {
    setActiveNav(item);
    setSidebarOpen(false);
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Escape to close modals
      if (e.key === 'Escape') {
        if (isFormOpen) closeForm();
        if (deleteConfirm) setDeleteConfirm(null);
        if (sidebarOpen) setSidebarOpen(false);
      }
      // Ctrl/Cmd + N for new task
      if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
        e.preventDefault();
        openCreateForm();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isFormOpen, deleteConfirm, sidebarOpen, closeForm, openCreateForm]);

  // Detect mobile viewport
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="dashboard">
      {/* Sidebar */}
      <Sidebar
        activeItem={activeNav}
        onItemClick={handleNavClick}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main content area */}
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        {/* Header */}
        <Header
          onMenuClick={() => setSidebarOpen(true)}
          onCreateTask={openCreateForm}
        />

        {/* Main content */}
        <main className="main-content" role="main">
          <div className="content-header">
            <h1 className="content-title">My Tasks Overview</h1>
            <p className="content-subtitle">Manage your tasks and stay focused on what matters</p>
          </div>

          {/* Stats Grid */}
          <div className="stats-grid" role="region" aria-label="Dashboard statistics">
            <StatCard
              title="Total Tasks"
              value={stats.total}
              icon={<statIcons.total size={20} strokeWidth={2} />}
              iconColor="primary"
            />
            <StatCard
              title="In Progress"
              value={stats.inProgress}
              icon={<statIcons.inProgress size={20} strokeWidth={2} />}
              iconColor="warning"
            />
            <StatCard
              title="Completed"
              value={stats.completed}
              icon={<statIcons.completed size={20} strokeWidth={2} />}
              iconColor="success"
            />
            <StatCard
              title="Completion"
              value={`${stats.completion}%`}
              icon={<statIcons.completion size={20} strokeWidth={2} />}
              iconColor="info"
              sublabel={`${stats.completed} of ${stats.total} tasks done`}
            />
          </div>

          {/* Focus Notes Carousel */}
          <FocusNotes />

          {/* Search and Filters */}
          <div className="search-filter-bar" role="search" aria-label="Task search and filters">
            <SearchBar
              value={searchQuery}
              onChange={handleSearchChange}
              onClear={handleSearchClear}
              placeholder="Search tasks by title..."
            />
            <FilterTabs
              statusFilter={statusFilter}
              onStatusChange={handleStatusFilterChange}
              priorityFilter={priorityFilter}
              onPriorityChange={handlePriorityFilterChange}
            />
          </div>

          {/* Task Section */}
          <section className="task-section" aria-labelledby="tasks-heading">
            <div className="task-header">
              <h2 id="tasks-heading" className="task-header-title">Tasks ({filteredTasks.length})</h2>
              <button
                className="add-task-btn"
                onClick={openCreateForm}
                aria-label="Create new task"
              >
                <Plus className="add-task-icon" aria-hidden="true" size={16} strokeWidth={2} />
                Add Task
              </button>
            </div>
            <TaskList
              tasks={filteredTasks}
              onEdit={handleEditTask}
              onDelete={handleDeleteTask}
              onStatusChange={handleStatusChange}
              isMobile={isMobile}
            />
          </section>
        </main>
      </div>

      {/* Task Form Modal */}
      {isFormOpen && (
        <div className="modal-overlay" onClick={closeForm} role="dialog" aria-modal="true" aria-labelledby="form-title">
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 id="form-title" className="modal-title">
                {editingTask ? 'Edit Task' : 'Create New Task'}
              </h2>
              <button
                className="modal-close"
                onClick={closeForm}
                aria-label="Close form"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
            <TaskForm
              initialData={editingTask}
              onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
              onCancel={closeForm}
              isEditing={!!editingTask}
            />
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={!!deleteConfirm}
        onClose={() => setDeleteConfirm(null)}
        onConfirm={confirmDelete}
        title="Delete Task"
        message="Are you sure you want to delete this task? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        variant="danger"
      />

      {/* Toast Notifications */}
      <ToastContainer toasts={toasts} onClose={dismissToast} />
    </div>
  );
}