# ADR-0039: New Member Onboarding Domain and Assignment Ownership

- Status: Proposed for product-owner and security approval
- Date: 2026-10-23
- Owner: To be assigned
- Related work packages: `WP-043`
- Related ADRs: `ADR-0002`, `ADR-0003`, `ADR-0005`, `ADR-0006`, `ADR-0011`, `ADR-0017`, `ADR-0020`, `ADR-0022`, `ADR-0028`, `ADR-0030`, `ADR-0035`, `ADR-0038`

## Context

Song Bench onboarding means onboarding a new Song member joining the bench. The current repository has Journey and Training Tracker experiences, but their task records are not proven to be owned by a specific member assignment. A shared task status cannot establish independent onboarding progress, coordinator scope, or an auditable completion record.

The bench project needs one narrow vertical slice that lets a member resume their own onboarding, lets a coordinator assign and verify within an approved scope, and keeps external HR, learning, compliance and asset systems authoritative for their own data. The solution must remain smaller than a general HR, LMS, resource monitoring or CMS product.

## Decision

Define onboarding around a member-owned `assignment` created from an immutable published `template_version`.

The minimum domain is:

- `member`: a locally reconciled identity with an enterprise subject where Production Mode is enabled;
- `cohort`: an optional coordinator scope;
- `template` and `template_version`: reusable onboarding definitions and immutable published snapshots;
- `template_task`: required or optional task definitions with instructions, verification rule and optional resource reference;
- `assignment`: one member's onboarding instance for a defined cycle;
- `assigned_task`: the member-specific task instance created from the published snapshot;
- `task_event` and `assignment_event`: append-only actor-attributed history;
- `resource`: curated link metadata, not an external-system status mirror.

Each active assignment references exactly one published template version. Template edits do not change an active assignment. A member may mutate only eligible tasks in their own assignment. A coordinator may assign, verify and close only within an explicit cohort or assignment scope. An administrator may manage template and resource lifecycle but may not fabricate member completion.

The member-facing entry point is the authenticated dashboard and a dedicated onboarding view. The no-assignment state is explicit. The dashboard consumes server-derived summaries and does not own onboarding state.

The dashboard is the common authenticated destination for members, POCs/leads and administrators after sign-in; `/home` remains the public landing page. A member summary is restricted to the caller's own assignment. A POC/lead summary is restricted to the caller's approved cohort or team scope. An administrator summary may include platform-wide onboarding statistics. These scopes are enforced by the backend assignment and membership relationships, not by dashboard navigation or client filters.

## API boundary

The onboarding API is versioned under `/api/v1` and must enforce backend identity, permission and scope. The initial contract is:

- `GET /api/v1/onboarding/me`
- `GET /api/v1/onboarding/me/tasks`
- `POST /api/v1/onboarding/me/tasks/{id}/events`
- `GET /api/v1/coordinator/members`
- `POST /api/v1/coordinator/assignments`
- `POST /api/v1/coordinator/tasks/{id}/verification`
- `GET /api/v1/templates`
- `POST /api/v1/templates/{id}/publish`
- `GET /api/v1/resources`

Mutations require the existing secure session or approved Production Mode token, the required permission and CSRF protection where applicable. `401`, `403`, `404` and `409` behavior must not leak inaccessible resource existence or silently overwrite revisions.

## Security and privacy

- No frontend role flag, member ID, hidden control or request header grants access.
- Cross-member reads and writes are denied by backend ownership/scope checks.
- Coordinator access is scoped by cohort or explicit assignment mapping.
- Task history is append-only and actor-attributed.
- External links do not certify external completion.
- Store only the minimum identity and onboarding data needed for the bench slice.
- Development identities remain governed by `ADR-0035` and are unavailable in Production Mode.

## Consequences

Positive consequences:

- Independent new members can complete the same onboarding template without sharing status.
- Coordinator progress views have an explicit data scope.
- Published template changes are recoverable and do not mutate active member plans unexpectedly.
- PostgreSQL and SQLite can enforce the same business invariants.

Costs and risks:

- The schema is more deliberate than the current shared task tables.
- Existing Journey and Training Tracker routes require compatibility or migration decisions.
- Coordinator scope, privacy retention and completion verification need product-owner decisions.
- This decision does not create an operational resource monitor or external-system synchronization.

## Alternatives considered

### Continue using shared task status

Rejected. It cannot prove member ownership, coordinator scope or independent completion.

### Treat the existing task route as onboarding

Rejected as a product claim. It may remain a compatibility surface, but it does not satisfy this domain decision until ownership and assignment semantics are implemented.

### Build a generalized resource monitor or HR synchronization layer

Rejected for the bench project. Use curated resource links and explicit verification until a separate product decision authorizes system integration.

## Verification requirements

- Two members assigned to the same template see and mutate independent task instances.
- A member cannot read, mutate, verify or close another member's assignment.
- A coordinator sees only assigned cohort/member scope.
- A published template version remains unchanged after template edits.
- Task and assignment history remains append-only and actor-attributed.
- Duplicate assignment, stale revision and unauthorized access produce tested errors.
- SQLite and PostgreSQL enforce equivalent ownership and lifecycle rules.
- Guest browsing remains read-only and existing Skip SSO behavior does not grant member access.

## Implementation boundary

This ADR defines the onboarding domain and authorization boundary. It does not claim that the routes, tables, UI or migrations currently exist. Implementation is planned under `WP-043`.
