# Photo Gallery Development Steps

A detailed record of the development process for individuals looking to understand the implementation.

## 1. Project Setup
- Initialized with Vite and React template.
- Installed dependencies.
- Configured development environment.

## 2. Tailwind CSS Configuration
- Integrated Tailwind CSS for styling.
- Set up `tailwind.config.js` to track utility classes.
- Verified CSS layer injection in `index.css`.

## 3. Data Integration
- Utilized `https://picsum.photos/v2/list?limit=30` as the primary data source.
- Implemented `fetch` logic within a `useEffect` hook.
- Added loading and error boundaries for better user experience.

## 4. UI/UX Design
- Created a responsive grid layout using Tailwind's layout utilities.
- Designed a custom header with purple-to-indigo gradients.
- Implemented smooth hover transitions on photo cards.

## 5. Search Functionality
- Added a filtered search feature using React state.
- Enabled real-time search by author name.

## 6. Interactive Elements
- Added Heart (Like) button functionality.
- Implemented state-based persistent likes (local to session).
- Ensured responsive interactions for mobile users.

## 7. State Management Refactor (useReducer & Persistence)
- Refactored `useState` for favourites to `useReducer` for more complex state logic.
- Implemented `localStorage` persistence to keep favourites across page refreshes.
- Used the `useReducer` initializer function to hydrate state from `localStorage` on load.

## 8. Folder Structure Reorganization
- Professionalized the project structure by creating `components/`, `hooks/`, and `styles/` directories.
- Moved UI logic to `src/components/`, logic to `src/hooks/`, and global styles to `src/styles/`.
- Updated all imports to maintain application integrity.

## 10. Performance Optimization (useCallback & useMemo)
- Optimized filtering logic in `Gallery.jsx` using `useMemo` to prevent unnecessary re-computations.
- Stabilized function references for event handlers using `useCallback` in `App.jsx` and `Gallery.jsx`.
- These optimizations ensure a smooth user experience, especially as the photo list grows or when the parent component re-renders.

---
*This documentation was generated to provide a clear audit trail of the application development.*
