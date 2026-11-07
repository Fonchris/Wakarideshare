# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend enabling type-aware lint rules by installing `oxlint-tsgolint` and editing `.oxlintrc.json`:

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "typescript", "oxc"],
  "options": {
    "typeAware": true
  },
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}
```

See the [Oxlint rules documentation](https://oxc.rs/docs/guide/usage/linter/rules) for the full list of rules and categories.

## Deploying to Vercel

This project is configured as a Vite single-page application. Import the repository
into Vercel and use the detected defaults:

- Build command: `npm run build`
- Output directory: `dist`
- Install command: `npm install`

The included `vercel.json` keeps client-side routes working after deployment.

The production build also includes the Waka PWA manifest and service worker. The
manifest and worker are served from `/manifest.json` and `/sw.js`; keep these
paths available at the site root when changing the Vercel routing configuration.

## Authentication setup

Authentication is handled by Clerk. The repository includes [.env.example](./.env.example)
as a safe template. Local secret and environment files are ignored by Git.

### 1. Configure the Clerk application

In the selected Clerk application:

1. Open **Configure > Email, phone, username** and enable email authentication
   with password or the email verification method you want to use.
2. Open **Configure > Social connections** and enable **Google**.
3. Leave **Apple** disabled unless an Apple Developer account and Apple OAuth
   credentials are available. The app also hides the Apple provider button in
   its Clerk appearance configuration.
4. In **Configure > Paths**, use the application's default sign-in and sign-up
   paths. The current app opens Clerk's embedded sign-in and sign-up components,
   so no separate frontend route file is required.

### 2. Configure local development

Copy the example file to `.env.local`:

```powershell
Copy-Item .env.example .env.local
```

Open `.env.local` and replace the placeholder with the **Publishable key** from
**Clerk Dashboard > API Keys**:

```env
VITE_CLERK_PUBLISHABLE_KEY=pk_test_your_key
```

The value must contain only the key. Do not repeat the variable name:

```env
# Correct
VITE_CLERK_PUBLISHABLE_KEY=pk_test_...

# Incorrect
VITE_CLERK_PUBLISHABLE_KEY=VITE_CLERK_PUBLISHABLE_KEY=pk_test_...
```

Use the test/development key while running locally. Never use a Clerk secret key
in a `VITE_` variable. Restart Vite after changing `.env.local`:

```powershell
npm run dev
```

### 3. Test locally

Verify each of these flows in a browser:

- Create an account with email and password.
- Sign out, then sign in again.
- Sign in with Google.
- Resize to a narrow Android/iPhone viewport and complete the forms.
- Confirm that joining or creating a ride asks unauthenticated users to sign in.

OAuth providers must be enabled and configured in Clerk before their buttons can
complete authentication. If Google shows a provider configuration error, the fix
is in the Clerk Dashboard rather than in the React code.

Apple sign-in is intentionally not offered until its Apple Developer setup is
completed. If it is enabled later, Apple requires a Services ID, Team ID, key ID,
and private key configured in Clerk. The private key belongs only in Clerk's
dashboard and must not be added to this repository or a Vite environment variable.

### 4. Configure Vercel

In **Vercel > Project > Settings > Environment Variables**, add:

```text
Name: VITE_CLERK_PUBLISHABLE_KEY
Value: pk_live_your_key
Environments: Production, Preview, Development (as needed)
```

Use the live key for the production deployment. Redeploy after saving the
variable because Vite embeds `VITE_` variables during the build.

In Clerk, add the deployed Vercel domain under the application's allowed origins
or production instance settings when Clerk asks for it. Add the final custom
domain too if one will be used. The existing [vercel.json](./vercel.json)
keeps the single-page app fallback working.
