# ADR-0035: Authoring Mode and User Onboarding RBAC

- Status: Proposed for project-owner review
- Date: 2026-10-09
- Owner: To be assigned
- Related work packages: `WP-007`, `WP-016`, `WP-030`, `WP-033`
- Related ADRs: `ADR-0005`, `ADR-0015`, `ADR-0019`, `ADR-0029`, `ADR-0032`

## Context

The application needs a usable authorization model while production SSO and Entra role assignment are being completed. The product also needs a controlled authoring experience and an onboarding flow that does not grant elevated access merely because a user can reach the frontend.

The requested experience is:

- `lead` and `admin` users can enter author mode;
- administrators maintain roles and permissions;
- leads can onboard users;
- guests can submit a request to become members;
- leads or administrators can approve onboarding requests.

A guest request must not become an active member until approval is recorded by an authorized actor. A user must not approve their own request or grant themselves a role or permission. This ADR depends on the identity and token-validation decisions in `ADR-0019` and `ADR-0032`; it does not make `Skip SSO` an identity provider.

## Decision

Use backend-enforced permissions as the authorization unit and roles as permission bundles. Author mode is an authorization capability, not a client-side mode switch.

The initial role and capability guidance is:

| Role | Capabilities |
| --- | --- |
| `guest` | Explicitly public reads and submission of a self-onboarding request after production identity verification. No authoring, role maintenance, or protected mutation access. |
| `member` | Approved standard product access and permitted own Journey operations. No authoring or role maintenance by default. |
| `lead` | Member capabilities, author mode for assigned domains, onboarding creation, and onboarding approval within an administrator-assigned scope. May use approved reference-data values but cannot maintain scopes, roles, permission policy, or administrator access. |
| `admin` | Lead capabilities plus user administration, role assignment, reference-data maintenance, permission-policy maintenance, and approval across the platform scope. Administrator access is itself assigned and audited; it is not inferred from a client claim or UI state. |

The initial permission vocabulary is:

- `author:use`
- `onboarding:request`
- `onboarding:create`
- `onboarding:approve`
- `user:manage`
- `role:manage`
- `permission:manage`
- `reference-data:manage`

Reference data means controlled values used by forms, filters, and dropdowns, including markets, practices, capabilities, teams, scope records, content categories, and other approved code lists. Administrators MAY create, rename, deactivate, and order reference-data values subject to validation and audit. Values referenced by users, roles, content, or history MUST be deactivated rather than hard-deleted.

The permission catalog and built-in role definitions are security policy, not ordinary reference data. They MUST be defined by versioned migrations or reviewed configuration and exposed to administrators through a constrained policy-management experience. Administrators MAY assign existing roles and permissions and maintain approved role-to-permission mappings, but MUST NOT create arbitrary executable permission keys from a dropdown. Changes to permission policy MUST require explicit confirmation, audit the before/after state, protect the final administrator account, and prevent self-elevation without the required approval path.

Author mode is a capability gate, not a blanket grant to every mutable resource. The first release uses domain-specific permissions for the existing managed content surfaces:

- `leadership:manage` for leadership records;
- `content:manage` for approved home and Song Link content;
- `onboarding:manage` for onboarding requests within lead scope.

Journey and training status updates remain governed by the ownership and team permissions in `ADR-0005` and `ADR-0030`; entering author mode does not grant unrestricted access to user-owned Journey data. Additional authoring domains require an explicit permission and work-package scope.

Leads and administrators may edit approved site content through author mode. Administrator-only maintenance of reference data and authorization policy is a separate workflow from content editing. A lead MUST NOT gain role, permission, or scope-management access merely because the lead can author content.

The backend MUST enforce these permissions for every protected operation. Angular visibility, author-mode controls, hidden routes, and client-provided role values MUST NOT grant access.

Guest onboarding MUST create a pending onboarding request tied to a verified identity. In production, verification MUST use a validated Entra subject or an approved email-verification challenge; display name, unverified email, browser state, and `Skip SSO` alone are insufficient. In local development and tests, a clearly marked fixture identity MAY stand in for the verification provider. A request MUST NOT directly create an active member or assign permissions.

