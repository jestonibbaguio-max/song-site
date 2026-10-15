# ADR-0038: Dashboard and Home Route Separation

- Status: Proposed; awaiting product-owner approval
- Date: 2026-10-15
- Owner: To be assigned
- Related work packages: `WP-042`
- Related ADRs: `ADR-0001`, `ADR-0006`, `ADR-0007`, `ADR-0017`, `ADR-0022`, `ADR-0030`

## Context

The current Angular route model uses `/dashboard` for the existing `HomeComponent`. That component is the ATCP Song Bench landing experience: navigation, welcome content, spotlight, quick announcements, and footer. The authentication entry page is `/`, and the navbar's Home link also points to `/`.

This creates three problems:

- The URL `/dashboard` does not clearly identify the content users expect from a work dashboard.
- The existing home/landing experience is not available at a stable `/home` route.
- The navbar Home link returns to the authentication entry page instead of the authenticated application home.

The product now requires a distinct `/dashboard` page while preserving the existing dashboard/landing experience under `/home`. The new dashboard is a real authenticated application shell with a sidebar and tools for Dashboard, User, and Settings. The change must not break Skip SSO, Development Mode, public browsing, deep links, or existing task routes.

## Decision

Separate the authenticated application routes as follows:

| Route | Responsibility | Access behavior |
| --- | --- | --- |
| `/` | Authentication entry and local access selection | Entra sign-in, Skip SSO Guest Mode, or local Development Mode entry when enabled |
| `/home` | Existing ATCP Song Bench home experience currently served by `HomeComponent` | Public/read-only content, with existing authenticated shell behavior preserved |
| `/dashboard` | New dashboard application shell with themed sidebar navigation, personalized work, Journey progress, task summaries, and approved dashboard widgets | Public reads remain available where currently approved; mutations remain protected by backend authorization |
| `/my-journey` | Journey task experience | Existing route and behavior preserved |
| `/training-tracker` | Training task experience | Existing route and behavior preserved |

The current `HomeComponent` moves from `/dashboard` to `/home`. A new dashboard component and route own `/dashboard`; it must not be implemented by renaming or duplicating the old home template without an approved dashboard content model.

### Dashboard shell and sidebar

The `/dashboard` page uses the existing Song Site visual language: Graphik typography, current brand colors, rounded cards, spacing scale, icon treatment, responsive behavior, and existing header/footer conventions. It must feel like the same product rather than a separate administrative application.

The dashboard shell contains:

- a persistent or collapsible sidebar on desktop;
- a responsive drawer or accessible menu on smaller screens;
- an active Dashboard item linking to `/dashboard`;
- a User item linking to the authenticated user's profile or user workspace;
- a Settings item linking to account/application settings; and
- existing Journey, Training Tracker, Announcement, and other approved tools as navigation items where product-approved.

Sidebar items are navigation affordances, not permission grants. User and Settings screens must expose only data and actions allowed for the resolved backend principal. Administrator-only user administration remains governed by `ADR-0015` and must not be implied by the generic User item.

The navbar Home link must point to `/home`. The authentication entry flow may continue redirecting successful or skipped access to `/dashboard`, subject to product-owner confirmation of the post-entry destination. Any existing links that intentionally mean the marketing/bench home must use `/home` explicitly.

Route naming is a frontend navigation concern only. It must not change backend authorization, session mode, role mapping, or the distinction between Guest, Development, and Production access. Backend permission checks remain authoritative for all mutations.

## Compatibility and migration rules

- Existing `/dashboard` links must be inventoried before changing behavior.
- A compatibility redirect from `/dashboard` to `/home` is not acceptable after the new dashboard is introduced because `/dashboard` is the new product destination; callers that require the old content must migrate to `/home`.
- Deep links to `/my-journey`, `/training-tracker`, `/announcement`, and task detail pages remain unchanged.
- The old HomeComponent public layout and API behavior must remain unchanged except for its route location.
- The sidebar must preserve keyboard navigation, visible focus, active-route indication, accessible names, and a usable collapsed/mobile state.
- User and Settings pages must use the shared shell/theme and must not introduce a second visual system.
- Browser history, refresh, static-host fallback, and Docker/Azure base-path behavior must be verified.
- Analytics, bookmarks, documentation, and test fixtures must distinguish `/home` from `/dashboard`.

## Consequences

The route vocabulary becomes explicit and supports a real dashboard without overloading the home page. Existing links and tests must be updated, and the application will temporarily have two similar-looking top-level pages until the dashboard content is implemented. A route move alone does not define every dashboard widget, data ownership, or authorization scope; those are implementation requirements in `WP-042` and may require follow-up decisions.

## Security and authorization

Route visibility or a frontend guard must not grant permissions. Guest users may view only approved public data. Development identities remain local-only and backend-controlled under `ADR-0035`; Production Mode remains Entra-backed under `ADR-0032` and `WP-041`. Dashboard mutation controls, if any, must call protected API routes and receive `401`/`403` responses consistently.

## Verification requirements

- `/home` renders the former `/dashboard` HomeComponent with no public layout regression.
- `/dashboard` renders the new dashboard component and does not accidentally render the old home template.
- The navbar Home link resolves to `/home`.
- `/` still supports Entra, Skip SSO Guest Mode, and approved local Development Mode behavior.
- Existing deep links and refreshes work in local development, Docker, and the deployed SPA hosting configuration.
- Guest, Development, and Production authorization behavior is unchanged.
- Angular route tests, component tests, production build, and Playwright navigation tests cover both routes.
- No obsolete `/dashboard` references remain in navigation, tests, documentation, or deployment smoke checks unless explicitly marked as compatibility evidence.

## Decisions requiring product-owner approval

- What is the first approved dashboard content: Journey/task summary only, or additional spotlight/announcement widgets?
- After authentication or Skip SSO, should the default destination be `/dashboard` or `/home`?
- Should `/home` remain publicly readable, or should it require an authenticated session?
- Which dashboard widgets may be personalized and which remain page-level published content?
- Is a temporary redirect from existing bookmarked `/dashboard` URLs needed before the new dashboard is released?
- Which User capabilities are in the first release: personal profile only, or administrator user management as a separate protected tool?
- Which Settings capabilities are in the first release: display/account preferences only, or security/session preferences as well?

## Implementation boundary

This ADR defines route ownership and migration rules. It does not claim that the new dashboard page, data model, or UI has been implemented.
