# ADR-0036: Local Playwright and OpenAPI Test Fixtures

- Status: Proposed for project-owner review
- Date: 2026-10-09
- Owner: `danny.c.francisco`
- Related work package: `WP-037`
- Related ADRs: `ADR-0002`, `ADR-0007`, `ADR-0008`, `ADR-0013`, `ADR-0016`, `ADR-0028`

## Context

Developers need to test the Angular user interface and API-backed workflows on machines where Docker or PostgreSQL is unavailable. The repository already supports SQLite as the local backend adapter and PostgreSQL as the production compatibility target. Playwright is available for browser-level tests, but the test layers and fixture responsibilities need to be explicit.

The OpenAPI document describes request and response contracts. It does not provide a database, replace the Express API, or by itself make a browser test deterministic. OpenAPI examples can provide stable response fixtures for mocks, contract tests, and documentation, but those examples must remain representative of the schemas and current API behavior.

## Decision

Use two complementary Playwright modes:

1. **Mocked API UI tests:** Playwright intercepts selected `/api` requests and returns deterministic fixtures. These tests verify routing, rendering, loading, empty, error, and permission-related UI behavior without requiring a backend, database, Docker, or PostgreSQL.
2. **SQLite-backed local integration tests:** Playwright runs against the Angular development server and the Express backend using the versioned SQLite migrations and local data. These tests verify the browser, proxy, API routes, repository behavior, and SQLite persistence together.

Use PostgreSQL through the Docker Compose profile or CI for compatibility and promotion gates. PostgreSQL tests are required for migration parity, constraints, transactions, PostgreSQL-specific behavior, and production-readiness evidence. A passing SQLite Playwright test MUST NOT be treated as PostgreSQL compatibility evidence.

Keep OpenAPI first for all new API behavior. Add response and request `examples` to `docs/openapi/song-site.yaml` when stable fixtures improve contract clarity. Mocked Playwright fixtures MAY be derived from those examples, but the tests MUST still validate the behavior that matters to the UI. An OpenAPI document alone MUST NOT be treated as a mock server or a source of runtime data.

The local test identity and authorization boundary remains explicit. Mocked responses and SQLite fixtures MUST NOT grant production access, impersonate Entra identities, or allow the browser to choose arbitrary roles. Production authorization remains backend-enforced under the RBAC decisions.

## Normal local workflow

For mocked UI tests:

```powershell
npm start
npx playwright test playwright-admin-dashboard.spec.ts
```

For SQLite-backed browser tests:

```powershell
cd backend
npm run db:migrate
npm run db:seed
npm start
```

In a second terminal:

```powershell
npm start
npx playwright test
```

For PostgreSQL parity:

```powershell
docker compose up --build
npx playwright test
```

The specific suite and database profile MUST be clear from the test name, configuration, or command. Tests that require PostgreSQL MUST fail with an actionable prerequisite message rather than silently using SQLite.

## Consequences

Developers on constrained laptops can obtain fast browser feedback without installing PostgreSQL. Mocked tests are stable and suitable for pull requests, while SQLite-backed tests provide a useful local integration layer.

The project must maintain more than one fixture layer and must prevent mock-only confidence from being mistaken for API or database compatibility. PostgreSQL parity remains a separate responsibility for Docker-capable development environments and CI.

OpenAPI examples improve reuse and contract clarity, but they require maintenance when response schemas or business rules change. They should not become a second unversioned data source.

## Completion criteria

- Playwright has a documented local command for mocked UI tests.
- Playwright has a documented SQLite-backed integration command.
- OpenAPI examples or fixture files are versioned and traceable to the affected contract.
- PostgreSQL parity tests run against the supported PostgreSQL image in Docker or CI.
- The test output identifies the database profile used.
- Browser tests cover successful rendering, API failure, loading/empty states where applicable, and protected-action behavior.
- No local fixture, mock response, or browser-controlled role can be used to elevate production access.
