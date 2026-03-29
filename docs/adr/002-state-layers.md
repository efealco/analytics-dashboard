# ADR-002: Three-layer state architecture

## Status
Accepted

## Context
State management is the most common source of complexity in
React applications. Putting all state in a global store (Redux)
leads to over-engineering. Putting all state in components leads
to prop drilling and duplicated fetching logic.

## Decision
State is split into three explicit layers, each owning a
distinct concern:

**Layer 1 — TanStack Query (server state)**
Anything that comes from the network. Handles caching, background
refetching, loading and error states. Components never fetch
directly — they call a `useXxx` query hook.

**Layer 2 — Zustand (global UI state)**
Shared UI state that is not server data and needs to be accessed
by multiple unrelated components. Currently: the date range filter
preset. Zustand was chosen over React Context because selectors
prevent unnecessary re-renders — a component that reads `preset`
does not re-render when `dateRange` changes.

**Layer 3 — useState (local state)**
Ephemeral state that belongs to a single component and does not
need to survive re-mounts. Form inputs, toggle states, hover states.

## Consequences

**Good:**
- The question "where does this state live?" always has a clear answer.
- TanStack Query eliminates loading/error boilerplate in every component.
- Zustand selectors keep renders minimal.
- The three layers are independently testable.

**Bad:**
- Developers must understand the distinction between server state
  and UI state — not always obvious for complex optimistic updates.

## Alternatives considered
**Redux Toolkit** was rejected as over-engineered for this scope.
**React Context for global state** was rejected because it
re-renders all consumers on every state change, with no
selector mechanism.