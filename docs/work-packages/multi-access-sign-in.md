# WP-044 — Multi-Access Sign In and Account Menu

Status: In progress locally; sign-in-only access policy accepted, production authentication providers remain incomplete

## Scope

Define and implement the sign-in-only portal access experience:

- `/signin` as the only unauthenticated portal page; `/` redirects to `/signin`.
- Microsoft Entra SSO as the intended Production Mode path, with backend verification still outstanding.
- Email one-time-code sign-in with self-registration as the selected non-SSO direction; keep its form disabled until delivery and verification are implemented.
- Local-only Development Mode using the server-controlled fixtures from ADR-0035.
- Authentication on every other portal route and data API; no public Home or guest-browsing path.
- No Sign In button or link in the authenticated portal header; `/signin` is the only unauthenticated portal page.
- Authenticated top-right account button showing only the current user's name from the trusted session/me response; **Profile** is not shown on the button.
- The account dropdown contains **Profile** → `/dashboard` and **Logout** → invalidate the session and return to `/signin`. **Profile** is available to every authenticated role; dashboard content is role-scoped, with authorized management tools for administrators and limited member-scoped content for members.

## Non-goals

- No production email-delivery provider is selected by this work package.
- No password-based login or hidden local-account bypass.
- No role/permission selection in the browser.
- No production Entra token-validation implementation; that remains in WP-041.
- No email delivery, OTP verification, or email-user activation implementation in this slice.

## References

- ADR-0019 — Identity and Access Lifecycle
- ADR-0032 — Microsoft Entra SSO and API Token Integration
- ADR-0035 — Development Authentication and Identity Isolation
- ADR-0038 — Song Site Dashboard Management Hub
- ADR-0040 — Multi-Access Sign In Without an Authorization Bypass
- [Sign In Multi-Access Mockup](../mockups/sign-in-multi-access.md)

## Functional requirements

1. The page clearly labels each available access path and why a path may be unavailable.
2. `/signin` offers Microsoft sign-in and a visibly disabled email one-time-code option until delivery and verification are configured.
3. Entra sign-in grants portal access only after trusted backend token verification and principal resolution; this production integration remains outstanding.
4. Development Mode is rendered only for an explicitly allowed local environment and never for public deployments.
5. `/signin` is the only public portal page; all other portal routes and data APIs require a backend-authenticated session.
6. The authenticated header has no Sign In control; its account button displays only the current user's name from the trusted session/me response.
7. The account dropdown contains Profile for every authenticated role. It opens `/dashboard` without changing identity or scope, and the dashboard content remains role-scoped.
8. Logout invalidates the provider/local session and returns to `/signin`.
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

- [ ] Sign In page renders Microsoft SSO and a clearly disabled email one-time-code option while delivery is unavailable.
- [ ] `/signin` is the only unauthenticated portal route; `/` redirects to `/signin`.
- [ ] Every other portal route redirects unauthenticated users to `/signin`.
- [ ] Every portal data API rejects unauthenticated requests with `401`.
- [ ] Entra sign-in from `/signin` reaches `/dashboard` only after production backend identity verification is implemented.
- [ ] Development Mode works without Entra credentials on loopback only.
- [ ] The authenticated header has no Sign In control; its account button displays only the trusted current user's name.
- [ ] Profile appears only in the dropdown, is available to all authenticated roles, and opens the role-scoped `/dashboard`.
- [ ] The dropdown contains Logout, which invalidates the session and returns to `/signin`.
- [ ] Inactive, unmapped, expired, forged, and wrong-provider sessions are rejected.
- [ ] Member, POC/lead, administrator, and Development Mode dashboard responses are scope-tested without cross-user data leakage.
- [ ] Browser and backend security tests cover the paths and negative cases.

## Decisions requiring approval

- Which Entra tenant, claims mapping, provisioning and administrator recovery rules apply.
- Which email-delivery service and verification/retention policy support one-time-code sign-in.
- What activation and authorization policy applies to self-registered email users; self-registration must not grant a role.

## Definition of Done

The selected provider contract, session/me and sign-out APIs, UI states, accessibility behavior, backend enforcement, browser tests, and runbook are complete. If the additional production provider is not approved, its option remains documented but disabled; it must not be simulated with a security bypass.

## Current implementation evidence

- `/` redirects to `/signin`, which is the only unauthenticated portal route.
- The sign-in page retains the existing Song Site visual theme, offers Microsoft SSO, and displays a disabled email one-time-code option while delivery is unavailable.
- The Development Mode fixture/role buttons have been removed from the page. Local administrator auto-session is available only when the backend is explicitly configured with `AUTH_MODE=development` and `DEV_DEFAULT_FIXTURE=administrator`; startup guards keep Development Mode out of production/deployed environments.
- Portal routes are guarded by backend session status, and unauthenticated portal data API requests are rejected. `/api/v1/session` remains available for status/local bootstrap only.
- This is not a production-ready SSO integration: the frontend can start Microsoft sign-in, but the backend Entra token validation/API authorization path remains unimplemented under `WP-041`.
- Email one-time-code sign-in is not implemented; its UI stays disabled until delivery, verification and account authorization are available.
- Account menu, provider sign-out, role-scoped member/lead/admin dashboard data, and browser qualification remain outstanding.
