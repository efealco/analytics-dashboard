# Analytics Dashboard

A modular, scalable analytics dashboard built to demonstrate
senior frontend engineering patterns — not just working code,
but decisions that hold up at scale.

## Tech stack

| Concern         | Choice                        |
|-----------------|-------------------------------|
| Framework       | React 18 + TypeScript         |
| Build           | Vite                          |
| Server state    | TanStack Query                |
| UI state        | Zustand                       |
| Charts          | Recharts                      |
| Styling         | Tailwind CSS v4               |
| API mocking     | Mock Service Worker (MSW)     |
| Testing         | Vitest + React Testing Library|
| Architecture    | Feature-Sliced Design (FSD)   |

## Getting started

```bash
npm install
npm run dev       # start dev server with MSW active
npm run test      # run test suite in watch mode
npm run test:run  # single pass
npm run build     # type-check + production build
```

## Architecture

This project uses **Feature-Sliced Design** — a layered architecture
where imports flow strictly downward:

```
app → pages → features → entities → shared
```

No layer may import from a layer above it. This makes the
dependency graph explicit and prevents circular imports.

```
src/
├── app/                  # providers, global config
├── features/             # user-facing capabilities
│   └── date-range-filter/
├── entities/             # domain types, schemas, API functions
│   ├── metric/
│   └── dashboard/
├── widgets/              # compound components, one per widget type
│   ├── kpi-card/
│   ├── line-chart/
│   └── WidgetRenderer.tsx
├── shared/               # reusable across all layers
│   ├── api/
│   └── ui/
└── test/                 # MSW server, fixtures, helpers
```

## Key patterns

### Discriminated union widget system
Every widget type is a variant of `WidgetDefinition`. Adding a new
widget type produces compile errors in every unhandled switch —
impossible to forget a case.

### Zod validation at API boundaries
All API responses are parsed with Zod before entering the app.
Bad data from the server throws at the boundary, not silently
inside a component.

### Three-layer state architecture
- **TanStack Query** — server state, caching, background sync
- **Zustand** — global UI state (date range filter)
- **useState** — ephemeral local component state

### Query key factory
Centralised query keys prevent cache invalidation bugs and magic
strings scattered across the codebase.

### Compound components
`Widget.Header`, `Widget.Body`, `Widget.Loading`, `Widget.Empty`,
`Widget.Error` — explicit composition with no prop drilling.

## Testing strategy

Tests are structured in three levels:

| Level       | Files                        | What it covers              |
|-------------|------------------------------|-----------------------------|
| Unit        | `utils.test.ts`              | Pure transform functions     |
| Unit        | `useDashboardStore.test.ts`  | Zustand store logic          |
| Component   | `KpiWidget.test.tsx`         | Widget rendering + states    |
| Integration | `dashboard.integration.test` | Filter → widget data flow    |

MSW intercepts all network requests in both the browser (dev)
and Node (test) environments — no module mocking required.

## Architecture decisions

See [`docs/adr/`](./docs/adr/) for the reasoning behind key choices:

- [ADR-001](./docs/adr/001-feature-sliced-design.md) — Feature-Sliced Design over Atomic Design
- [ADR-002](./docs/adr/002-state-layers.md) — Three-layer state architecture
- [ADR-003](./docs/adr/003-msw-for-mocking.md) — MSW over module mocking