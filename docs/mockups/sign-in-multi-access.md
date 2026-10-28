# Sign In — Multi-Access Mockup

This is a documentation wireframe for the proposed Sign In page. It is not a runtime implementation and does not select a production non-SSO provider.

```text
┌──────────────────────────────────────────────────────────────┐
│                         SONG BENCH                           │
│                                                              │
│                    Welcome back                              │
│       Sign in to access your Song Site dashboard             │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐  │
│  │  Continue with Microsoft                              │  │
│  └────────────────────────────────────────────────────────┘  │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐  │
│  │  Continue with approved external provider              │  │
│  └────────────────────────────────────────────────────────┘  │
│  Available only when enabled for this environment.           │
│                                                              │
│  ─────────────────────── or ───────────────────────────────  │
│                                                              │
│  Local development                                           │
│  [Start Development Mode]                                    │
│  Available only on the local development server.             │
│                                                              │
│  Public visitors can continue to approved read-only pages.   │
│  Read-only access does not grant dashboard or edit access.   │
│                                                              │
│  Need help signing in? Contact the Song Bench support path.  │
└──────────────────────────────────────────────────────────────┘
```

## Authenticated account menu

```text
┌────────────────────────────┐
│ Danny ▾                    │
├────────────────────────────┤
│ Profile                    │  → /dashboard for Danny
├────────────────────────────┤
│ Sign off                   │  → invalidate session, then /
└────────────────────────────┘
```

The external-provider and Development Mode controls are rendered only when the backend/session configuration exposes them. The client cannot enable either path, choose a role, or create an authenticated principal.

