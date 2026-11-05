# ADR-0041: Self-Service Member Entry and Onboarding Activation

- Status: Proposed for product-owner, identity/security and privacy approval
- Date: 2026-11-06
- Owner: To be assigned
- Related work packages: `WP-043`, `WP-044`, `WP-045`
- Related ADRs: `ADR-0019`, `ADR-0032`, `ADR-0035`, `ADR-0039`, `ADR-0040`

Implementation plan: [WP-045 Self-Service Sign-Up and Bench Onboarding Plan](../work-packages/self-service-sign-up-and-onboarding.md)

## Context

The current Song Bench runtime has a sign-in page and protected routes, but it does not provide a self-service path for a person who is not already provisioned. `SessionService` exposes sign-in and password change only. The sign-in UI has Microsoft SSO and a local email/password form, while the intended email one-time-code/self-registration path remains disabled. No registration request, email verification, activation, eligibility check, recovery flow or onboarding assignment is implemented.

The product requirement is self-service access to the Bench capability. Self-service must reduce coordinator setup without turning an email address, a browser-controlled role, or an unverified request into authorization. Account creation and onboarding assignment are separate lifecycle decisions.

## Decision

Design the entry experience as a two-stage, fail-closed flow:

1. **Request access:** a person submits an email address through the public sign-in entry. The system creates or refreshes a short-lived pending registration and sends a one-time verification code or approved magic link. Responses must not reveal whether an account already exists.
2. **Verify identity:** the person proves control of the email address. Verification creates an authenticated pending principal only; it does not grant a role, cohort scope or onboarding data.
3. **Resolve eligibility:** the backend resolves the provider identity and approved Bench eligibility policy. The result is one of `active`, `pending-review`, `ineligible` or `suspended`. Only `active` principals may access protected Bench data.
4. **Activate onboarding:** an eligible member receives an assignment from a published template version. Assignment creation is owned by the onboarding domain in `ADR-0039`, whether it is automated from an approved cohort rule or initiated by an in-scope coordinator. The member may not assign themselves or another person.
5. **Recover and exit:** verification codes expire and are single-use. Users can request a new code, sign out, and use a defined support/recovery path without exposing account or eligibility state.

Microsoft Entra SSO remains the preferred production identity path where available. Email self-service is an alternate entry path and must use the same backend principal, eligibility, authorization and audit rules. Development Mode remains local-only and is not a self-service substitute.

## Consequences

Positive:

- A member can start without a pre-created local password or coordinator-created account.
- Identity proof, eligibility, authorization and assignment remain explicit boundaries.
- The flow supports both Entra and approved email entry without account linking by email alone.
- Pending, rejected and suspended states can be explained without leaking account existence.

Costs and risks:

- Email delivery, rate limiting, abuse controls, retention and support ownership become release dependencies.
- The product owner must choose the eligibility source and whether activation is automatic or coordinator-approved.
- Self-service cannot be declared complete until verification, recovery, activation, protected API access and audit evidence work end to end.

## Required API and data decisions

- Public endpoints: request verification, verify code/link, resend with throttling, and retrieve only non-sensitive flow status.
- Protected endpoints: current principal, eligibility status, onboarding activation/assignment status and recovery actions.
- Data: registration request, hashed verification secret, expiry/attempt counters, provider identity, eligibility decision, activation audit event and retention policy.
- Security: generic responses, single-use secrets, replay protection, rate limits, CSRF/session protections, audit events and no role/member/cohort claims from the browser.

## Acceptance gates

- A new eligible member can complete request, verification, activation and first protected onboarding read without administrator intervention.
- An unverified, ineligible, suspended or expired request cannot read onboarding data or mutate assignments.
- Repeated requests do not disclose account existence and verification secrets cannot be replayed.
- Self-service never grants a role, coordinator scope or access to another member's assignment.
- Recovery, resend, expiry, logout and session-expiry journeys are browser-tested.
- Email delivery, privacy/retention, abuse response and support ownership are approved before production enablement.
