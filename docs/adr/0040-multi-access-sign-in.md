# ADR-0040: Multi-Access Sign In Without an Authorization Bypass

- Status: Proposed for project-owner review
- Date: 2026-10-26
- Owner: To be assigned
- Related work packages: `WP-033`, `WP-041`, `WP-044`
- Related ADRs: `ADR-0019`, `ADR-0032`, `ADR-0035`, `ADR-0038`

## Context

Not every intended Song Site user may have access to the organization's Microsoft Entra tenant. The application still needs one understandable Sign In experience without turning `Skip SSO`, a frontend flag, a user-entered email address, or a role selector into an authorization mechanism.

The bench project also needs local development and automated tests to work without real Entra credentials. That requirement is different from production access for users who do not have organizational SSO.

## Decision

Use one Sign In page with provider-specific paths and explicit environment boundaries:

1. **Microsoft Entra SSO** is the Production Mode path for users with approved organizational access.
2. **Approved external identity provider** is a future Production Mode path for users without organizational SSO. The project owner must approve the provider, account-linking policy, recovery process, claims mapping, and data-protection implications before implementation. No provider is selected by this ADR.
3. **Development Mode** is the local-only, server-controlled fixture path defined by ADR-0035. It is available only in explicit local development configuration, uses signed expiring sessions, and is rejected in production or public deployments.
4. **Public browsing** is limited to explicitly approved read-only pages. It does not create an authenticated principal and does not expose dashboard management capabilities.

The Sign In mockup is documented in [Sign In Multi-Access Mockup](../mockups/sign-in-multi-access.md). The local Development Mode option is visible only when the server-provided environment/session contract says it is available; the frontend must not infer that from `NODE_ENV` or a client-controlled flag.

After authentication, the shared shell displays the server-resolved user's first name in the top-right account menu:

- **Profile** → the current user's role-scoped `/dashboard`.
- Separator.
- **Sign off** → provider/session invalidation and return to `/home`.

These controls are navigation/session controls, not authorization controls. Backend principal resolution remains authoritative for every protected API and route.

## Landing and post-login behavior

`/home` is the public landing page. The root URL `/` redirects to `/home` for compatibility, and the Home page provides the explicit navigation action to `/signin`. `/signin` contains the provider-specific access paths below. This keeps public browsing separate from authenticated profile and management data while retaining a direct, bookmarkable sign-in route.

Every authenticated user lands on the same canonical `/dashboard` route. The route is not duplicated by role. The backend resolves the principal's role, active state, ownership and approved cohort scope, then returns only the dashboard data and tool capabilities allowed for that user.

- **Regular member:** sees personal dashboard status, own onboarding/task progress, own blockers and approved shared resources. Member queries are restricted to the member's own identity.
- **POC/lead:** sees their own dashboard plus only the approved team/cohort/member scope assigned to them. They do not receive platform-wide user or administrative data by default.
- **Administrator:** sees authorized operational statistics and management tools, including User Management where the backend grants the required permission. Role and permission administration remains a separate future capability.
- **Developer/test identity:** sees the dashboard behavior granted by its server-side fixture permissions and is visibly labeled as Development Mode. It is not a production user.

The frontend may hide or show navigation items for usability, but this is not an authorization boundary. Direct route access and every API response must enforce the same role and ownership scope on the backend. A role label alone must never determine data access.

## Consequences

Positive:

- Users without organizational SSO have a planned path without weakening Entra-backed authorization.
- Local development and tests remain independent of organizational tenant access.
- The Sign In page communicates why a path is unavailable instead of presenting a hidden bypass.
- Provider-specific identity records can remain isolated and auditable.

Costs and risks:

- Adding a second production provider requires a separate security, privacy, recovery, and support review.
- Account linking must use approved stable provider identifiers, never email alone.
- The Sign In page and provider failures need clear loading, retry, unavailable-provider, and support states.
- Production release remains blocked until the owner selects and approves the non-SSO provider, if one is required.

## Security constraints

- A provider may authenticate a user, but backend authorization still determines access.
- Development fixtures never enter a production identity store.
- The public read-only path never grants dashboard or mutation permissions.
- The browser cannot choose a role, permission, identity, or data scope.
- Sign off must invalidate the active local or provider session and prevent reuse of the previous authenticated session.

## Verification requirements

- Public visitors can open `/home` without authentication and see only approved read-only content.
- `/` redirects to `/home`, and Home links to the explicit `/signin` entry point.
- Entra users can sign in from `/signin` and land on `/dashboard`.
- A non-SSO provider cannot be enabled until its configuration and claims contract are approved.
- Development Mode works on loopback without Entra and fails closed when deployed publicly or with Production Mode.
- Public browsing remains read-only and unauthenticated.
- The account menu shows the trusted first name, returns Profile to `/dashboard`, and signs off to `/`.
- Unmapped, inactive, expired, malformed, and wrong-provider identities are rejected.
- Browser and backend negative tests cover provider availability, logout, direct-route access, and mutation authorization.

## Open decisions requiring approval

- Is a non-SSO production provider required for the bench project, or is Entra access a release prerequisite?
- If required, which approved provider and account-recovery process will be used?
- Will users be invited/provisioned, or may they self-register?
- What identity attributes and retention rules are approved for the additional provider?
