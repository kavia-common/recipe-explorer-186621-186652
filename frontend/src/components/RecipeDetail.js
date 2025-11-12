import React, { useEffect, useRef } from 'react';

// PUBLIC_INTERFACE
export default function RecipeDetail({ recipe, onClose, isModal = false }) {
  /** Recipe detail view showing image, ingredients, steps, and metadata. */
  const closeRef = useRef(null);

  useEffect(() => {
    if (!isModal) return;
    function handleEsc(e) {
      if (e.key === 'Escape') onClose?.();
    }
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [isModal, onClose]);

  if (!recipe) return null;

  const content = (
    <div className="modal" role={isModal ? 'dialog' : undefined} aria-modal={isModal || undefined} aria-labelledby="recipeTitle">
      <div className="modal-header">
        <h2 id="recipeTitle" style={{ fontWeight: 800 }}>{recipe.title}</h2>
        {isModal && (
          <button ref={closeRef} className="modal-close" onClick={onClose} aria-label="Close details">✕</button>
        )}
      </div>
      <div className="modal-content">
        <img className="detail-hero" src={recipe.image} alt={`${recipe.title} dish`} />
        <div className="detail-meta">
          <span className="badge">⭐ {recipe.rating}</span>
          <span className="badge secondary">⏱ {recipe.time}m</span>
          <span className="badge">🍽 {recipe.servings} servings</span>
          {recipe.tags?.map((t) => <span key={t} className="badge">{t}</span>)}
        </div>
        {recipe.description && <p style={{ color: 'var(--muted)', marginBottom: 10 }}>{recipe.description}</p>}
        <div>
          <h3 className="section-title">Ingredients</h3>
          <ul className="list">
            {recipe.ingredients?.map((ing, idx) => <li key={idx}>{ing}</li>)}
          </ul>
        </div>
        <div>
          <h3 className="section-title">Steps</h3>
          <ol className="list">
            {recipe.steps?.map((st, idx) => <li key={idx}>{st}</li>)}
          </ol>
        </div>
      </div>
    </div>
  );

  if (!isModal) return content;

  return (
    <div className="modal-backdrop" onClick={(e) => e.target === e.currentTarget && onClose?.()}>
      {content}
    </div>
  );
}
