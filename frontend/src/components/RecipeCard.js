import React from 'react';
import { Link } from 'react-router-dom';

// PUBLIC_INTERFACE
export default function RecipeCard({ recipe, onOpen }) {
  /** Displays a single recipe card with image, title, rating, time, and tags. */
  if (!recipe) return null;
  const { id, image, title, rating, time, tags = [] } = recipe;
  return (
    <article className="card" aria-label={title}>
      <img className="card-img" src={image} alt={`${title} dish`} loading="lazy" />
      <div className="card-body">
        <div className="card-meta" aria-label="Recipe meta">
          <span className="badge" title="Rating">⭐ {rating?.toFixed ? rating.toFixed(1) : rating}</span>
          <span className="badge secondary" title="Time">⏱ {time}m</span>
        </div>
        <h3 className="card-title">{title}</h3>
        <div className="card-meta" aria-label="Recipe tags">
          {tags.slice(0, 2).map((t) => (
            <span key={t} className="badge" aria-label={`tag ${t}`}>{t}</span>
          ))}
        </div>
        <div className="card-actions">
          <button className="btn-link" onClick={() => onOpen?.(id)} aria-label={`Quick view ${title}`}>
            Quick view
          </button>
          <Link className="btn-primary" to={`/recipe/${encodeURIComponent(id)}`} aria-label={`Open ${title}`}>
            Open
          </Link>
        </div>
      </div>
    </article>
  );
}
