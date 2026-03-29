# ADR-001: Feature-Sliced Design over Atomic Design

## Status
Accepted

## Context
Frontend projects commonly organise code by file type:
`components/`, `hooks/`, `utils/`. This works at small scale but
breaks down as the codebase grows — a `components/` folder with
80 files gives no signal about what belongs together or what
depends on what.

Two popular alternatives exist: Atomic Design (atoms, molecules,
organisms) and Feature-Sliced Design (FSD).

## Decision
We use Feature-Sliced Design with the following layers:

- **shared** — utilities, UI primitives, API client. No business logic.
- **entities** — domain types, schemas, API functions. (metric, dashboard)
- **features** — user-facing capabilities. (date-range-filter)
- **widgets** — complex UI blocks composed from entities + shared.
- **pages** — route-level compositions.
- **app** — providers, router, global config.

Imports flow strictly downward. A `feature` may import from
`entities` and `shared`, but never from another `feature` or from
`widgets`.

## Consequences

**Good:**
- The folder structure communicates intent. Opening `features/`
  immediately shows every user-facing capability.
- Circular imports become impossible by convention and can be
  enforced with ESLint rules.
- New engineers know exactly where to put new code.

**Bad:**
- More upfront structure than a flat layout.
- Requires discipline — FSD only works if the import rules are followed.
- Some concepts (like `WidgetRenderer`) sit awkwardly between layers.

## Alternatives considered
**Atomic Design** was rejected because the atom/molecule/organism
taxonomy describes visual complexity, not domain ownership. It
doesn't answer "where does the API call for metrics live?" or
"what depends on what?"