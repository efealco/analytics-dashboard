# ADR-003: MSW over module mocking

## Status
Accepted

## Context
Tests that exercise data fetching need a way to simulate the
server. Two common approaches exist: mock the module (jest.mock /
vi.mock) or intercept the network request (MSW).

## Decision
We use Mock Service Worker (MSW) for all API mocking.

MSW intercepts at the network level using a service worker in
the browser and an HTTP interceptor in Node. The same handler
definitions work in both environments — the dev server and the
test suite share identical mock behaviour.

## Consequences

**Good:**
- Tests are closer to real user behaviour — they exercise the
  actual fetch call, Zod validation, and React Query caching,
  not just the component render.
- No `vi.mock('@/entities/metric/api')` scattered across test
  files — the network is the single seam.
- Switching from MSW to a real API requires zero changes to
  component or test code.
- The browser dev server uses the same handlers — no separate
  fixture system needed.

**Bad:**
- Slightly more setup than `vi.mock`.
- MSW handlers must be kept in sync with the real API contract.

## Alternatives considered
**vi.mock / module mocking** was rejected because it couples
tests to implementation details (the import path of the API
function). Refactoring the API layer would break tests even if
the component behaviour was unchanged.