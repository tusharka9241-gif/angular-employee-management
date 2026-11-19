# Repo Analysis — Day 01

## Versions

Checked `package.json` and ran version commands:

- **Angular**: ^21.2.0 (all @angular/* packages)
- **Angular CLI**: ^21.2.4
- **TypeScript**: ~5.9.2
- **Node**: v24.14.1
- **npm**: 11.11.0 (also set as `packageManager` in package.json)

## Dependencies

**Runtime** — the stuff that ships to users:

- `@angular/core`, `common`, `compiler`, `forms`, `platform-browser`, `router` — all ^21.2.0
- `rxjs` ~7.8.0 — for observables
- `tslib` ^2.3.0 — TS helper functions

**Dev** — build and test tools:

- `@angular/build` ^21.2.4 — the esbuild-based builder
- `@angular/cli` ^21.2.4
- `@angular/compiler-cli` ^21.2.0 — AOT compilation
- `typescript` ~5.9.2
- `vitest` ^4.0.8 — test runner (not Karma/Jasmine)
- `jsdom` ^28.0.0 — fake DOM for tests
- `prettier` ^3.8.1 — code formatting

**What's missing:**
- No CSS framework (no Material, Tailwind, Bootstrap, nothing)
- No state management lib (no NgRx etc.)
- No ESLint — only Prettier for formatting
- No e2e testing tool

## How the app starts up

Traced through the bootstrap chain:

1. **`main.ts`** calls `bootstrapApplication(App, appConfig)` — standalone API, no NgModule
2. **`app.config.ts`** provides three things:
   - `provideBrowserGlobalErrorListeners()` — global error handling
   - `provideRouter(routes)` — hooks up the router
   - `provideHttpClient(withFetch())` — enables HttpClient with fetch backend
3. **`app.routes.ts`** has two routes:
   - `''` → redirects to `employees`
   - `'employees'` → lazy-loads `EMPLOYEE_ROUTES`
4. **`app.ts`** is the root component, imports `RouterOutlet`, has a signal for the title

The build entry point is `src/main.ts` (set in `angular.json`). Builder is `@angular/build:application`.

## Coding conventions

Went through `AGENTS.md`, `.prettierrc`, and `.editorconfig`. Here's what I need to follow:

**Angular stuff:**
- Standalone components always — no NgModules, don't set `standalone: true` (it's the default in v21)
- Use `signal()`, `computed()`, `input()`, `output()` — not the old decorators
- Use `inject()` for DI — not constructor injection
- Set `changeDetection: ChangeDetectionStrategy.OnPush` on every component
- Use `@if`, `@for`, `@switch` — not `*ngIf` etc.
- Prefer reactive forms
- Lazy-load feature routes
- Use `host` property instead of `@HostBinding`/`@HostListener`
- Use `[class.*]` and `[style.*]` — not `ngClass`/`ngStyle`

**TypeScript:**
- Strict mode is on (checked tsconfig.json — `strict: true` plus several extra flags)
- No `any` — use `unknown` if unsure
- Let TS infer types when it's obvious

**Formatting:**
- 2-space indent (editorconfig)
- Single quotes in TS
- 100 char line width (prettier)
- HTML uses Angular parser in Prettier

**Accessibility:**
- Must pass AXE checks
- Must meet WCAG AA — focus management, contrast, ARIA

**File naming:**
- Components use bare names: `employee-list.ts`, not `employee-list.component.ts`
- Same for templates: `employee-list.html`
- Selector prefix: `app-`
- Styles: SCSS

## Risks and gaps I noticed

1. **17 empty directories** — Git won't track these. They'll disappear on clone unless .gitkeep files are added or real files go in them.

2. **Environment files are empty** — Both `environment.ts` and `environment.development.ts` just export `{}`. No `apiUrl` or anything. However, `angular.json` does have `fileReplacements` configured under the `development` configuration (lines 54–59) to swap `src/environments/environment.ts` with `src/environments/environment.development.ts` during dev builds. So the swap mechanism is in place — it's just that neither file has any config values yet.

3. **None of the components have OnPush** — AGENTS.md says it's required but none of the existing 6 components set it. Need to add it as I implement them.

4. **Employee interface is empty** — `export interface Employee {}` — has no properties. Need to define the actual shape.

5. **EmployeeService and AuthService are empty** — Just empty classes with `providedIn: 'root'`. No methods, no HttpClient injection.

6. **RESOLVED: app.html now contains only `<router-outlet />`** — the 344-line default welcome page has been replaced.

7. **No linter** — Prettier handles formatting but there's no ESLint for catching actual code issues.

8. **No e2e tests** — Only unit tests via Vitest. No Cypress or Playwright.

9. **Departments and dashboard not wired up** — Department has a component but no routes. Dashboard is just an empty folder.

10. **Tests run and pass** — Ran `ng test` (Vitest v4.1.12): 8 test files,
    8 tests, all passed. These are only "should create" smoke tests on empty
    shells, so they prove the setup works but do not cover any business logic.
    Real tests start on Day 9.

11. **No CI/CD config** — No GitHub Actions, no Jenkinsfile, nothing.

12. **Production budget** is 500kB warning / 1MB error — need to keep lazy loading in mind.
