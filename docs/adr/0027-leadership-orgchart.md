# ADR-0027: Leadership Organizational Chart

- Status: Withdrawn; org-chart implementation deferred
- Date: 2026-09-23
- Owner: To be assigned
- Related work packages: `WP-028`, `WP-030`

## Context

The requested Leadership Organizational Chart is a presentation of leadership relationships, roles, reporting levels, and profile images. The supplied image is only a visual mock for the chart structure; its logo, branding label, colors, typography, and footer content are not part of this feature's scope.

The repository already has a leadership content boundary:

- `GET /api/leadership` returns leadership data grouped by section.
- `PUT /api/leadership/:section/:id` updates an existing leadership item.
- Local SQLite stores the compatibility records in `leadership_sections`.
- The PostgreSQL adapter has the corresponding `leadership_members` table.
- The current frontend consumes the API on `/atcp-song` and renders market leads, practice leads, capability leads, and enablement champions.

The org-chart proposal is withdrawn from the current delivery scope. The existing leadership API and UI must remain focused on the current grouped leadership content. Any org-chart compatibility routes, schema additions, seed records, or service methods introduced during exploratory implementation are temporary and must be removed before rollback is complete. The supplied image is not a product specification; its branding and decorative content are explicitly out of scope.

## Decision

Do not implement or expose a Leadership Organizational Chart in the current release. Retain the existing `/api/leadership` contract, leadership storage, `AtcpSongService`, and current FED rendering unchanged. Do not treat the mock image as a UI or branding requirement.

If the feature is reconsidered, it requires a new approved scope, API contract, data model, UI design, authorization model, migration plan, and test plan before implementation. It must not be added by extending the current API opportunistically.

## Consequences

The project avoids a second leadership data source and protects the existing UI/API contract. The org-chart work package is deferred. Existing database objects must not be dropped destructively as part of documentation or code rollback; cleanup of already-created PostgreSQL objects requires a separately reviewed migration.

## Verification

The work package is complete only when the following are present:

- the current leadership API and UI remain unchanged;
- org-chart compatibility routes and exploratory schema/seed additions are removed or explicitly isolated;
- no org-chart route is advertised in the production API contract;
- leadership RBAC remains a separate future decision under `ADR-0029`; and
- no claim is made that an org-chart feature exists based on the current leadership API, tables, or static reference image.
