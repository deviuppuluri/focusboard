# FocusBoard - Task Management Dashboard

A responsive, functional task management dashboard built with React + Vite, featuring full CRUD operations, search/filter capabilities, a Focus Notes carousel, and localStorage persistence.

## 📋 Project Overview

FocusBoard is a single-user task dashboard that allows users to manage their tasks with a clean, modern interface. Built as part of the NxtWave/CCBP MobileFirst assignment, it demonstrates React fundamentals, state management, responsive design, and accessibility best practices.

## 🚀 Technology Stack

- **Framework**: React 18 with Vite
- **Language**: JavaScript (ES6+)
- **Styling**: CSS3 with CSS Custom Properties (variables)
- **Icons**: Lucide React
- **State Management**: React Hooks (useState, useMemo, useCallback, useEffect) with custom `useLocalStorage` hook
- **Persistence**: Browser localStorage
- **Build Tool**: Vite
- **Deployment**: Vercel/Netlify ready

## ✨ Key Features Implemented

| Feature | Status | Description |
|---------|--------|-------------|
| **Dashboard Layout** | ✅ | Sidebar navigation, header, statistics cards, carousel, task list |
| **Sample Data** | ✅ | 8 pre-loaded tasks with varied statuses, priorities, categories |
| **Create Task** | ✅ | Modal form with validation (required title, category, status, priority, due date) |
| **Edit Task** | ✅ | Pre-populated form for existing tasks, preserves ID |
| **Delete Task** | ✅ | Confirmation dialog before destructive action |
| **Status Updates** | ✅ | Inline dropdown (To do / In progress / Completed) with instant stats update |
| **Search** | ✅ | Case-insensitive, partial-match title search |
| **Status Filter** | ✅ | Tabs: All, To do, In progress, Completed |
| **Priority Filter** | ✅ | Dropdown: All, Low, Medium, High |
| **Combined Filters** | ✅ | Search + Status + Priority work together |
| **Statistics** | ✅ | Dynamic: Total, In Progress, Completed, Completion % |
| **Focus Notes Carousel** | ✅ | 3 slides with prev/next, indicators, keyboard accessible |
| **localStorage Persistence** | ✅ | Auto-save on changes, restores on load, doesn't overwrite saved data |
| **Responsive Design** | ✅ | 390px (mobile), 768px (tablet), 1440px (desktop) |
| **Accessibility** | ✅ | Semantic HTML, ARIA labels, focus management, keyboard navigation |

## 📁 Project Structure

```
focusboard/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── Sidebar.jsx          # Navigation sidebar with mobile support
│   │   ├── Header.jsx           # Top header with actions
│   │   ├── StatCard.jsx         # Reusable statistic card
│   │   ├── FocusNotes.jsx       # 3-slide carousel component
│   │   ├── SearchBar.jsx        # Search input with clear
│   │   ├── FilterTabs.jsx       # Status tabs + priority select
│   │   ├── TaskList.jsx         # Task container (empty state handling)
│   │   ├── TaskCard.jsx         # Individual task row/card (desktop/mobile)
│   │   ├── TaskForm.jsx         # Create/Edit form with validation
│   │   ├── ConfirmDialog.jsx    # Reusable confirmation modal
│   │   ├── Toast.jsx            # Toast notification component
│   │   └── ToastContainer.jsx   # Toast manager
│   ├── data/
│   │   └── sampleTasks.js       # Initial task data + constants
│   ├── hooks/
│   │   └── useLocalStorage.js   # Custom localStorage hook
│   ├── App.jsx                  # Main application component
│   ├── main.jsx                 # Entry point
│   └── index.css                # Global styles + responsive CSS
├── screenshots/
├── README.md
├── AI_USAGE.md
├── package.json
├── vite.config.js
├── index.html
└── .gitignore
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 18+ and npm

### Local Development

```bash
# Clone the repository
git clone <your-github-repo-url>
cd focusboard

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Production Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## 🧠 State Management Explanation

### Approach: React Hooks + Custom Hook

This project uses **React's built-in hooks** (`useState`, `useMemo`, `useCallback`, `useEffect`) with a custom `useLocalStorage` hook for persistence. No external state library (Redux, Zustand, etc.) was needed because:

