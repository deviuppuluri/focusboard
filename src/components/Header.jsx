import React from 'react';
import { Menu, Bell, Search, User } from 'lucide-react';

export default function Header({ onMenuClick, onCreateTask }) {
  return (
    <header className="header" role="banner">
      <div className="header-left">
        <button
          className="mobile-menu-btn"
          onClick={onMenuClick}
          aria-label="Open navigation menu"
          aria-expanded="false"
        >
          <Menu size={24} strokeWidth={2} aria-hidden="true" />
        </button>
        <h1 className="page-title">Dashboard</h1>
      </div>

      <div className="header-right">
        <button
          className="header-action"
          aria-label="Search"
        >
          <Search size={20} strokeWidth={2} aria-hidden="true" />
        </button>
        <button
          className="header-action"
          aria-label="Notifications"
        >
          <Bell size={20} strokeWidth={2} aria-hidden="true" />
        </button>
        <div className="header-avatar" aria-label="User profile">
          <User size={20} strokeWidth={2} aria-hidden="true" />
        </div>
      </div>
    </header>
  );
}