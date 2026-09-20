# ArtPortfolio

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.2.7.

## New Developer Checklist (`feat/sso`)

Follow these steps when setting up the SSO branch on your local machine.

1. Checkout the branch:

```bash
git checkout main
```

2. Install dependencies (use legacy peer dependency resolution):

```bash
npm install --legacy-peer-deps
```

3. Create a local `.env` file in the project root:

```env
# SSO-LOCAL
VITE_AZURE_REDIRECT_URI=http://localhost:4200/
VITE_ENTRA_CLIENT_ID=8b6a9386-67b2-4d05-9966-6f20a67713f8
VITE_ENTRA_TENANT_ID=b647a764-1b83-4076-8305-ff4ee0fbbcdf
```

4. Start the app:

```bash
npm start
```

Notes:
- The `.env` file is local-only and should not be committed.
- If port 4200 is already in use, run `npm start -- --port 4201` and update the redirect URI to match.

## Full Local Setup

The application has an Angular frontend and an Express backend. The backend uses PostgreSQL for the `users` and `tasks` tables.

### Prerequisites

- Node.js LTS and npm
- VS Code
- Homebrew on macOS
- PostgreSQL 17

### Install the VS Code PostgreSQL extension

1. Open the Extensions view in VS Code (`Cmd+Shift+X`).
2. Search for `PostgreSQL` and install the Microsoft PostgreSQL extension (`ms-ossdata.vscode-pgsql`).

You can also install it from a terminal:

```bash
code --install-extension ms-ossdata.vscode-pgsql
```

The extension is a database client for browsing and querying PostgreSQL. It does not install the PostgreSQL server.

### Install PostgreSQL on macOS

Install Homebrew if it is not already installed:

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

Add Homebrew to zsh:

```bash
printf '\n' >> "$HOME/.zprofile"
printf '%s\n' 'eval "$(/opt/homebrew/bin/brew shellenv zsh)"' >> "$HOME/.zprofile"
eval "$(/opt/homebrew/bin/brew shellenv zsh)"
```

Install and start PostgreSQL:

```bash
brew install postgresql@17
brew services start postgresql@17
export PATH="/opt/homebrew/opt/postgresql@17/bin:$PATH"
```

To make the PostgreSQL command-line tools available in future terminals, add the `PATH` export to `~/.zprofile`.

### Create and seed the database

From the repository root:

```bash
createdb song_site
psql song_site -v ON_ERROR_STOP=1 -f backend/db/schema.sql
```

Install backend dependencies and seed the task data:

```bash
npm --prefix backend install
export DATABASE_URL="postgresql://$(whoami)@localhost:5432/song_site"
npm --prefix backend run db:seed
```

The seed imports 12 journey tasks from `backend/tasks.json` and 7 training tasks from `backend/training-tasks.json`. It does not import users; the `users` table starts empty and users should be created by the application's authentication flow or manually for local testing. Running `createdb song_site` again is safe to skip if the database already exists.

For a local test user, run:

```bash
psql song_site -c "INSERT INTO users (email, display_name) VALUES ('developer@example.com', 'Local Developer') ON CONFLICT (email) DO NOTHING;"
```

### Connect from the VS Code extension

Create a PostgreSQL connection using:

```text
Host: localhost
Port: 5432
Database: song_site
Username: your macOS username
Password: leave blank for the default local Homebrew setup
SSL: disabled or default
```

Expand `song_site > Schemas > public > Tables` to view `users` and `tasks`.

### Start the application

Use two terminals from the repository root.

Terminal 1, backend:

```bash
export DATABASE_URL="postgresql://$(whoami)@localhost:5432/song_site"
npm --prefix backend start
```

Terminal 2, frontend:

```bash
npm install --legacy-peer-deps
npm start
```

Open `http://localhost:4200/`. The backend runs at `http://localhost:5001/`.

### Useful database commands

```bash
psql song_site
```

```sql
\dt
SELECT * FROM users;
SELECT task_type, COUNT(*) FROM tasks GROUP BY task_type;
```

Exit the PostgreSQL console with `\q`.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
