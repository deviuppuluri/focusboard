// Sample tasks data - at least 6 tasks with unique IDs
// Each task contains: id, title, description, category, status, priority, dueDate

export const sampleTasks = [
  {
    id: 101,
    title: "Complete UI design for dashboard",
    description: "Design the main dashboard layout including sidebar, header, stats cards, and task list components. Follow Figma specifications exactly.",
    category: "Design",
    status: "completed",
    priority: "high",
    dueDate: "2026-11-20"
  },
  {
    id: 102,
    title: "Implement task CRUD operations",
    description: "Build create, read, update, delete functionality for tasks with proper form validation and confirmation dialogs.",
    category: "Development",
    status: "in-progress",
    priority: "high",
    dueDate: "2026-11-25"
  },
  {
    id: 103,
    title: "Set up localStorage persistence",
    description: "Implement browser data persistence using localStorage to save and restore tasks across sessions.",
    category: "Development",
    status: "in-progress",
    priority: "medium",
    dueDate: "2026-11-22"
  },
  {
    id: 104,
    title: "Build Focus Notes carousel",
    description: "Create a 3-slide carousel with previous/next navigation, indicators, and responsive behavior matching Figma design.",
    category: "Development",
    status: "todo",
    priority: "medium",
    dueDate: "2026-11-28"
  },
  {
    id: 105,
    title: "Implement search and filter functionality",
    description: "Add case-insensitive title search, status tabs (All, To do, In progress, Completed), and priority filter (Low, Medium, High).",
    category: "Development",
    status: "todo",
    priority: "high",
    dueDate: "2026-11-26"
  },
  {
    id: 106,
    title: "Responsive design testing and fixes",
    description: "Test and fix layout at 390px (mobile), 768px (tablet), and 1440px (desktop) breakpoints. Ensure touch-friendly controls.",
    category: "Testing",
    status: "todo",
    priority: "medium",
    dueDate: "2026-11-29"
  },
  {
    id: 107,
    title: "Write README and AI_USAGE documentation",
    description: "Document project setup, state management approach, localStorage implementation, deployment instructions, and AI usage disclosure.",
    category: "Documentation",
    status: "todo",
    priority: "low",
    dueDate: "2026-11-30"
  },
  {
    id: 108,
    title: "Deploy to Vercel and verify",
    description: "Deploy the application to Vercel, verify all functionality works on hosted URL, and test in incognito mode.",
    category: "Deployment",
    status: "todo",
    priority: "low",
    dueDate: "2026-12-01"
  }
];

export const categories = [
  "Design",
  "Development",
  "Testing",
  "Documentation",
  "Deployment",
  "Research"
];

export const statusOptions = [
  { value: "todo", label: "To do" },
  { value: "in-progress", label: "In progress" },
  { value: "completed", label: "Completed" }
];

export const priorityOptions = [
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" }
];