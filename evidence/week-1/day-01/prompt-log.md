# Prompt Log — Day 01

## Prompt 1: create the evidence files

You are helping me document Day 1 of my Angular learning plan. This is an
evidence task only.

RULES
- Do NOT modify, rename or delete any existing file or folder.
- Only create new files inside: evidence/week-1/day-01/
- Do not invent anything. Base every statement on the actual repository.
  If something is missing or empty, say so and mark it "not implemented yet".
- Do not include secrets, tokens, credentials or personal data.
- Do not make up commit hashes, dates, screenshots or test results. Leave a
  clearly marked placeholder like [FILL IN] for anything you cannot verify.

STEP 1: Inspect the repository (read-only)
Look at: package.json, angular.json, tsconfig files, src/main.ts,
src/app/app.config.ts, src/app/app.routes.ts, src/environments/,
every folder under src/app/, src/app/features/employees/employees.routes.ts,
and AGENTS.md. Report the Angular version and key dependencies as listed
in package.json.

STEP 2: Create these files

1) evidence/week-1/day-01/architecture.md with these sections:
   - Purpose of the Employee Management feature
   - Actual folder structure (a tree taken from the real repo)
   - Responsibility of each folder (table)
   - Component responsibilities (page vs presentational vs service vs model)
   - Data flow (text diagram: page -> service -> API -> page -> child)
   - Routing (top-level routes, lazy loading, feature routes as they exist
     in the code)
   - Why this structure (maintainability, lazy loading, testability)
   - Current status: what exists, what is an empty shell, what is planned
   - Evidence checklist with placeholders for screenshots and commit hash

2) evidence/week-1/day-01/repo-analysis.md containing:
   - Angular and Node/npm versions as found in the project
   - Dependencies and devDependencies summary
   - How the app bootstraps (main.ts, app.config.ts providers)
   - Coding conventions found (from AGENTS.md, .prettierrc, .editorconfig)
   - Risks, gaps or things to watch before adding features
     (for example empty folders Git will not track, missing environment
     config, missing tests)

3) evidence/week-1/day-01/prompt-log.md using this structure:
   - Prompt: (this exact prompt)
   - AI recommendation: (summary of what you produced)
   - My decision: [FILL IN: accepted / modified / rejected and why]
   - Files created: (list)
   - Verification: [FILL IN: how I checked each claim against the code]

STEP 3: Final report
List every file you created, and list every statement you were unsure about
so I can verify it manually. Do not run git commit.

## Prompt 2: create review-bundle.md

Create ONE new file: evidence/week-1/day-01/review-bundle.md
Do not modify, rename or delete any other file. Do not include secrets,
tokens, credentials, .env contents or personal data. Do not invent anything;
if something is missing or empty, say "empty" or "not implemented".

Include these sections, taken from the actual repository:

1. Versions: Angular, TypeScript, Node/npm (from package.json and angular.json)
2. Folder tree of src/app (folders and files only, up to 4 levels deep)
3. Contents of these files, pasted in full inside code blocks:
   - src/main.ts
   - src/app/app.config.ts
   - src/app/app.routes.ts
   - src/app/features/employees/employees.routes.ts
4. For every file under src/app/features/employees/: its path and the
   first 15 lines
5. Any errors or warnings you see by reading the code (do not run commands)
6. A list of anything you were unsure about

## Prompt 3: replace outdated text

Update my Day 1 evidence files so they match the CURRENT state of the repo.
Do not change any file outside evidence/week-1/day-01/. Do not modify source
code. Do not run git commit. Do not invent anything.

FILES TO EDIT
- evidence/week-1/day-01/architecture.md
- evidence/week-1/day-01/repo-analysis.md
- evidence/week-1/day-01/prompt-log.md

STEP 1: Verify first (read-only)
a) Open src/app/app.html. Does it contain only <router-outlet />?
b) Open angular.json. Is "fileReplacements" configured under the
   "development" configuration? Quote the exact lines you found.
c) Open AGENTS.md. Does it require OnPush on every component?
d) Check which of the 17 empty folders now contain a .gitkeep file.

STEP 2: Edits (apply only if Step 1 confirms it)

architecture.md
1. In the folder tree, change the app.html line from "still the default
   Angular welcome page" to "contains only <router-outlet />".
2. In the "What's actually done vs not done" table, add a row:
   | App shell (app.html) | ✅ Welcome page replaced with router-outlet |
3. Replace the sentence "I went through the whole repo" with:
   "The AI analysed the repo; I then verified the points below against
   the code."

