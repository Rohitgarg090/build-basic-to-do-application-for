```json
{
  "summary": "A minimal personal iOS to-do application built with Expo (React Native) that stores all data locally on-device using expo-sqlite. No backend, no cloud, no authentication — just a clean two-screen app to create, complete, and delete personal tasks. The entire experience is self-contained on the user's iPhone.",
  "mvpFeatures": [
    "Feature: View All Todos — Display a scrollable list of all tasks ordered by creation date, showing title and completion status",
    "Feature: Add Todo — Create a new task by entering a title via a modal screen with a save button",
    "Feature: Complete Todo — Tap any todo item to toggle its completed/incomplete status, visually reflected with a strikethrough or checkmark",
    "Feature: Delete Todo — Swipe left on a todo item to reveal and confirm a delete action, permanently removing it from local storage",
    "Feature: Persistent Local Storage — All todos are saved to an on-device SQLite database via expo-sqlite and persist across app sessions and reboots",
    "Feature: Empty State — Display a friendly placeholder message and prompt when no todos exist in the list"
  ],
  "pages": [
    "/: Main todo list screen — renders all todos, handles toggle complete and delete interactions, entry point to add screen",
    "/add: Add todo modal screen — single text input and save button to create a new todo, dismisses back to list on save or cancel"
  ],
  "screens": [
    "TodoListScreen: Primary screen showing FlatList of all todos with completion toggle on tap and swipe-to-delete gesture, plus a FAB or nav bar button to open the Add screen",
    "AddTodoScreen: Modal overlay with a single TextInput for task title, a Save button that writes to SQLite and dismisses, and a Cancel/close button",
    "EmptyStateScreen: Inline component rendered inside TodoListScreen when the todos array is empty, showing an illustration or icon with a prompt to add the first task"
  ],
  "userStories": [
    "As a personal user, I want to see all my todos in a list so that I can review what tasks I have",
    "As a personal user, I want to add a new todo by typing a title so that I can capture tasks quickly",
    "As a personal user, I want to tap a todo to mark it complete so that I can track my progress",
    "As a personal user, I want to tap a completed todo to unmark it so that I can correct mistakes",
    "As a personal user, I want to swipe and delete a todo so that I can remove tasks I no longer need",
    "As a personal user, I want my todos to persist when I close and reopen the app so that I never lose my task list",
    "As a personal user, I want to see an empty state message when I have no todos so that I understand how to get started"
  ],
  "outOfScope": [
    "User authentication or login of any kind",
    "Cloud sync or remote backup",
    "Multi-device support",
    "Due dates or scheduling",
    "Reminders or push notifications",
    "Task priorities or labels",
    "Categories or folders",
    "Search or filter functionality",
    "Edit todo title after creation",
    "Drag-to-reorder todos",
    "Subtasks or checklists within a todo",
    "Dark mode or theme customization",
    "Android support",
    "Web support",
    "Backend API of any kind",
    "Django integration",
    "Supabase integration",
    "Data export or sharing"
  ],
  "featuresMarkdown": "# Features: Simple iOS To-Do App\n\n> **Version**: 1.0 MVP  \n> **Platform**: iOS only  \n> **Storage**: Local on-device SQLite via expo-sqlite  \n> **Auth**: None required\n\n---\n\n## Feature Overview\n\n| # | Feature | Priority | Status |\n|---|---------|----------|--------|\n| 1 | View All Todos | Must Have | MVP |\n| 2 | Add Todo | Must Have | MVP |\n| 3 | Complete Todo | Must Have | MVP |\n| 4 | Delete Todo | Must Have | MVP |\n| 5 | Persistent Local Storage | Must Have | MVP |\n| 6 | Empty State | Should Have | MVP |\n\n---\n\n## Feature Specifications\n\n### F-001: View All Todos\n\n**Description**  \nThe main screen displays all saved todos in a vertically scrollable list ordered by creation date (newest first).\n\n**Acceptance Criteria**\n- All todos stored in SQLite are rendered on app load\n- Each row displays the task title\n- Each row displays a visual indicator of completion status (checkbox or strikethrough)\n- List scrolls smoothly with any number of items\n- List refreshes automatically after add or delete actions\n\n**Implementation Notes**\n- Use `FlatList` with `keyExtractor` on `todo.id`\n- Query: `SELECT * FROM todos ORDER BY created_at DESC`\n- Re-fetch on screen focus using `useFocusEffect`\n\n---\n\n### F-002: Add Todo\n\n**Description**  \nThe user can create a new todo by tapping a button that opens a modal screen with a text input.\n\n**Acceptance Criteria**\n- A clearly visible add button (FAB or navigation bar `+`) is always accessible on the list screen\n- Tapping the button opens the Add Todo modal screen\n- The modal contains a single text input auto-focused on open\n- A Save button is disabled when the input is empty or whitespace-only\n- Tapping Save inserts the todo into SQLite and dismisses the modal\n- The list screen immediately reflects the new todo on return\n- A Cancel or close button dismisses the modal without saving\n\n**Implementation Notes**\n- Route: `/add` rendered as a modal via expo-router\n- Query: `INSERT INTO todos (title) VALUES (?)`\n- Trim whitespace before validation and insertion\n\n---\n\n### F-003: Complete Todo\n\n**Description**  \nThe user can tap a todo item to toggle its completion state between complete and incomplete.\n\n**Acceptance Criteria**\n- Tapping anywhere on a todo row toggles its `completed` value\n- Completed todos display a visual distinction (strikethrough text, filled checkbox, or muted color)\n- The toggle persists immediately to SQLite\n- Toggling does not navigate away from the list screen\n- The UI updates instantly without a full list reload (optimistic update acceptable)\n\n**Implementation Notes**\n- Query: `UPDATE todos SET completed = ? WHERE id = ?`\n- Pass `completed ? 0 : 1` to toggle\n- Update local state immediately, then write to DB\n\n---\n\n### F-004: Delete Todo\n\n**Description**  \nThe user can permanently delete a todo by swiping left on its row to reveal a delete action.\n\n**Acceptance Criteria**\n- Swiping left on a todo row reveals a red Delete button/label\n- Tapping the delete action removes the todo from SQLite permanently\n- The row is removed from the list immediately after deletion\n- No undo functionality is required in MVP\n\n**Implementation Notes**\n- Use `react-native-gesture-handler` swipeable or a library like `react-native-swipe-list-view`\n- Query: `DELETE FROM todos WHERE id = ?`\n- Filter item from local state array on success\n\n---\n\n### F-005: Persistent Local Storage\n\n**Description**  \nAll todo data is saved to an on-device SQLite database that survives app closes, reboots, and background termination.\n\n**Acceptance Criteria**\n- Todos created in one session are visible in subsequent sessions\n- Completed states persist across sessions\n- Deleted todos do not reappear\n- No network connection is ever required\n- Data is not lost on app update (stored in app's documents directory)\n\n**Implementation Notes**\n- Initialize DB on first app launch using `expo-sqlite` `openDatabase`\n- Run `CREATE TABLE IF NOT EXISTS todos (...)` on init\n- All CRUD operations use parameterized queries to prevent injection\n\n**Schema**\n```sql\nCREATE TABLE IF NOT EXISTS todos (\n  id         INTEGER PRIMARY KEY AUTOINCREMENT,\n  title      TEXT NOT NULL,\n  completed  INTEGER DEFAULT 0,\n  created_at TEXT DEFAULT (datetime('now'))\n);\n```\n\n---\n\n### F-006: Empty State\n\n**Description**  \nWhen no todos exist, the list screen shows a friendly placeholder instead of a blank screen.\n\n**Acceptance Criteria**\n- Empty state is shown only when the todos array has zero items\n- Empty state includes a short message (e.g., \"No tasks yet. Tap + to get started.\")\n- The add button remains accessible while empty state is visible\n- Empty state disappears immediately when the first todo is added\n\n**Implementation Notes**\n- Use `FlatList`'s `ListEmptyComponent` prop\n- Render `<EmptyState />` component with icon and message text\n\n---\n\n## Out of Scope for MVP\n\nThe following features are explicitly excluded from version 1.0:\n\n- User authentication or accounts\n- Cloud sync or backup\n- Multi-device support\n- Due dates or deadlines\n- Reminders or push notifications\n- Task priorities or tags\n- Categories or folders\n- Search or filter\n- Edit todo title after creation\n- Drag-to-reorder\n- Subtasks\n- Dark mode theming\n- Android or web support\n- Any backend or API\n",
  "storiesMarkdown": "# User Stories: Simple iOS To-Do App\n\n> **Version**: 1.0 MVP  \n> **Persona**: Personal User — a single individual using the app privately on their own iPhone\n\n---\n\n## Epic 1: Todo List Management\n\n### US-001: View My Todo List\n**As a** personal user,  \n**I want to** see all my todos displayed in a list when I open the