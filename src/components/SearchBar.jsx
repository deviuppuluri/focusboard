import React from 'react';
import { Search, X } from 'lucide-react';

export default function SearchBar({ value, onChange, onClear, placeholder = "Search tasks..." }) {
  return (
    <div className="search-wrapper" role="search">
      <Search className="search-icon" aria-hidden="true" size={18} strokeWidth={2} />
      <input
        type="search"
        className="search-input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label="Search tasks by title"
        autoComplete="off"
      />
      {value && (
        <button
          type="button"
          className="search-icon"
          onClick={onClear}
          aria-label="Clear search"
          style={{
            right: '12px',
            left: 'auto',
            background: 'var(--color-bg-tertiary)',
            borderRadius: '50%',
            width: '24px',
            height: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <X size={14} strokeWidth={2} aria-hidden="true" />
        </button>
      )}
    </div>
  );
}