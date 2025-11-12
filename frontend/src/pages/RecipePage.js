import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getRecipeById } from '../services/api';
import RecipeDetail from '../components/RecipeDetail';

// PUBLIC_INTERFACE
export default function RecipePage() {
  /** Dedicated page to view a recipe by ID. */
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [state, setState] = useState('loading'); // loading | ready | error

  useEffect(() => {
    let cancelled = false;
    async function run() {
      setState('loading');
      try {
        const data = await getRecipeById(id);
        if (cancelled) return;
        setRecipe(data);
        setState('ready');
      } catch (e) {
        if (!cancelled) setState('error');
      }
    }
    run();
    return () => { cancelled = true; };
  }, [id]);

  if (state === 'loading') return <div className="empty" role="status">Loading…</div>;
  if (state === 'error') return <div className="empty" role="alert" style={{ color: 'var(--error)' }}>Failed to load recipe.</div>;
  if (!recipe) return null;

  return (
    <div className="container" style={{ paddingTop: 18, paddingBottom: 48 }}>
      <button className="btn-link" onClick={() => navigate(-1)} aria-label="Go back">← Back</button>
      <RecipeDetail recipe={recipe} />
    </div>
  );
}
