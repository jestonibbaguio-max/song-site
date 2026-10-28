# Sign In — Multi-Access Mockup

This wireframe reflects the current `/signin` entry page. It preserves the Song Site theme and does not select a production non-SSO identity provider.

```text
┌──────────────────────────────────────────────────────────────┐
│                         SONG BENCH                           │
│                                                              │
│                    Welcome back                              │
│       Sign in to access your Song Site dashboard             │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐  │
│  │  Sign in with Microsoft SSO                           │  │
│  └────────────────────────────────────────────────────────┘  │
│                                                              │
│                    Sign in with email                        │
│  Email one-time-code sign-in is unavailable until email      │
│  delivery is configured.                                     │
│  [ disabled email address field ]                            │
│  [ disabled: Email sign-in unavailable ]                     │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

The email one-time-code option is intentionally disabled until email delivery, verification, account activation, and authorization policy are implemented. An email address alone does not establish identity or grant access.

Local Development Mode may establish a session only through an explicit backend loopback configuration. The user-facing page has no fixture/role selector; the browser cannot choose an identity, role, or permission.

`/signin` is the only unauthenticated portal page. No Home or guest-browsing action is available.
