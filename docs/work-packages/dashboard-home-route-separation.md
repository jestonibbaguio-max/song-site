# WP-042: Dashboard and Home Route Separation

- **Status:** Planned; blocked only on dashboard content and default-destination decisions
- **Owner:** To be assigned
- **Related ADRs:** `ADR-0038`, `ADR-0001`, `ADR-0006`, `ADR-0007`, `ADR-0017`, `ADR-0022`, `ADR-0030`

## Scope

Create a distinct `/dashboard` application shell and move the existing ATCP Song Bench home experience from `/dashboard` to `/home`. The dashboard shell includes themed sidebar tools for Dashboard, User, and Settings, plus approved existing workspaces. Update navigation, redirects, tests, documentation, and deployment smoke checks while preserving existing public layouts, task routes, session modes, and backend authorization.

The first dashboard slice should provide an intentional dashboard shell and the approved summary widgets, rather than duplicating the old home page. The exact widget set is subject to the product-owner decisions recorded in `ADR-0038`.

## Non-goals

- No change to Microsoft Entra tenant configuration, redirect URIs, or production authentication.
- No replacement of backend RBAC or permission middleware with frontend route guards.
- No migration of Announcement, Leadership, or other page-authoring content into the dashboard.
- No redesign of the existing `/home` public layout beyond route ownership and navigation links.
- No separate visual system for the dashboard, User, or Settings tools.
- No removal of `/my-journey` or `/training-tracker`.

## Functional requirements

1. `/home` renders the current `HomeComponent` and preserves its spotlight, quick announcements, navigation, and footer behavior.
2. `/dashboard` renders a separate dashboard component with an approved title, responsive layout, loading state, empty state, and error state.
3. The dashboard uses the existing Song Site theme, typography, colors, card treatment, spacing, icons, and responsive conventions.
4. A desktop sidebar and mobile/collapsed navigation expose Dashboard, User, and Settings tools with active-route state.
5. The navbar Home link points to `/home`.
6. Authentication-entry and Skip SSO redirects use the approved default destination.
7. Existing deep links and refreshes remain functional.
8. Dashboard links to Journey and training workspaces use their existing routes.
9. Guest users see only approved read-only dashboard data.
10. Development and Production users receive no additional authority from route access; all mutations remain backend-protected.
11. Any dashboard data request has an explicit API owner, response contract, and failure behavior.

## Technical requirements

- Add a dedicated lazy-loaded dashboard component and route in `src/app/app.routes.ts`.
- Move the current `HomeComponent` route to `/home` without duplicating its template or service.
- Add a reusable dashboard shell/sidebar component or equivalent shared shell structure; do not duplicate sidebar markup across pages.
- Add route entries for the User and Settings tools, with placeholders only where the underlying capability is not yet approved.
- Update `src/app/navbar/navbar.html`, `src/app/index/index.component.ts`, and any route links that rely on the old meaning of `/dashboard`.
- Inventory all `/dashboard` references in Angular templates, services, tests, OpenAPI examples, docs, CI, Docker smoke tests, and deployment checks.
- Keep route guards and session handling consistent with `ADR-0035`; do not infer roles from the URL.
- Define or reuse an API-backed dashboard read contract under the existing API versioning policy before introducing new dashboard data.
- Preserve static-host fallback and container Nginx behavior for both routes.
- Reuse existing theme tokens/styles and verify contrast, keyboard focus, responsive drawer behavior, and active navigation state.

## API and database changes

The route move itself requires no database migration. If the approved dashboard requires new aggregates or widgets, add the API contract and repository changes as a separately reviewable slice. Do not read mutable JSON or duplicate content owned by `/home` or `/announcement`.

## Security requirements

- Guest reads remain read-only.
- All dashboard mutations, if approved, use existing backend principal and permission middleware.
- No frontend route, query parameter, local-storage flag, or client role can grant access.
- Development Mode remains explicitly local-only and is rejected by deployed production configuration.
- Do not expose private task, user, or authoring data in a public dashboard response.

## Acceptance criteria

- [ ] Product-owner decisions in `ADR-0038` are recorded before finalizing dashboard contents and default redirect behavior.
- [ ] `/home` renders the former `/dashboard` home experience with no visual or functional regression.
- [ ] `/dashboard` renders the new dashboard page and is not an alias for `HomeComponent`.
- [ ] `/dashboard` includes a responsive themed sidebar with Dashboard, User, and Settings tools.
- [ ] Sidebar active state, keyboard navigation, focus visibility, and mobile/collapsed behavior are verified.
- [ ] User and Settings tools do not expose administrator actions without backend authorization.
- [ ] Navbar Home navigates to `/home`.
- [ ] `/` still supports SSO, Skip SSO Guest Mode, and approved local Development Mode entry.
- [ ] Existing `/my-journey`, `/training-tracker`, `/announcement`, and task detail routes still work.
- [ ] Guest cannot mutate any dashboard-backed resource; authorized roles use backend-enforced permissions.
- [ ] Loading, empty, API failure, unauthorized, and responsive states are tested.
- [ ] Angular unit tests, production build, and Playwright navigation tests pass.
- [ ] Docker and deployed SPA smoke tests verify `/`, `/home`, `/dashboard`, and refresh/deep-link behavior.
- [ ] Documentation and route inventories no longer describe `/dashboard` as the old home page.

## Tests and verification evidence

- Route configuration tests for `/`, `/home`, and `/dashboard`.
- Component tests proving the old HomeComponent is mounted only at `/home`.
- Dashboard tests for loading, data, empty, error, and unauthorized states.
- Navigation tests for navbar Home, authentication redirect, Skip SSO, Journey, and training links.
- Playwright browser test covering direct navigation and refresh on `/home` and `/dashboard`.
- Production Angular build and Docker frontend smoke test.
- Backend authorization regression tests if the dashboard adds any mutation endpoint.

Record actual commands, test counts, and pass/fail results here or in the implementation evidence linked from this package. Do not mark this package complete from route edits alone.

## Dependencies

- Approval of `ADR-0038` dashboard scope and default destination.
- Existing route/session behavior from `ADR-0035` and `WP-035`.
- Existing Journey API and navigation contracts from `ADR-0030` and `WP-031`.
- Any new aggregate API must follow `ADR-0002` and the current PostgreSQL/SQLite compatibility policy.

## Definition of Done

The old home experience is available at `/home`, the new dashboard is a distinct tested page at `/dashboard`, navigation and redirects are unambiguous, no authorization boundary is weakened, all affected tests and smoke checks pass, and evidence is recorded with the actual results.