The onboarding state machine is `pending -> approved`, `pending -> rejected`, or `pending -> expired`. Approved requests create or activate a member with the default `member` role. Rejected requests remain immutable history with a reason; a requester may submit a new request subject to rate limits and duplicate-pending checks. Approval records MUST include the request, actor, timestamp, resulting role, scope, and decision reason.

Leads MAY create and approve member onboarding requests within their assigned scope. Administrators MAY approve requests across the platform scope and maintain roles and permissions. Admin approval is an override, not a second approval requirement. Assigning or changing `lead` or `admin` privileges MUST require an administrator and MUST be audited. A lead MUST NOT approve a request outside the lead's scope, and no actor may approve their own request.

Lead scope is an explicit, administrator-assigned relationship between a lead and one or more organizational scope records. The initial implementation MUST support a stable `scope_type` and `scope_id` pair using these scope types:

- `market`, such as `emea`;
- `practice`, such as `commerce`;
- `capability`, such as `digital-products`;
- `team`, for a stable team identifier.

For example, a lead assignment may be `market` + `emea`, `practice` + `commerce`, or `capability` + `digital-products`. `scope_id` MUST reference a stable canonical identifier, not a display name that may change. The backend MUST filter every lead onboarding and authoring query by the authenticated lead's assignments and MUST reject out-of-scope mutations with `403`. Scope changes and expiry MUST be audited. An unrestricted lead scope is prohibited.

The local development/test environment MUST provide fixtures for guest, member, lead, and admin scenarios. These fixtures MUST be unavailable in production and MUST not be represented as real Entra identities.

Fixture activation MUST require both a non-production runtime and an explicit test-only configuration flag. Production startup MUST fail closed or reject fixture identities when that flag is present. Fixture roles MUST be selected server-side from named test identities; the browser MUST NOT submit an arbitrary role or permission set.

## Consequences

The model supports authoring and onboarding without requiring every developer to have production SSO access. It requires identity reconciliation, onboarding-request persistence, role and permission storage, scope rules, audit records, and negative authorization tests.

The distinction between a pending guest request and an approved member prevents self-service onboarding from becoming privilege escalation. Lead scope must be defined before production implementation; an unrestricted lead role would be too broad.

The model requires separate role/permission assignment from external identity claims. Entra claims identify the user and may provide approved role inputs, but the backend remains authoritative for effective permissions, scope, deactivation, and audit. A claim or group mapping failure MUST fail closed rather than silently retaining elevated access.

This ADR does not replace Microsoft Entra authentication. Entra remains the production identity provider under `ADR-0032`; this ADR defines the application authorization policy after identity is established.

## Implementation boundary

This ADR is documentation only. It does not add author-mode UI, onboarding endpoints, database migrations, Entra app roles, permission middleware, or local fixtures. Those changes require:

- approval of `ADR-0019` and `ADR-0032` and an assigned implementation owner;
- OpenAPI-first contracts for onboarding, approval, rejection, role assignment, permission maintenance, and scope queries;
- versioned migrations for users, roles, permissions, assignments, lead scopes, onboarding requests, approval history, and audit records;
- backend authorization and ownership/scope filtering;
- negative tests for unauthenticated, unauthorized, self-approval, self-elevation, cross-scope, stale-claim, and production-fixture cases.

## Verification requirements

Implementation is complete only when tests demonstrate:

- guests can submit onboarding requests but cannot activate themselves;
- unverified guests, duplicate pending requests, expired requests, and forged identity fields are rejected;
- members cannot enter author mode without `author:use`;
- leads can author and manage onboarding only within their assigned scope;
- leads cannot maintain the permission catalog or grant administrator access;
- admins can perform approved role and permission maintenance;
- unauthorized users receive `403` and unauthenticated users receive `401` for protected operations;
- self-approval and self-elevation are rejected;
- rejection, approval, scope changes, and role/permission changes are auditable and immutable as history;
- a lead cannot read or mutate onboarding or authoring resources outside the assigned scope;
- local fixtures work in development/tests and are rejected in production;
- invalid, expired, unmapped, or insufficient Entra identities fail closed.

## Open questions

- What identity verification is required before a guest may submit an onboarding request?
- What rate limit and retention period apply to rejected or expired onboarding requests?
- Which additional content domains, beyond leadership and approved home/Song Link content, should receive authoring permissions?
