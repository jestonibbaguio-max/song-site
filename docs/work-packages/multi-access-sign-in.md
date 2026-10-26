# WP-044 — Multi-Access Sign In and Account Menu

Status: Planned; project-owner approval required for any additional production provider

## Scope

Define and implement the Sign In experience for users with different identity access:

- `/home` as the public landing page; `/` redirects to `/home` for compatibility.
- `/signin` as the explicit Sign In entry point.
- Microsoft Entra SSO for approved Production Mode users.
- A future approved external provider path for users without organizational SSO.
- Local-only Development Mode using the server-controlled fixtures from ADR-0035.
- Explicit public read-only behavior where approved.
- Authenticated top-right account menu showing the current user's first name.
- Profile → current user's `/dashboard`.
- Separator.
- Sign off → invalidate session and return to `/home`.

## Non-goals

- No production provider is selected by this work package.
- No password-based login or hidden local-account bypass.
- No role/permission selection in the browser.
- No tenant-specific Entra configuration in this documentation task.
- No change to backend authorization rules.

## References

- ADR-0019 — Identity and Access Lifecycle
- ADR-0032 — Microsoft Entra SSO and API Token Integration
- ADR-0035 — Development Authentication and Identity Isolation
- ADR-0038 — Song Site Dashboard Management Hub
- ADR-0040 — Multi-Access Sign In Without an Authorization Bypass
- [Sign In Multi-Access Mockup](../mockups/sign-in-multi-access.md)

## Functional requirements

1. The page clearly labels each available access path and why a path may be unavailable.
2. Home provides a clear Sign In action to `/signin`; Microsoft sign-in uses the approved Entra flow and lands on `/dashboard` after trusted backend session resolution.
3. An additional provider is rendered only when enabled by server-controlled configuration.
4. Development Mode is rendered only for an explicitly allowed local environment and never for public deployments.
5. Public read-only access never creates dashboard or mutation permissions.
6. The top-right menu shows the current user's first name from the trusted session/me response.
7. Profile returns to the current user's dashboard and cannot change identity or scope.
8. Sign off invalidates the provider/local session and returns to `/home`.
9. Every authenticated identity lands on `/dashboard`; dashboard data and tools are filtered by backend-resolved role, ownership and approved cohort scope. `/dashboard` is not the public landing page.

## Post-login dashboard behavior

The Sign In flow does not route users to separate role-specific home pages:

- Regular members receive own-data dashboard cards and personal onboarding/task status only.
- POCs/leads receive their own data plus approved team/cohort scope only.
- Administrators receive authorized operational statistics and management tools.
- Development fixtures receive only their configured server-side permissions and are visibly labeled as local identities.

The frontend may hide unavailable navigation for usability, but the backend remains responsible for direct-route and API authorization. This work package does not claim that all role-specific dashboard data is implemented.

## API and data requirements

- Define a session/me response that exposes provider, authenticated state, display name/first name, and server-derived access-mode availability without exposing tokens.
- Define sign-out behavior for local and production providers.
- Keep identity records keyed by provider, issuer, and subject.
- Do not link accounts by email alone without an approved linking policy.

## Security requirements

- Backend token/session validation precedes protected data access.
- Development sessions are signed, expiring, loopback/local-only, and rejected outside Development Mode.
- The frontend cannot select a role, permission, provider identity, or data scope.
- Dashboard queries enforce ownership and cohort scope in addition to role permissions.
- Logout and expired-session behavior are tested against protected routes and mutation APIs.

## Acceptance criteria

- [ ] Sign In page renders the approved provider options and unavailable/help states.
- [ ] `/home` is usable without authentication and exposes only public/read-only content.
- [ ] `/` redirects to `/home`, and Home links to `/signin`.
- [ ] Entra sign-in from `/signin` lands on `/dashboard` when production identity configuration is available.
- [ ] Development Mode works without Entra credentials on loopback only.
- [ ] Public read-only access remains unauthenticated and cannot mutate.
- [ ] Account menu displays the trusted current user's first name.
- [ ] Profile navigates to `/dashboard`.
- [ ] Sign off invalidates the session and returns to `/home`.
- [ ] Inactive, unmapped, expired, forged, and wrong-provider sessions are rejected.
- [ ] Member, POC/lead, administrator, and Development Mode dashboard responses are scope-tested without cross-user data leakage.
- [ ] Browser and backend security tests cover the paths and negative cases.

## Decisions requiring approval

- Whether users without organizational SSO need a production provider.
- Which provider, invitation/self-registration policy, account-linking rules, recovery process, and retention policy apply.

## Definition of Done

The selected provider contract, session/me and sign-out APIs, UI states, accessibility behavior, backend enforcement, browser tests, and runbook are complete. If the additional production provider is not approved, its option remains documented but disabled; it must not be simulated with a security bypass.
