import React from 'react';
import {
  LayoutDashboard,
  PlusSquare,
  ListChecks,
  Calendar,
  Settings,
  HelpCircle,
  ChevronLeft
} from 'lucide-react';

const navigationItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'tasks', label: 'My Tasks', icon: ListChecks },
  { id: 'calendar', label: 'Calendar', icon: Calendar },
  { id: 'create', label: 'Create Task', icon: PlusSquare },
  { id: 'settings', label: 'Settings', icon: Settings },
  { id: 'help', label: 'Help', icon: HelpCircle }
];

export default function Sidebar({ activeItem, onItemClick, isOpen, onClose }) {
  return (
    <>
      {/* Mobile overlay */}
      <div
        className={`sidebar-overlay ${isOpen ? 'open' : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />

      <aside
        className={`sidebar ${isOpen ? 'open' : ''}`}
        role="navigation"
        aria-label="Main navigation"
      >
        {/* Brand */}
        <div className="sidebar-brand">
          <div className="sidebar-logo" aria-hidden="true">
            <LayoutDashboard size={20} strokeWidth={2.5} />
          </div>
          <span className="sidebar-title">FocusBoard</span>
        </div>

        {/* Navigation */}
        <nav className="sidebar-nav" aria-label="Sidebar navigation">
          {navigationItems.map((item) => (
            <button
              key={item.id}
              className={`nav-item ${activeItem === item.id ? 'active' : ''}`}
              onClick={() => {
                onItemClick(item.id);
                onClose();
              }}
              aria-current={activeItem === item.id ? 'page' : undefined}
            >
              <item.icon className="nav-icon" aria-hidden="true" size={20} strokeWidth={2} />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </aside>
    </>
  );
}