# Sprint 1
- [x] Account Registration: As an Admin, I want to register users with specific roles (Admin, Scolarité, Enseignant, Etudiant) in order to provide authorized access to the campus system.

- [x] User Authentication: As a User, I want to log in securely with my credentials in order to access the features and data restricted to my specific role.

- [x] Session Management: As a User, I want to maintain my login session securely for a fixed duration in order to avoid frequent re-authentication.

- [ ] Password Recovery: As a User, I want to request a password reset via email so that I can regain access if I forget my credentials.

- [x] Role-Based Access Control (RBAC): As an Admin, I want the system to enforce permissions at the endpoint level based on the user's assigned role in order to protect sensitive modules.












# Sprint 2 — Frontend Architecture & Core Pages

## Context
Frontend stack: React 18 + TypeScript + Vite
Backend: Spring Boot microservices (auth-service running on localhost:8080)
State management: Zustand (persist middleware)
HTTP layer: Axios with JWT interceptor + silent refresh
Routing: React Router v6

---

## Done ✅

- [x] **Project Structure**: Migrated from flat file structure to domain-based architecture
    - `src/pages/` split into domain folders: `auth/`, `dashboard/`, `planning/`, `absences/`, `avancement/`
    - `src/services/` split into domain folders mirroring Spring microservices: `http/`, `auth/`, `planning/`, `absences/`, `avancement/`, `paiements/`, `users/`, `notifications/`
    - `src/types/` created with shared `User`, `Role` interfaces
    - `src/hooks/` created for cross-cutting logic
    - `src/store/` created for global client state

- [x] **Clean Architecture — Services Layer**: Each domain service follows a strict 4-file pattern:
    - `*.api.ts` — raw Axios calls, only file that knows URL paths
    - `*.mapper.ts` — Spring DTO ↔ frontend domain type conversion
    - `*.service.ts` — business logic and orchestration
    - `*.types.ts` — Spring DTOs (suffixed `DTO`) + frontend interfaces

- [x] **HTTP Infrastructure** (`src/services/http/`):
    - `apiClient.ts` — single Axios instance, baseURL from `VITE_API_GATEWAY_URL`
    - `interceptors.ts` — JWT Bearer injection on every request, silent refresh on 401, request queue during refresh
    - `authStoreRef.ts` — late-bound store reference to break circular dependency between interceptors and authStore
    - `http.types.ts` — `ApiResponse<T>`, `PagedResponse<T>`, `ApiError` interfaces

- [x] **Auth Service** wired to real Spring endpoints:
    - `POST /api/auth/signin` — login with `{ email, password }`
    - `POST /api/auth/refreshtoken` — refresh with `{ refreshToken }`
    - Spring `JwtResponse` fields mapped: `token` (not `accessToken`), `refreshToken`, `id`, `email`, `roles[]`
    - Role normalization: `ROLE_ADMIN` / `ADMIN` → `admin` (lowercase)

- [x] **Auth Store** (`src/store/authStore.ts`):
    - Zustand store with `persist` middleware → stored in localStorage as `edu-auth`
    - Fields: `user`, `token`, `refreshToken`
    - Actions: `setAuth(user, token, refreshToken)`, `logout()`

- [x] **useAuth Hook** (`src/hooks/useAuth.ts`):
    - Wraps `authService.login()` + `authStore.setAuth()`
    - `logout()` calls service then clears store and navigates to `/login`
    - Replaces old `AuthContext` / `AuthProvider` pattern entirely

- [x] **LoginPage refactored** (`src/pages/Auth/LoginPage.tsx`):
    - Removed direct `api.post()` call — now calls `useAuth().login()`
    - Removed `useAuth` from old `AuthContext` — now from `@/hooks/useAuth`
    - Error typed as `unknown` with `getErrorMessage()` helper (no `any`)
    - UI/UX unchanged — same design, same CSS

- [x] **App.tsx cleaned up**:
    - Removed `AuthProvider` wrapper — no longer needed
    - `ProtectedRoute` reads from `useAuthStore` directly
    - `AppRoute` wrapper component eliminates repetition per protected route
    - Routes registered: `/`, `/planning`, `/absences`, `/avancement`

- [x] **AppShell Layout** (`src/layouts/MainLayout.tsx`):
    - Composes `Sidebar` + `Topbar` + page `children`
    - Auto-resolves page title and subtitle from current route path via `PAGE_TITLES` map

- [x] **Sidebar** (`src/components/layout/Sidebar.tsx`):
    - Role-aware navigation — filters `NAV_ITEMS` by `user.role`
    - Nav items: Dashboard, Planning, Absences, Avancement, Paiements, Utilisateurs, Paramètres
    - Shows user initials avatar, name, role in footer
    - Logout button calls `useAuth().logout()`
    - Active route highlighted via React Router `NavLink`

- [x] **Topbar** (`src/components/layout/Topbar.tsx`):
    - Displays current page title + subtitle
    - Search input (client-side, UI only for now)
    - Notification bell with unread dot
    - User avatar chip with name + role

- [x] **Dashboard Page** (`src/pages/dashboard/DashboardPage.tsx`):
    - 4 stat cards: Étudiants, Enseignants, Absences aujourd'hui, Paiements dus
    - Absences récentes table with status badges (Justifié / Non justifié / En attente)
    - Paiements table with état badges (Payé / Partiel / Impayé)
    - Avancement progress bars per group
    - Mini weekly planning grid
    - All data: mock (ready to wire to services)

