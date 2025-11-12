import React from 'react';

// PUBLIC_INTERFACE
export default function NavBar({ theme = 'light', onToggleTheme }) {
  /** Top navigation with branding and theme toggle button. */
  return (
    <nav className="navbar" role="navigation" aria-label="Primary">
      <div className="navbar-inner">
        <div className="brand" aria-label="Recipe Explorer">
          <div className="brand-badge" aria-hidden="true" />
          Recipe Explorer
        </div>
        <button
          className="theme-toggle"
          onClick={onToggleTheme}
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
        </button>
      </div>
    </nav>
  );
}
