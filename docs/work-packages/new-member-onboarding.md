# WP-043: New Member Onboarding Vertical Slice

## Status

Planned. This work package requires product-owner, security/privacy and coordinator approval before implementation. It is a bench-project slice, not a commitment to build a full product platform.

## Scope and non-goals

### Scope

- Implement one new-member onboarding assignment flow.
- Provide member-owned task instances from an immutable published template version.
- Provide member task reads, self-completion/help events and clear no-assignment behavior.
- Provide a minimal coordinator view for scoped members, assignment and verification.
- Provide curated resources and help links without external-system status synchronization.
- Add dashboard summary data only after the underlying onboarding API is authoritative.
- Maintain SQLite/PostgreSQL business-rule parity.

### Non-goals

- HR, learning, compliance or staffing system synchronization.
- General resource monitoring, telemetry or asset ownership reconciliation.
- Organization-chart functionality withdrawn by `ADR-0027`.
- Broad user administration, mass messaging, notifications or a general CMS.
- Replacing the existing Announcement authoring work.
- Production tenant-specific Entra configuration.

## Referenced ADRs

- `ADR-0039` New Member Onboarding Domain and Assignment Ownership
- `ADR-0038` Song Site Dashboard Management Hub
- `ADR-0002` OpenAPI First API Design
- `ADR-0003` Database Strategy
- `ADR-0005` Role-Based Access Control
- `ADR-0006` Journey Work Packages and Status
- `ADR-0017` API Hardening and Production Readiness
- `ADR-0020` Data Protection and Retention
- `ADR-0022` API Lifecycle and Compatibility
- `ADR-0028` PostgreSQL Compatibility, Test Layers and CI Gates
- `ADR-0030` Journey API Source of Truth
- `ADR-0035` Development Authentication and Identity Isolation

## Functional requirements

1. A new member can view their active assignment and next eligible task.
2. A member can complete eligible self-attestation tasks, request help and view allowed resources.
3. A member can see a clear `No onboarding assigned` state when no assignment exists.
4. A coordinator can list only members within their approved scope.
5. A coordinator can assign one published template version to an eligible member.
6. A coordinator can accept or reject tasks requiring verification with a reason.
7. The system computes completion from required task state and coordinator closure, not a manually entered percentage.
8. Administrators can list, validate and publish template versions.
9. Public/guest browsing remains read-only.

## Technical requirements

- Add assignment-owned tables and foreign keys described in `ADR-0039`.
- Add migration ledger entries for SQLite and PostgreSQL with repeat-startup safety.
- Add repositories/adapters with equivalent ownership, scope, lifecycle and conflict behavior.
- Add `/api/v1/onboarding`, `/api/v1/coordinator`, `/api/v1/templates` and `/api/v1/resources` contracts to OpenAPI.
- Use the existing trusted backend principal, permission middleware, CSRF and signed local sessions.
- Add optimistic concurrency using a revision/version field and return `409` on stale writes.
- Add append-only task/assignment events for audit and recovery.
- Preserve current public visual language and isolate compatibility routes until migration decisions are approved.

## Acceptance criteria

- Two new-member fixtures can be assigned the same template and complete tasks independently.
- Member A cannot read or mutate Member B's assignment, including by changing path IDs or request bodies.
- Unauthenticated users can access only `/signin` and receive `401` or `403` for onboarding reads and mutations.
- Author/member permissions cannot assign, verify or publish.
- Coordinator permissions are limited to configured scope.
- Duplicate assignment, stale revision and invalid transition cases return documented errors.
- Published template edits do not alter active assignments.
- A rollback or reopen creates a new audit event and preserves prior history.
- SQLite and PostgreSQL pass the same ownership and lifecycle test matrix.
- Restarting the backend preserves assignment, task and event state.
- Browser acceptance covers no-assignment, assigned-member, task event, help request and coordinator verification journeys.

## API and database changes

### API

Implement and document:

- `GET /api/v1/onboarding/me`
- `GET /api/v1/onboarding/me/tasks`
- `POST /api/v1/onboarding/me/tasks/{id}/events`
- `GET /api/v1/coordinator/members`
- `POST /api/v1/coordinator/assignments`
- `POST /api/v1/coordinator/tasks/{id}/verification`
- `GET /api/v1/templates`
- `POST /api/v1/templates/{id}/publish`
- `GET /api/v1/resources`

### Database

Add portable migrations and adapters for `members`, `cohorts`, `templates`, `template_versions`, `template_tasks`, `assignments`, `assigned_tasks`, `task_events`, `assignment_events` and `resources`, or use approved existing tables only where their ownership semantics are equivalent.

## Security requirements

- Backend authorization is mandatory on every protected read and mutation.
- Enforce member ownership and coordinator scope in repositories or service policy, not only controllers.
- Deny missing identity, invalid session, insufficient permission, cross-member access and out-of-scope coordinator access.
- Do not accept client-provided role, member or cohort claims as authority without server resolution.
- Development identities are local-only and fail closed in public/deployed environments.
- Minimize member data and define retention before production use.
- Audit assignment, task, verification, closure and administrative template actions.

## Tests and verification evidence

- Backend unit tests for ownership, scope, transitions, duplicate assignment, stale revision and audit events.
- SQLite integration test matrix.
- Disposable PostgreSQL migration and integration test matrix.
- OpenAPI route-to-contract parity and authorization regression tests.
- Angular unit tests for member and coordinator states.
- Playwright tests for new-member onboarding, no assignment, help request, coordinator verification, denial and refresh/restart persistence.
- Security negatives for guest mutation, cross-member access, role spoofing, expired/forged development sessions and CSRF.
- Evidence includes test output, migration logs, API contract validation and screenshots/video for key browser journeys.

## Dependencies

- Approval of `ADR-0039` and coordinator scope.
- `WP-035` and `WP-036` secure development and permission enforcement.
- `WP-017` and `WP-029` PostgreSQL compatibility/test gates.
- `WP-031` Journey source-of-truth consolidation and compatibility route decisions.
- `WP-042` dashboard shell when dashboard summaries are added.
- Product-owner decision on required stages, verification rules, support contact and retention.

## Definition of Done

- ADR-0039 is approved or explicitly revised.
- OpenAPI, migrations, repositories, routes, UI, authorization and tests are implemented together.
- New members can independently complete the same onboarding template.
- Coordinators can see and act only within their approved scope.
- Guest and unauthorized paths are proven read-only/denied.
- SQLite/PostgreSQL parity and restart persistence evidence are attached.
- Browser acceptance evidence covers the stated journeys.
- Runbook and Teams Planner task status reflect actual implementation state.
- The work package is not marked complete based on documentation, mockups or successful HTTP calls alone.
