import React from 'react';
import RecipeCard from './RecipeCard';

// PUBLIC_INTERFACE
export default function RecipeGrid({ recipes = [], onOpen }) {
  /** Responsive grid of recipe cards. */
  if (!recipes.length) {
    return <div className="empty" role="status">No recipes found.</div>;
  }
  return (
    <section className="grid" aria-live="polite">
      {recipes.map((r) => (
        <RecipeCard key={r.id} recipe={r} onOpen={onOpen} />
      ))}
    </section>
  );
}
