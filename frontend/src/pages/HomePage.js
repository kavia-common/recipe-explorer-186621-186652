import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import RecipeGrid from '../components/RecipeGrid';
import RecipeDetail from '../components/RecipeDetail';
import { getRecipes, getRecipeById } from '../services/api';

function useQuery() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}

// PUBLIC_INTERFACE
export default function HomePage() {
  /** Landing page with search and recipe grid. */
  const qParams = useQuery();
  const navigate = useNavigate();
  const [query, setQuery] = useState(qParams.get('q') || '');
  const [page, setPage] = useState(1);
  const [recipes, setRecipes] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [quickId, setQuickId] = useState(null);
  const [quickRecipe, setQuickRecipe] = useState(null);

  // Sync URL query param
  useEffect(() => {
    const currentQ = qParams.get('q') || '';
    setQuery(currentQ);
    setPage(1);
  }, [qParams]);

  // Fetch recipes
  useEffect(() => {
    let cancelled = false;
    async function run() {
      setLoading(true);
      setError('');
      try {
        const data = await getRecipes({ q: query, page });
        if (cancelled) return;
        setTotal(data.total);
        setRecipes((prev) => (page === 1 ? data.items : [...prev, ...data.items]));
      } catch (e) {
        setError('Failed to load recipes.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    run();
    return () => { cancelled = true; };
  }, [query, page]);

  const onSearch = useCallback((text) => {
    const params = new URLSearchParams(window.location.search);
    if (text) params.set('q', text);
    else params.delete('q');
    navigate({ pathname: '/', search: params.toString() });
    setPage(1);
  }, [navigate]);

  const loadMore = useCallback(() => {
    if (recipes.length < total && !loading) setPage((p) => p + 1);
  }, [recipes.length, total, loading]);

  // Quick view modal data
  useEffect(() => {
    let cancelled = false;
    async function fetchQuick() {
      if (!quickId) {
        setQuickRecipe(null);
        return;
      }
      try {
        const data = await getRecipeById(quickId);
        if (!cancelled) setQuickRecipe(data);
      } catch {
        if (!cancelled) setQuickRecipe(null);
      }
    }
    fetchQuick();
    return () => { cancelled = true; };
  }, [quickId]);

  return (
    <main>
      <div className="container" style={{ paddingTop: 18, paddingBottom: 6 }}>
        <h1 style={{ fontSize: 24, fontWeight: 900, letterSpacing: 0.2 }}>Discover Recipes</h1>
        <p style={{ color: 'var(--muted)', marginTop: 6 }}>
          Browse modern dishes with blue and amber accents. Use the search to find your next meal.
        </p>
      </div>
      <SearchBar initial={query} onSearch={onSearch} />
      {error ? <div className="empty" role="alert" style={{ color: 'var(--error)' }}>{error}</div> : null}
      <RecipeGrid recipes={recipes} onOpen={setQuickId} />
      <div className="container" style={{ textAlign: 'center' }}>
        {loading && <div role="status" className="empty">Loading…</div>}
        {!loading && recipes.length < total && (
          <button className="btn-primary" onClick={loadMore} aria-label="Load more recipes">
            Load more
          </button>
        )}
        {!loading && recipes.length >= total && total > 0 && (
          <div className="empty">You have reached the end.</div>
        )}
      </div>
      {quickId && (
        <RecipeDetail
          isModal
          recipe={quickRecipe}
          onClose={() => setQuickId(null)}
        />
      )}
    </main>
  );
}
