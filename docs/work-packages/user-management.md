# WP-016 — Functional User Management

Status: In progress on `feature/user-management`

## Scope

Deliver the first functional User Management capability below Dashboard:

- Protected user directory for administrators.
- Search by display name, email, and assigned role label.
- Active/inactive filtering.
- Profile updates for display name and email.
- Account active-status updates.
- Audit event for every profile/status update.
- SQLite and PostgreSQL schema and business-rule parity.

## Non-goals

This work package does not implement user creation, role assignment, permission administration, Entra provisioning, sign-in page redesign, production identity lifecycle, or a frontend-controlled authorization model. Roles and permissions remain deferred until the sign-in and authorization slice is approved.

## References

- ADR-0005 — Role-Based Access Control
- ADR-0015 — User Administration Experience
- ADR-0035 — Development Authentication and Identity Isolation
- ADR-0038 — Welcome Route and Dashboard Management Shell

## Functional and technical requirements

1. The sidebar places User Management immediately below Dashboard.
2. `GET /api/v1/rbac/users` requires the backend-resolved `rbac:users:read` permission.
3. `PUT /api/v1/users/{userId}` requires the backend-resolved `rbac:users:manage` permission and CSRF protection for development sessions.
4. The API validates display name, email, and boolean active status.
5. Duplicate email updates return `409 Conflict`.
6. An administrator cannot deactivate their own account.
7. No frontend field, role selector, or hidden control grants a role or permission.
8. The update is recorded in `authorization_audit_events` with actor and changed fields.
9. SQLite and PostgreSQL expose equivalent `is_active` behavior.

## API and database changes

- `GET /api/v1/rbac/users` remains the directory endpoint.
- `PUT /api/v1/users/{userId}` updates profile/status fields only.
- OpenAPI documents the update request and 401/403/404/409 responses.
- SQLite migration `backend/migrations/017-user-management-status.sql` adds `users.is_active`.
- PostgreSQL migration `backend/migrations-postgres/017-user-management-status.sql` adds the equivalent boolean column.

## Security requirements

- Guest and non-authorized principals cannot mutate users.
- Authorization is evaluated by the backend from the session principal.
- Development identities remain isolated from production identity stores.
- No Entra configuration or production authentication behavior changes in this package.

## Acceptance criteria

- [ ] Administrator can open User Management below Dashboard.
- [ ] Administrator can search and filter the directory.
- [ ] Administrator can save display-name/email/status changes.
- [ ] Duplicate email and self-deactivation protections are verified.
- [ ] Guest and unauthorized principals receive 401/403 responses for protected operations.
- [ ] Each update creates an audit event.
- [ ] Clean and repeat SQLite migrations succeed.
- [ ] Clean and repeat PostgreSQL migrations succeed.
- [ ] Backend, frontend, build, and security regression tests pass.

## Definition of Done

Runtime behavior, API contract, migrations, UI, security tests, and evidence are updated together. This work package is not complete until the acceptance criteria are executed against the supported local database configurations; documentation alone is insufficient.
