# ArtPortfolio

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.2.7.

## New Developer Checklist (`feat/sso`)

Follow these steps when setting up the SSO branch on your local machine.

1. Checkout the branch:

```bash
git fetch origin
git switch feat/sso
git pull origin feat/sso
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