- [x] **Planning Page** (`src/pages/planning/PlanningPage.tsx`):
    - Weekly calendar grid (Google Calendar style)
    - 5-day view (Mon–Fri), hours 08:00–17:00
    - Week navigation with prev/next chevrons + "Aujourd'hui" reset
    - Color-coded créneau cards per module (blue/teal/amber/purple/red)
    - Click créneau → detail panel overlay (module, groupe, enseignant, salle, horaire)
    - "Nouveau créneau" button (UI only — modal pending)
    - All data: mock (ready to wire to `planningService.getWeek()`)

- [x] **Absences Page** (`src/pages/absences/AbsencesPage.tsx`):
    - 4 summary stat cards (Total / Absences / Retards / Présences)
    - Search by étudiant name or module
    - Filter by groupe (dropdown) + statut tabs (Tous / Présent / Absent / Retard)
    - Export button (UI only — handler pending)
    - Full table: étudiant, groupe, module, date, horaire, statut badge, justifié badge
    - Inline mark actions per row: Présent / Retard / Absent toggle buttons
    - Local state update on mark (ready to wire to `absencesService.mark()`)
    - All data: mock

- [x] **Avancement Page** (`src/pages/avancement/AvancementPage.tsx`):
    - 4 summary cards: Progression globale (avg %), Modules actifs, Groupes suivis, Modules complétés
    - 3-column grid of module cards
    - Each card: module name, groupe, enseignant, global progress bar + percentage
    - Expandable detail per card: Chapitres / TPs / Compétences with individual progress bars and done/total count
    - Toggle expand/collapse per card independently
    - All data: mock (ready to wire to `avancementService.getByGroupe()`)

---

## In Progress 🔄

- [ ] **Paiements Page** — table with plan (Inscription / Mensuel), état (Payé / Partiel / Impayé), alertes retard
- [ ] **Users Page** — admin-only CRUD table, create/edit user modal with role selector
- [ ] **Forgot Password Page** — email input form, wired to `POST /api/auth/forgot-password`

---

## Pending 📋

- [ ] **Créneau Modal** — create/edit form: module, groupe, enseignant, salle, jour, horaire
- [ ] **Justificatif Modal** — file upload for absence justification
- [ ] **Notifications Panel** — slide-in drawer from topbar bell, list of unread alerts
- [ ] **Settings Page** — admin config panel
- [ ] **TanStack Query integration** — replace mock data with real service calls across all pages
- [ ] **Error boundary** — global fallback UI for uncaught runtime errors
- [ ] **403 / 404 pages** — `src/pages/errors/`
- [ ] **Role-gated UI** — hide/show buttons and actions based on `user.role` (e.g. mark-absence only for Enseignant/Scolarité)
- [ ] **Responsive layout** — mobile sidebar collapse, stacked grids on small screens

---

## Architecture Decisions

| Decision | Choice | Reason |
|---|---|---|
| Auth state | Zustand + persist | Replaces Context — survives page refresh via localStorage |
| HTTP client | Single Axios instance | One interceptor handles JWT for all 6+ microservices |
| Circular dep fix | `authStoreRef.ts` late-bind | Interceptors can't import store at module load time |
| Service pattern | api / mapper / service / types | Isolates Spring DTO changes to mapper only |
| Role normalization | `ROLE_ADMIN` → `admin` | Spring prefix stripped, lowercase for TS union consistency |
| Page structure | Domain folders | Colocation — page + its components + CSS in one place |
| Route protection | `AppRoute` wrapper | Single wrapper eliminates `ProtectedRoute + MainLayout` repetition |

---

## Environment
```env
VITE_API_GATEWAY_URL=http://localhost:8080/api
```

## Key File Map
```
src/
├── services/
│   ├── http/
│   │   ├── apiClient.ts          ← Axios instance
│   │   ├── interceptors.ts       ← JWT inject + silent refresh
│   │   ├── authStoreRef.ts       ← breaks circular dep
│   │   └── http.types.ts         ← ApiResponse, PagedResponse
│   └── auth/
│       ├── auth.api.ts           ← POST /auth/signin, /auth/refreshtoken
│       ├── auth.mapper.ts        ← JwtResponse → User + tokens
│       ├── auth.service.ts       ← login(), logout()
│       └── auth.types.ts         ← LoginRequestDTO, AuthResponseDTO
├── store/
│   └── authStore.ts              ← user, token, refreshToken (persisted)
├── hooks/
│   └── useAuth.ts                ← login(), logout(), isAuthenticated
├── types/
│   └── user.types.ts             ← User, Role
├── layouts/
│   └── MainLayout.tsx            ← Sidebar + Topbar + children
├── components/layout/
│   ├── Sidebar.tsx               ← role-aware nav
│   └── Topbar.tsx                ← search + bell + user chip
└── pages/
    ├── Auth/LoginPage.tsx        ← thin view, calls useAuth().login()
    ├── dashboard/DashboardPage   ← stats + tables + mini planning
    ├── planning/PlanningPage     ← weekly calendar grid
    ├── absences/AbsencesPage     ← table + filters + inline marking
    └── avancement/AvancementPage ← module cards + expandable detail
```