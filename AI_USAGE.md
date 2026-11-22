# AI Usage Disclosure

## Tools Used
- **Claude (Anthropic)** - Primary AI assistant for code generation, architecture planning, and implementation guidance

## Representative Prompts

1. **Project Setup & Architecture**
   > "Create a complete React + Vite project structure for a task management dashboard called FocusBoard with components for Sidebar, Header, StatCards, FocusNotes carousel, TaskList, TaskForm, SearchBar, FilterTabs, and localStorage persistence. Follow the assignment requirements exactly."

2. **State Management Design**
   > "Design a state management approach using only React hooks (no Redux/Zustand) that maintains a single source of truth for tasks, derives statistics and filtered views, implements CRUD operations with immutable updates, and syncs with localStorage without overwriting saved data."

3. **Responsive CSS Implementation**
   > "Write comprehensive CSS with mobile-first responsive breakpoints at 390px, 768px, and 1440px. Include sidebar collapse on mobile, stacked task cards with labels, single-column stats grid, and touch-friendly controls. Use CSS custom properties for theming."

4. **Form Validation & Accessibility**
   > "Create a reusable TaskForm component with client-side validation for required fields (title, category, status, priority, due date), proper ARIA attributes, error messaging, and keyboard accessibility. Support both create and edit modes."

5. **Focus Notes Carousel**
   > "Build a 3-slide carousel component with previous/next navigation, dot indicators, circular navigation, keyboard support, and responsive behavior. Slides should match typical productivity dashboard content (planning, time-blocking, progress tracking)."

## AI-Assisted Areas

| Area | Level of Assistance |
|------|---------------------|
| **Project scaffolding** (package.json, vite.config.js, index.html, folder structure) | High - Generated complete setup |
| **Global CSS & responsive design** (index.css) | High - Complete implementation with all breakpoints |
| **Component architecture** (11 components) | High - All components generated with proper patterns |
| **Custom hooks** (useLocalStorage, useTasks) | High - Complete implementation with error handling |
| **State management logic** (App.jsx) | High - Complete data flow, derived state, handlers |
| **Form validation logic** | Medium - Validation rules and error handling patterns |
| **Accessibility attributes** (ARIA, semantic HTML) | Medium - Applied throughout components |
| **README.md documentation** | High - Complete documentation with state management explanation |
| **AI_USAGE.md** (this file) | High - Generated based on actual usage |

## Verified or Corrected Suggestion

**Suggestion**: The AI initially proposed using a single `useState` for all tasks with inline filter logic in the render method.

**Issue Identified**: This would cause unnecessary re-renders and mix derived state with source state, violating the "single source of truth" and "derived values" requirements from the assignment.

**Correction Applied**: 
- Implemented `useMemo` for `filteredTasks` and `stats` to ensure derived values are computed efficiently
- Separated source state (`tasks`) from derived state (`filteredTasks`, `stats`)
- Used `useCallback` for all event handlers to maintain referential equality
- Created a dedicated `useLocalStorage` hook that handles persistence separately from component state

**Why This Matters**: The assignment specifically requires "Derived values — Ensure task counts, progress, search results and filters automatically reflect current state" and "Predictable mutations — Implement add/edit/delete/status operations without mutating existing React state directly." The corrected approach ensures optimal performance and predictable data flow.