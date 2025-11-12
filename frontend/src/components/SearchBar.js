import React, { useEffect, useMemo, useRef, useState } from 'react';

// PUBLIC_INTERFACE
export default function SearchBar({ initial = '', onSearch }) {
  /**
   * Search bar with debounce and accessible controls.
   * Calls onSearch(value) when user stops typing or clicks search.
   */
  const [value, setValue] = useState(initial || '');
  const timer = useRef(null);

  useEffect(() => {
    setValue(initial || '');
  }, [initial]);

  useEffect(() => {
    if (!onSearch) return;
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => onSearch(value), 400);
    return () => clearTimeout(timer.current);
  }, [value, onSearch]);

  function handleSubmit(e) {
    e.preventDefault();
    if (timer.current) clearTimeout(timer.current);
    onSearch && onSearch(value);
  }

  return (
    <div className="search-wrap">
      <form className="search" role="search" aria-label="Recipe search" onSubmit={handleSubmit}>
        <span aria-hidden="true" style={{ color: 'var(--muted)', paddingLeft: 4 }}>🔎</span>
        <input
          type="search"
          placeholder="Search recipes, tags, ingredients…"
          aria-label="Search recipes"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button type="submit" aria-label="Search">
          Search
        </button>
      </form>
    </div>
  );
}