1. **Single source of truth**: All task data lives in one `useState` array in `App.jsx`
2. **Derived state**: Statistics, filtered tasks are computed via `useMemo` - never stored separately
3. **Predictable mutations**: All updates go through setter functions that create new arrays/objects (immutable updates)
4. **Colocated logic**: Related state and handlers stay together in the main component

### Data Flow

```
┌─────────────────────────────────────────────────────────────┐
│                      App.jsx (Root State)                   │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐  │
│  │ tasks[]      │  │ searchQuery  │  │ statusFilter     │  │
│  │ (useTasks)   │  │ priorityFilter│ │ activeNav, etc.  │  │
│  └──────┬───────┘  └──────┬───────┘  └────────┬─────────┘  │
│         │                 │                   │             │
│         ▼                 ▼                   ▼             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              useMemo: filteredTasks                  │  │
│  │  tasks.filter(search).filter(status).filter(priority)│  │
│  └────────────────────────┬─────────────────────────────┘  │
│                           │                                 │
│         ┌─────────────────┼─────────────────┐              │
│         ▼                 ▼                 ▼              │
│  ┌──────────┐      ┌────────────┐   ┌────────────┐        │
│  │StatCards │      │ TaskList   │   │  FocusNotes│        │
│  │(derived) │      │(filtered)  │   │ (independent)      │
│  └──────────┘      └────────────┘   └────────────┘        │
└─────────────────────────────────────────────────────────────┘
```

### CRUD Operations

| Operation | Implementation |
|-----------|----------------|
| **Create** | `addTask(newTask)` → spreads existing array + new task |
| **Read** | `tasks` state + `filteredTasks` (derived) |
| **Update** | `updateTask(id, updates)` → `.map()` with conditional spread |
| **Delete** | `deleteTask(id)` → `.filter()` to remove by ID |
| **Status Change** | `updateTaskStatus(id, status)` → specialized update |

All operations use **immutable patterns** - new arrays/objects created, never mutating existing state.

### localStorage Integration

The `useLocalStorage` hook (`src/hooks/useLocalStorage.js`) handles:

- **Lazy initialization**: Reads from localStorage only once on mount
- **Automatic serialization**: `JSON.stringify` on write, `JSON.parse` on read
- **Error handling**: Graceful fallback to initial value if parsing fails
- **Sync on every change**: `setValue` updates both React state and localStorage

**Critical requirement met**: Sample data only loads when no saved data exists:
```javascript
const [tasks, setTasks] = useLocalStorage('focusboard_tasks', sampleTasks);
// If localStorage has data → use it
// If empty → use sampleTasks (8 tasks)
```

### Carousel State

Simple `useState` for active slide index (0-2), with circular navigation:
- Previous: `(index - 1 + length) % length`
- Next: `(index + 1) % length`
- Indicators: Direct index selection

## 🌐 Live Demo

- **Hosted URL**: [Add your Vercel/Netlify URL here]
- **GitHub Repository**: [Add your GitHub repo URL here]

## 📱 Responsive Breakpoints

| Breakpoint | Layout Changes |
|------------|----------------|
| **Desktop (≥1024px)** | Sidebar + content side-by-side, 4-column stats grid, table-style task rows |
| **Tablet (768-1023px)** | Collapsible sidebar, 2-column stats grid, condensed task rows |
| **Mobile (<768px)** | Stacked layout, slide-out sidebar, single-column stats, card-style tasks with labels |

## ♿ Accessibility Features

- Semantic HTML5 (`header`, `main`, `nav`, `section`, `article`, `aside`)
- ARIA labels, roles, and live regions
- Keyboard navigation (Tab, Enter, Escape, Arrow keys)
- Visible focus indicators on all interactive elements
- Sufficient color contrast ratios
- Form labels linked to inputs
- Screen reader announcements for dynamic content (toasts, stats)
- `sr-only` utility for hidden but accessible text

## 📸 Screenshots

### Desktop (1440px)
![Desktop Screenshot](screenshots/desktop.png)

### Mobile (390px)
![Mobile Screenshot](screenshots/mobile.png)

## ⚠️ Known Limitations / Pending Work

- [ ] Automatic carousel rotation (not required per spec)
- [ ] Drag-and-drop task reordering
- [ ] Task categories filter (UI shows category but no filter)
- [ ] Dark mode support
- [ ] Unit/integration tests
- [ ] PWA/offline support

## 📝 License

This project was created as part of the NxtWave/CCBP hiring assessment.

---

**Built with ❤️ using React + Vite**