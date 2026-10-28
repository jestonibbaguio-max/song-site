# Song Site Demo — 10-Minute Presentation

**Presentation date:** October 30, 2026  
**Audience:** Song Site stakeholders and delivery team  
**Format:** Short product walkthrough with presenter notes  
**Purpose:** Show the sign-in experience, dashboard, user management, Announcement page, and Announcement Edit Mode.

> **Implementation status to state accurately:** The sign-in screen presents Microsoft SSO and email one-time-code access, but production access is not end-to-end. Backend Entra token verification is not implemented, and email sign-in is disabled until delivery and verification are configured. The local Development Mode administrator is used only to access the demo environment; it is not a production sign-in method.

## Run of show

| Time | Slide | Focus |
|---|---:|---|
| 0:00-0:30 | 1 | Welcome and demo goal |
| 0:30-1:45 | 2 | Sign-in options and current readiness |
| 1:45-3:15 | 3 | New dashboard |
| 3:15-4:45 | 4 | User Management |
| 4:45-6:30 | 5 | Announcement page |
| 6:30-9:00 | 6 | Announcement Edit Mode |
| 9:00-10:00 | 7 | Takeaways and next steps |
| **Total** |  | **10 minutes** |

---

## Slide 1 — Song Site: One Place to Start

**Time:** 0:30

### On slide

- One portal for key Song Site content and tools
- Today: access, dashboard, user management, and managed announcements

### Presenter notes

“In ten minutes, I’ll show the current portal experience and the work behind it: how people enter, what the dashboard provides, how user access is managed, and how Announcement content can be edited without changing the page code.”

---

## Slide 2 — One Sign-In Page, Two Intended Access Paths

**Time:** 1:15

![Figure 01 - Sign In](<./figures/Figure 01 - Sign In.png>)

### On slide

- Microsoft SSO for organizational users
- Email one-time code is the selected non-SSO direction
- Email sign-in is visibly disabled until mail delivery and verification are ready
- The current walkthrough uses a local-only administrator session

### Presenter notes

“The page keeps both intended access paths visible without pretending they are both ready for production. The Microsoft button can start the frontend sign-in flow, but backend Entra token verification is still outstanding. Email one-time-code sign-in is disabled because no delivery and verification service is configured. For the rest of this local demo, the backend supplies a loopback-only administrator session. That session is not available in production and the email address does not itself authenticate anyone.”

**Avoid claiming:** production SSO or email sign-in currently grants portal access end to end.

---

## Slide 3 — Dashboard: A Shared Starting Point

**Time:** 1:30

![Figure 02 - Dashboard](<./figures/Figure 02 - Dashboard.png>)

### On slide

- A common dashboard rather than separate role-specific landing pages
- Summary cards and clear navigation to available tools
- Access is resolved by the backend, not by a visible role selector

### Presenter notes

“The dashboard is the common starting point after access is established. It brings the current status and tools into one place. Navigation visibility helps the user, but the backend remains responsible for protecting data and actions.”

**Show:** the summary area, the navigation, and how the user moves to User Management and Announcement.

---

## Slide 4 — User Management: Review and Maintain Accounts

**Time:** 1:30

![Figure 03 - User Management](<./figures/Figure 03 - User Management.png>)

### On slide

- Search and filter the user directory
- Review and update supported profile or active-status fields
- Protect changes with backend permissions and audit events

### Presenter notes

“This screen gives an authorized administrator a practical view of the user directory. The current slice supports search, filtering, and selected profile or account-status updates. Those writes are checked by the backend and recorded. This is not yet a full identity lifecycle console: user creation and complete role/permission administration remain outside the demonstrated scope.”

**Show:** one search or filter, then point to the supported account status/profile information. Do not edit real user records during the presentation.

---

## Slide 5 — Announcement: Published Content in One Page

**Time:** 1:45

![Figure 04 - Announcement](<./figures/Figure 04 - Announcement.png>)

### On slide

- Published page content includes the hero, recognition carousel, training links, notices, and reminder
- The page renders content from the backend-backed page-content API
- Dashboard announcement cards remain a separate content surface

### Presenter notes

“Announcement is more than a static notice. Its page content is stored and served as a versioned aggregate, while the page keeps its existing visual experience. The carousel, training links, notices, and reminder are distinct sections. The small dashboard announcement cards use a separate data/API surface.”

**Show:** the hero and the main page sections. The presentation capture uses synthetic demo content.

---

## Slide 6 — Edit Mode: Draft, Preview, and Publish

**Time:** 2:30

![Figure 05 - Announcement Edit Mode](<./figures/Figure 05 - Announcement Edit Mode.png>)

### On slide

- Edit controls appear only for an authorized identity
- Edit structured page sections instead of editing Angular templates
- Save a draft, preview it, and publish with the separate publishing permission
- Keep version history and restore a prior version as a new draft

### Presenter notes

“An authorized editor enters Edit Mode from the Announcement page. The editor works with structured fields for the page sections. A draft can be saved and previewed without changing the published page. Publishing is a separate permission and action. The version history supports restoring an earlier version as a new draft, so a restoration still follows the normal review and publication path.”

**Live walkthrough, if time permits:**

1. Change a synthetic notice title.
2. Show that the editor marks the content as unsaved.
3. Preview the draft and point out that it is not published.
4. Save the draft; show the new version.
5. Explain the Publish permission. Do not publish during the presentation unless the demo owner has approved the change.

---

## Slide 7 — What Is Ready, What Comes Next

**Time:** 1:00

### On slide

**Demonstrated locally**

- Sign-in-first portal boundary and local administrator session
- Dashboard and protected User Management
- API-backed Announcement content and Edit Mode

**Remaining before production sign-in**

- Backend Entra token verification and identity mapping
- Email delivery, code verification, and account activation policy
- Further release and browser qualification

### Presenter notes

“The strongest result today is a coherent portal experience with backend-protected data and an end-to-end local authoring workflow. The production sign-in integrations are not complete, so we should treat them as explicit next steps rather than imply they are ready. Thank you.”

---

## Demo preparation and safety

- Use the isolated local Development Mode and synthetic Announcement content for screenshots or rehearsal.
- Do not use production accounts or change real user records during the presentation.
- Do not present email addresses, tokens, private URLs, or user identities on screen.
- If the local demo environment is unavailable, use Figures 01-05 and explain that they are sanitized local captures.
- Keep the SSO and email readiness caveat visible when describing dual sign-in.

## References

- [ADR-0040: Sign-In-Only Portal Access](../adr/0040-multi-access-sign-in.md)
- [WP-044: Multi-Access Sign In and Account Menu](../work-packages/multi-access-sign-in.md)
- [ADR-0034: API-Backed Announcement Page Content](../adr/0034-api-backed-announcement-page-content.md)
- [Song Site navigation flows](../navigation-flows.md)
