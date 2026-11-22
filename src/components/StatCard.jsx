import React from 'react';

export default function StatCard({ title, value, icon, iconColor, sublabel }) {
  return (
    <article className="stat-card" role="region" aria-label={title}>
      <div className="stat-header">
        <h3 className="stat-title">{title}</h3>
        <div className={`stat-icon ${iconColor}`} aria-hidden="true">
          {icon}
        </div>
      </div>
      <div className="stat-value" aria-live="polite">{value}</div>
      {sublabel && <div className="stat-sublabel">{sublabel}</div>}
    </article>
  );
}