repo-analysis.md
4. Risk 6 (app.html is still the default): mark it as
   "RESOLVED: app.html now contains only <router-outlet />" or remove it.
5. Risk 2: correct the fileReplacements statement to match exactly what
   you found in angular.json in Step 1b.
6. If .gitkeep files now exist, update Risk 1 (empty directories) to say
   which folders are tracked now.

prompt-log.md
7. Add a section "## Corrections found after review" listing every
   statement you changed above, with the old text and the new text.
8. Do NOT fill in "My decision" or "Verification". Leave the [FILL IN]
   markers for me.

STEP 3: Final report
List each change you made (file, old line, new line), anything in Step 1
that did not match what I described, and anything you were unsure about.

## What the AI produced

- Went through every file in the repo — package.json, angular.json, tsconfigs,
  all files under src/app/, environments, AGENTS.md, prettierrc, editorconfig
- Found the repo has way more structure than just the scaffold — there's a
  full features/employees/ folder with routes, pages, components, models,
  services (all empty shells)
- Found 17 empty placeholder directories across core/, shared/, layouts/,
  and features/dashboard/
- Documented that app.config.ts already has provideHttpClient(withFetch())
  and app.routes.ts has routes pointing to the employees feature
- Noted that nothing actually works yet — all components just show "works!"
- Called out things that don't match AGENTS.md rules (no OnPush, no inject()
  usage yet)
- Listed 12 risks/gaps including empty dirs, no linter, no e2e, empty
  environment configs

## My decision

Modified. I accepted the folder tree, routes, versions and conventions after
checking them against the code. I corrected five outdated or wrong
statements (see "Corrections found after review"), including the false
claim that angular.json had no fileReplacements. I rejected: nothing else.

## Files created

1. `evidence/week-1/day-01/architecture.md`
2. `evidence/week-1/day-01/repo-analysis.md`
3. `evidence/week-1/day-01/prompt-log.md`
4. `evidence/week-1/day-01/review-bundle.md`

## Verification

- Versions in package.json match repo-analysis.md: yes
- app.config.ts has 3 providers: yes
- app.routes.ts has 2 routes; employees.routes.ts has 4: yes
- Shell classes are empty: yes
- 17 empty folders confirmed, none with .gitkeep: yes
- ng serve: /employees, /employees/new, /employees/1 and /employees/1/edit
  each load their placeholder page; Network tab shows lazy chunks
- ng test: 8 test files, 8 tests passed (Vitest v4.1.12). Screenshot saved
  as test-results.png.
- Commit: [FILL IN: hash from git log --oneline -1]

## Corrections found after review

Went back and checked the evidence files against the current repo state.
Five things were wrong or outdated, and one check needed no change:

1. **architecture.md — folder tree, app.html line**
   - Old: `├── app.html                 ← still the default Angular welcome page`
   - New: `├── app.html                 ← contains only <router-outlet />`
   - Why: app.html was cleaned up. It now has 1 line (`<router-outlet />`), not the 344-line scaffold.

2. **architecture.md — "What's actually done" table**
   - Old: no row for app shell
   - New: added `| App shell (app.html) | ✅ Welcome page replaced with router-outlet |`
   - Why: needed to reflect that the welcome page replacement is done.

3. **architecture.md — intro sentence**
   - Old: `I went through the whole repo. Here's what's actually there:`
   - New: `The AI analysed the repo; I then verified the points below against the code.`
   - Why: more accurate about who did what.

4. **repo-analysis.md — Risk 6 (app.html)**
   - Old: `app.html is still the default — The 344-line Angular welcome page is still there. Need to replace it with a real app shell.`
   - New: `RESOLVED: app.html now contains only <router-outlet /> — the 344-line default welcome page has been replaced.`
   - Why: the file was changed since the evidence was first written.

5. **repo-analysis.md — Risk 2 (fileReplacements)**
   - Old: `Also no fileReplacements in angular.json to swap them during builds.`
   - New: corrected to say `angular.json` does have `fileReplacements` under the `development` configuration (lines 54–59), swapping `environment.ts` with `environment.development.ts`. The swap mechanism is there — only the config values inside the files are still empty.
   - Why: the original claim was wrong. `fileReplacements` exists in angular.json and may have been there all along (I missed it on the first pass).

6. **Empty directories / .gitkeep** — checked all 17 empty folders again. None of them have `.gitkeep` files. No change needed; Risk 1 in repo-analysis.md is still accurate.
