# Recipe Explorer (Ocean Professional)

A modern, lightweight React app to browse, search, and view recipes with a clean blue and amber accented theme.

## Features

- Landing page with search bar (debounced, syncs `?q=` query param)
- Responsive grid of recipe cards (image, title, tags, rating, time)
- Recipe detail view (modal quick-view and dedicated `/recipe/:id` route)
- Loading and error states
- Accessibility: semantic HTML, focus outlines, ARIA roles/labels, alt text
- API client using env vars with automatic mock fallback

## Environment Variables

Provide a reachable API base to fetch live data:
- REACT_APP_API_BASE
- REACT_APP_BACKEND_URL

If neither is defined or the API fails, the app falls back to a built-in mock service.

Example `.env.example`:
```
REACT_APP_API_BASE=https://api.example.com
# or
REACT_APP_BACKEND_URL=https://backend.example.com
```

API expectations:
- GET /recipes?q=&page=&limit= -> { items: Recipe[], total, page, limit }
- GET /recipes/:id -> Recipe

## Scripts

- `npm start` — dev server at http://localhost:3000
- `npm test` — run tests
- `npm run build` — production build

## Directory Overview

- `src/components` — Layout, NavBar, SearchBar, RecipeCard, RecipeGrid, RecipeDetail
- `src/pages` — HomePage (grid + search), RecipePage (detail by id)
- `src/services` — api.js (env-aware client), mock.js (fallback data)
- `src/App.css` — Ocean Professional theme, modern UI styles

## Notes

- Mobile-first responsive layout
- No heavy UI framework; minimal dependencies
