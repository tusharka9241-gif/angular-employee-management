# Type Safety Review — Day 02

| # | AI finding | Avoidable? | My decision | Why | How I verified |
|---|---|---|---|---|---|
| 1 | toEmployee(raw: any): any | Yes | Accepted (unknown + type guard, returns Employee) | any hid missing or invalid fields | tsc clean; test for invalid input |
| 2 | filterByStatus(list: any[], status: any) | Yes | Accepted (Employee[], EmployeeStatus) | Prevents invalid statuses | TS2345 on 'archived' (compile-error.png) |
| 3 | parseEmployees(): any | Yes | Accepted, plus try/catch the AI described but did not write | JSON.parse output is untrusted | Tests: bad JSON, wrong shape |
| 4 | readonly on Employee | Yes | Deferred | Not about any; revisit with signals on Day 6 | n/a |
| 5 | ApiError<T> / details? | No | Rejected | No consumer needs it yet | n/a |
| 6 | LoadState<T = unknown> | No | Rejected | Default does not stop any; weakens checking | n/a |
| 7 | idle / error? in LoadState | Maybe | Deferred to Day 5 | Affects exhaustive switches | n/a |
| 8 | UpdateEmployeeDto allows {} | n/a | Deferred | Needs validation in the service or form | n/a |
| 9 | AI inconsistency: try/catch in text but not in code | n/a | Fixed manually | Code did not match claim | Code review |
| 10 | Missed by AI: NaN accepted as number | Yes | Added Number.isFinite | typeof NaN === 'number' | Test with salary: NaN |
