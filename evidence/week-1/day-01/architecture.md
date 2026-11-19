# Architecture Notes — Day 01

## What's the Employee Management feature about?

It's a CRUD feature for managing employees — list them, view details, create new ones, edit existing ones. The routes load and render, but no feature logic is implemented yet. All
components show "works!" placeholder text.

## Folder structure

The AI analysed the repo; I then verified the points below against the code.

```
src/app/
├── app.config.ts            ← providers setup
├── app.routes.ts            ← top-level routes
├── app.ts                   ← root component
├── app.html                 ← contains only <router-outlet />
├── app.scss                 ← empty
├── app.spec.ts              ← basic smoke test
│
├── core/
│   ├── auth/                ← empty, nothing here
│   ├── constants/           ← empty
│   ├── interceptors/        ← empty
│   ├── models/              ← empty
│   └── services/
│       ├── auth.service.ts       ← empty class, no methods
│       └── auth.service.spec.ts
│
├── features/
│   ├── dashboard/           ← completely empty folder
│   ├── departments/
│   │   └── pages/department-list/   ← shell component, no routes file
│   └── employees/
│       ├── employees.routes.ts      ← 4 routes defined, all lazy-loaded
│       ├── components/
│       │   └── employee-card/       ← shell component
│       ├── models/
│       │   └── employee.ts          ← empty interface: Employee {}
│       ├── pages/
│       │   ├── employee-list/       ← shell
│       │   ├── employee-detail/     ← shell
│       │   └── employee-form/       ← shell
│       └── services/
│           ├── employee.service.ts       ← empty class
│           └── employee.service.spec.ts
│
├── layouts/
│   ├── footer/              ← empty
│   ├── header/              ← empty
│   └── sidebar/             ← empty
│
└── shared/
    ├── components/          ← empty
    ├── directives/          ← empty
    ├── models/              ← empty
    ├── pipes/               ← empty
    ├── validators/          ← empty
    └── ui/
        ├── button/          ← empty
        ├── modal/           ← empty
        ├── spinner/         ← empty
        └── toast/           ← empty
```

17 folders are completely empty — just placeholders for future work.

## What each folder is for

| Folder | What goes here |
|---|---|
| `core/` | Stuff used across the whole app — auth guards, interceptors, shared services, constants |
| `features/` | Each feature gets its own folder. Lazy-loaded independently |
| `features/employees/pages/` | Routed components — the actual pages users navigate to |
| `features/employees/components/` | Reusable child components (like employee-card) that pages use |
| `features/employees/models/` | TypeScript interfaces for employee data |
| `features/employees/services/` | Service that handles API calls for employees |
| `layouts/` | App shell pieces — header, sidebar, footer (none built yet) |
| `shared/` | Components, pipes, directives that multiple features could reuse |

## Component types

Looking at what's scaffolded, I can see the pattern:

- **Page components** (routed): EmployeeList, EmployeeDetail, EmployeeForm — these are what the router loads
- **Presentational components**: EmployeeCard — meant to display a single employee, probably gets data via input()
- **Services**: EmployeeService — will handle HTTP calls. AuthService is in core/
- **Models**: Employee interface — will define the shape of employee data

All of these are empty shells right now. No real logic anywhere.

## How data is supposed to flow

Based on the folder layout and AGENTS.md rules (not from actual code — nothing's implemented):

```
User navigates to /employees
  → Router loads EmployeeList (page component)
    → EmployeeList injects EmployeeService
      → EmployeeService makes HTTP call to API
        → API returns employee data
      → Service exposes data as signal/observable
    → EmployeeList passes individual employee to EmployeeCard via input()
    → EmployeeCard emits events back via output()
```

This is what the architecture *intends* — I haven't seen it working yet.

## Routing

**Top-level routes** in `app.routes.ts`:
- `''` redirects to `employees`
- `'employees'` lazy-loads the employee feature routes via `loadChildren`

**Employee feature routes** in `employees.routes.ts`:
- `''` → EmployeeList (the main list page)
- `'new'` → EmployeeForm (create)
- `':id'` → EmployeeDetail (view one employee)
- `':id/edit'` → EmployeeForm (edit — same component reused)

Each component is lazy-loaded individually with `loadComponent`.

Departments and dashboard have no routes set up yet.

## Why this structure makes sense

- **Feature folders** keep related code together — when I work on employees, everything's in one place
- **Lazy loading** means the browser only downloads code for the feature the user navigates to
- **Separation** between pages/components/services/models keeps things organized as the feature grows
- **Every component has a spec file** — testability is built in from the start

## What's actually done vs not done

| What | Done? |
|---|---|
| Folder structure | ✅ Set up |
| Employee routes | ✅ Defined (4 routes, lazy-loaded) |
| Top-level routes | ✅ Redirect + employees route |
| HttpClient provider | ✅ In app.config.ts |
| Employee interface | ⚠️ Exists but empty — no properties |
| EmployeeService | ⚠️ Exists but empty — no methods |
| Page components | ⚠️ Shells only — just "works!" text |
| EmployeeCard | ⚠️ Shell only |
| OnPush change detection | ❌ Not on any component (AGENTS.md says it's required) |
| Layout components | ❌ Empty folders |
| Shared UI components | ❌ Empty folders |
| Dashboard feature | ❌ Empty folder |
| App shell (app.html) | ✅ Welcome page replaced with router-outlet |
| Department routes | ❌ Not created |

## Evidence checklist

- [ ] Screenshot: folder structure — [FILL IN]
- [ ] Screenshot: app running at /employees — [FILL IN]
- [x] Screenshot: test results — test-results.png
- [ ] Commit hash — [FILL IN]
