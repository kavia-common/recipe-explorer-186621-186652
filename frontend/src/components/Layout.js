import React from 'react';
import NavBar from './NavBar';

// PUBLIC_INTERFACE
export default function Layout({ children, theme, onToggleTheme }) {
  /** Application layout with sticky navbar and content container. */
  return (
    <div className="App">
      <NavBar theme={theme} onToggleTheme={onToggleTheme} />
      {children}
    </div>
  );
}
