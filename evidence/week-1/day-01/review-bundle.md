> Note: generated before the app.html fix and before running Prettier.
> Item 8 is resolved (app.html now contains only <router-outlet />) and
> items 4-6 are formatting issues fixed by Prettier. See prompt-log.md,
> "Corrections found after review".

# Review Bundle — Day 01

## 1. Versions

From `package.json`:
- Angular (`@angular/core` and all `@angular/*`): **^21.2.0**
- Angular CLI / Build: **^21.2.4**
- TypeScript: **~5.9.2**
- npm (from `packageManager` field): **npm@11.11.0**

From `angular.json`:
- Builder: `@angular/build:application`
- Schema version: 1

Node version is not pinned in the repo. My machine has v24.14.1 but yours may differ.

---

## 2. Folder tree of src/app (up to 4 levels)

```
src/app/
├── app.config.ts
├── app.html
├── app.routes.ts
├── app.scss                              ← empty
├── app.spec.ts
├── app.ts
│
├── core/
│   ├── auth/                             ← empty
│   ├── constants/                        ← empty
│   ├── interceptors/                     ← empty
│   ├── models/                           ← empty
│   └── services/
│       ├── auth.service.ts
│       └── auth.service.spec.ts
│
├── features/
│   ├── dashboard/                        ← empty
│   ├── departments/
│   │   └── pages/
│   │       └── department-list/
│   │           ├── department-list.ts
│   │           ├── department-list.html
│   │           ├── department-list.scss
│   │           └── department-list.spec.ts
│   └── employees/
│       ├── employees.routes.ts
│       ├── components/
│       │   └── employee-card/
│       │       ├── employee-card.ts
│       │       ├── employee-card.html
│       │       ├── employee-card.scss
│       │       └── employee-card.spec.ts
│       ├── models/
│       │   └── employee.ts
│       ├── pages/
│       │   ├── employee-detail/
│       │   │   ├── employee-detail.ts
│       │   │   ├── employee-detail.html
│       │   │   ├── employee-detail.scss
│       │   │   └── employee-detail.spec.ts
│       │   ├── employee-form/
│       │   │   ├── employee-form.ts
│       │   │   ├── employee-form.html
│       │   │   ├── employee-form.scss
│       │   │   └── employee-form.spec.ts
│       │   └── employee-list/
│       │       ├── employee-list.ts
│       │       ├── employee-list.html
│       │       ├── employee-list.scss
│       │       └── employee-list.spec.ts
│       └── services/
│           ├── employee.service.ts
│           └── employee.service.spec.ts
│
├── layouts/
│   ├── footer/                           ← empty
│   ├── header/                           ← empty
│   └── sidebar/                          ← empty
│
└── shared/
    ├── components/                       ← empty
    ├── directives/                       ← empty
    ├── models/                           ← empty
    ├── pipes/                            ← empty
    ├── validators/                       ← empty
    └── ui/
        ├── button/                       ← empty
        ├── modal/                        ← empty
        ├── spinner/                      ← empty
        └── toast/                        ← empty
```

---

## 3. Full file contents

### src/main.ts

```typescript
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
```

### src/app/app.config.ts

```typescript
import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withFetch()),
  ]
};
```

### src/app/app.routes.ts

```typescript
import { Routes } from '@angular/router';

export const routes: Routes = [
    { path:'',pathMatch:'full',redirectTo:'employees'},
    { path:'employees', loadChildren: () => import('./features/employees/employees.routes').then(m=>m.EMPLOYEE_ROUTES),}
];
```

### src/app/features/employees/employees.routes.ts

```typescript
import { Routes } from '@angular/router';

export const EMPLOYEE_ROUTES: Routes = [
    { path :'', loadComponent: ()=> import('./pages/employee-list/employee-list').then(m=> m.EmployeeList)},
    { path: 'new', loadComponent: ()=> import('./pages/employee-form/employee-form').then(m=> m.EmployeeForm)},
    { path: ':id', loadComponent: () => import('./pages/employee-detail/employee-detail').then(m => m.EmployeeDetail) },
    { path: ':id/edit', loadComponent: () => import('./pages/employee-form/employee-form').then(m => m.EmployeeForm) },

]
```

---

## 4. Every file under src/app/features/employees/ — first 15 lines

### employees.routes.ts (9 lines total — shown in full above)

### models/employee.ts (1 line total)

```typescript
export interface Employee {}
```

That's the entire file. The interface is empty — no properties defined.

### services/employee.service.ts (6 lines total)

```typescript
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {}
```

Empty class. No methods, no HttpClient injection.

### services/employee.service.spec.ts (first 15 lines of 16)

```typescript
import { TestBed } from '@angular/core/testing';

import { EmployeeService } from './employee.service';

describe('EmployeeService', () => {
  let service: EmployeeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
```

(line 16 is the closing `});`)

### components/employee-card/employee-card.ts (9 lines total)

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-employee-card',
  imports: [],
  templateUrl: './employee-card.html',
  styleUrl: './employee-card.scss',
})
export class EmployeeCard {}
```

### components/employee-card/employee-card.html (1 line)

```html
<p>employee-card works!</p>
```

### components/employee-card/employee-card.scss

empty

### components/employee-card/employee-card.spec.ts (first 15 lines of 22)

```typescript
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeCard } from './employee-card';

describe('EmployeeCard', () => {
  let component: EmployeeCard;
  let fixture: ComponentFixture<EmployeeCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeCard],
    }).compileComponents();

    fixture = TestBed.createComponent(EmployeeCard);
    component = fixture.componentInstance;
