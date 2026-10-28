# WP-033 — Sign-in and Account Menu

Status: Planned; access policy superseded by ADR-0040 and WP-044

## Scope

Implement the provider-backed sign-in entry and authenticated account menu for the shared Song Site shell:

- `/signin` is the only unauthenticated portal page; `/` redirects to `/signin`.
- Approved Entra sign-in lands on `/dashboard`.
- Local Development Mode remains available only through the isolated server-controlled development flow defined by ADR-0035.
- The authenticated top-right menu displays the current user's first name from the trusted session/me response.
- **Profile** returns to the current user's role-scoped `/dashboard`.
- A visual separator distinguishes navigation from session action.
- **Sign off** invalidates the provider/session state and returns to `/signin`.

## Non-goals

This work package does not implement role or permission administration, user creation, tenant-specific Entra configuration, or frontend-controlled authorization. Its earlier public Home and `Skip SSO` language is superseded: there is no guest-browsing path.

## References

- ADR-0019 — Identity and Access Lifecycle
- ADR-0029 — SSO-Compatible Leadership RBAC
- ADR-0032 — Microsoft Entra SSO and API Token Integration
- ADR-0035 — Development Authentication and Identity Isolation
- ADR-0038 — Song Site Dashboard Management Hub

## Functional and technical requirements

1. Sign In has explicit loading, failure, retry, and unauthenticated states.
2. Successful authentication resolves a backend principal before protected dashboard data is shown.
3. The account menu uses the server-resolved first name; it does not trust a client-selected name or role.
4. Profile navigates to `/dashboard` without changing identity or scope.
5. Sign off invalidates the active local or Entra session according to the active provider and navigates to `/home`.
6. Direct navigation after sign-out cannot reuse the previous authenticated session.
7. All portal data reads require a backend-authenticated session; `/api/v1/session` exposes session status only.

## Security requirements

- Entra tokens are validated by the backend before protected API access.
- Development sessions are rejected in Production Mode and public deployments.
- Logout clears provider/session state and is covered by negative tests.
- The menu does not expose roles, permissions, or administrative links unless the backend session authorizes them.

## Acceptance criteria

- [ ] `/signin` is the only unauthenticated portal route.
- [ ] `/` redirects to `/signin`, and all other routes/APIs are protected.
- [ ] Approved authenticated users land on `/dashboard`.
- [ ] The top-right menu shows the current user's first name.
- [ ] Profile returns to that user's dashboard.
- [ ] The separator is present and accessible.
- [ ] Sign off invalidates the session and returns to `/signin`.
- [ ] An inactive or unmapped identity cannot access protected dashboard data.
- [ ] Development Mode continues to work locally without Entra credentials and is unavailable in production.
- [ ] Browser, backend, token-validation, and logout negative tests pass.

## Dependencies and Definition of Done

Depends on the trusted principal/session contract from WP-035/WP-036 and the production token boundary in WP-041. Complete only when the UI, provider behavior, backend session invalidation, OpenAPI/session contract, accessibility behavior, and automated acceptance evidence are delivered together. Documentation alone does not complete this package.
