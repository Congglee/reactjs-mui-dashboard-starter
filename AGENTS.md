## Project snapshot

- **Repo type**: single project (one Vite app)
- **Stack**: React 19, TypeScript 5.9 (strict), Vite 7, Material UI v7 (+ MUI X), React Router v7
- **State**: Context API (`src/providers/`)
- **Planned**: Axios + TanStack Query (future `src/apis/`, `src/queries/`)

## Root setup commands

- **Install**: `npm ci` (preferred) or `npm install`
- **Dev**: `npm run dev`
- **Build** (includes typecheck via `tsc -b`): `npm run build`
- **Typecheck only**: `npx tsc -b`
- **Lint**: `npm run lint` (or `npm run lint:fix`)
- **Format check**: `npm run prettier` (or `npm run prettier:fix`)
- **Preview**: `npm run preview`

## Universal conventions (must-follow)

- **Rules are mandatory**:
  - MUI v7 UI policy: `.cursor/rules/material-ui-v7.mdc`
  - Import + naming policy: `.cursor/rules/imports-and-naming.mdc`
- **Absolute imports only**: always use `@/…` for internal modules (no `./` / `../`).
- **kebab-case filenames**: components/pages should be `some-component.tsx`.
- **Material UI only**: do not introduce other UI libraries.
- **Tree-shaking imports**:
  - ✅ `import Button from '@mui/material/Button'`
  - ❌ `import { Button } from '@mui/material'`
- **Dark mode styling**:
  - ✅ use `theme.applyStyles('dark', …)` or CSS variables (`var(--color-…)`)
  - ❌ do not branch on `theme.palette.mode`

## Security & secrets

- **Never commit secrets** (API keys, tokens, credentials) to git.
- Put secrets in `.env*` (and keep them out of git). If you add new env vars, document required keys in `README.md` (briefly).

## JIT Index (what to open, not what to paste)

### Where to work

- App entry + wiring: `src/main.tsx`, `src/App.tsx` → see `src/AGENTS.md`
- Routes/pages: `src/routes/**` → see `src/routes/AGENTS.md`
- UI components: `src/components/**` → see `src/components/AGENTS.md`
- Global state: `src/providers/**` → see `src/providers/AGENTS.md`
- Theme + tokens: `src/theme.ts` (CSS vars + colorSchemes)
- Global CSS: `src/styles/index.css` → see `src/styles/AGENTS.md`
- Route paths: `src/constants/path.ts`

### Quick find commands

- Find a component: `rg -n "export default function" src/components`
- Find a route: `rg -n "export default function" src/routes`
- Find usage of a component: `rg -n "<ComponentName" src`
- Find MUI mode anti-patterns (must not exist): `rg -n "theme\\.palette\\.mode" src`
- Find all absolute import violations: `rg -n "from '\\.{1,2}/" src`

## Definition of Done (before PR)

- `npm run lint`
- `npm run prettier`
- `npm run build`
- No new warnings about MUI import/style rules (tree-shaking, `theme.applyStyles`, `@/` imports)