```

### pages/employee-list/employee-list.ts (9 lines total)

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-employee-list',
  imports: [],
  templateUrl: './employee-list.html',
  styleUrl: './employee-list.scss',
})
export class EmployeeList {}
```

### pages/employee-list/employee-list.html (1 line)

```html
<p>employee-list works!</p>
```

### pages/employee-list/employee-list.scss

empty

### pages/employee-list/employee-list.spec.ts (first 15 lines of 22)

```typescript
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeList } from './employee-list';

describe('EmployeeList', () => {
  let component: EmployeeList;
  let fixture: ComponentFixture<EmployeeList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeList],
    }).compileComponents();

    fixture = TestBed.createComponent(EmployeeList);
    component = fixture.componentInstance;
```

### pages/employee-detail/employee-detail.ts (9 lines total)

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-employee-detail',
  imports: [],
  templateUrl: './employee-detail.html',
  styleUrl: './employee-detail.scss',
})
export class EmployeeDetail {}
```

### pages/employee-detail/employee-detail.html (1 line)

```html
<p>employee-detail works!</p>
```

### pages/employee-detail/employee-detail.scss

empty

### pages/employee-detail/employee-detail.spec.ts (first 15 lines of 22)

```typescript
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeDetail } from './employee-detail';

describe('EmployeeDetail', () => {
  let component: EmployeeDetail;
  let fixture: ComponentFixture<EmployeeDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeDetail],
    }).compileComponents();

    fixture = TestBed.createComponent(EmployeeDetail);
    component = fixture.componentInstance;
```

### pages/employee-form/employee-form.ts (9 lines total)

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-employee-form',
  imports: [],
  templateUrl: './employee-form.html',
  styleUrl: './employee-form.scss',
})
export class EmployeeForm {}
```

### pages/employee-form/employee-form.html (1 line)

```html
<p>employee-form works!</p>
```

### pages/employee-form/employee-form.scss

empty

### pages/employee-form/employee-form.spec.ts (first 15 lines of 22)

```typescript
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeForm } from './employee-form';

describe('EmployeeForm', () => {
  let component: EmployeeForm;
  let fixture: ComponentFixture<EmployeeForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeForm],
    }).compileComponents();

    fixture = TestBed.createComponent(EmployeeForm);
    component = fixture.componentInstance;
```

---

## 5. Errors and warnings (from reading the code, not running it)

1. **No `changeDetection: ChangeDetectionStrategy.OnPush`** on any component. AGENTS.md says this is required on every component. Affects: EmployeeList, EmployeeDetail, EmployeeForm, EmployeeCard, App, DepartmentList.

2. **`Employee` interface is empty** — `export interface Employee {}`. Any code that tries to access employee properties will have no type safety until fields are added.

3. **`EmployeeService` has no methods and no injected `HttpClient`** — it's just an empty class. The `provideHttpClient(withFetch())` is set up in app.config.ts but nothing uses it yet.

4. **`employees.routes.ts` has no trailing newline** and has a trailing comma after the last route object plus an empty line before the closing `]`. Minor formatting inconsistency, not a bug.

5. **`app.routes.ts` has inconsistent spacing** — no spaces around `:` in `path:''` but the rest of the codebase uses spaces. Prettier would fix this but it may not have been run.

6. **`employees.routes.ts` has inconsistent spacing** — `path :''` has a space before the colon on line 4 but not on lines 5-7. Same thing: Prettier would fix it.

7. **All `.scss` files are empty** — employee-card.scss, employee-list.scss, employee-detail.scss, employee-form.scss, app.scss. No styles anywhere in the feature.

8. **`app.html` is still the default Angular scaffold** (344 lines of welcome page SVG/CSS). The `<router-outlet />` is at the very end so routed content will render below the welcome page, not replace it.

9. **Environment files export empty objects** — both `environment.ts` and `environment.development.ts` are just `export const environment = {};`. No `apiUrl` or any config defined. The `fileReplacements` for environment swapping IS configured in `angular.json` under the `development` configuration though.

10. **17 empty directories** — git won't track them without a `.gitkeep` or a real file inside. They'll disappear on clone.

11. **Components use `imports: []`** (empty array) — not wrong, but means no directives/pipes/components are imported. When implementing, they'll need to import things like `RouterLink`, `ReactiveFormsModule`, etc.

---

## 6. Things I'm unsure about

1. **Whether the tests actually pass** — I read the spec files and they look correct for empty shell components, but I didn't run `npm test` or `npx vitest`. Can't confirm without executing.

2. **Exact installed versions vs declared ranges** — `package.json` says `^21.2.0` for Angular but the actual resolved version in `node_modules` could be 21.2.0 or any compatible minor/patch. I didn't read `package-lock.json` to check.

3. **Whether `styleUrl` (singular) works in Angular 21** — all components use `styleUrl: './something.scss'` (singular) rather than `styleUrls: ['./something.scss']` (array). This is valid in Angular 17.2+, but I want to confirm it's not causing issues by actually serving the app.

4. **Whether the 17 empty directories are tracked in git** — they might have `.gitkeep` files that I missed, or they might just be local. I didn't run `git status` to check.

5. **Node version compatibility** — my machine shows v24.14.1. The repo doesn't pin a Node version (no `.nvmrc`, no `engines` field in package.json). Not sure if Angular 21 has a minimum Node requirement I should check.
