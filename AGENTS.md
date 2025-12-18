## Project snapshot

- **Repo type**: Single project (Vite React app)
- **Stack**: React 19, TypeScript 5.9 (strict), Vite 7, Material UI v7 (+ MUI X), React Router v7, TanStack Query, Axios, Zod
- **State**: Context API (`src/providers/`) for client state, TanStack Query (`src/queries/`) for server state

## Root setup commands

| Task | Command |
|------|---------|
| Install | `npm ci` (preferred) or `npm install` |
| Dev server | `npm run dev` |
| Build (includes typecheck) | `npm run build` |
| Typecheck only | `npx tsc -b` |
| Lint | `npm run lint` (or `npm run lint:fix`) |
| Format | `npm run prettier` (or `npm run prettier:fix`) |
| Preview build | `npm run preview` |

## Universal conventions (must-follow)

- **Cursor rules are mandatory**:
  - `.cursor/rules/material-ui-v7.mdc` — MUI v7 UI policy
  - `.cursor/rules/imports-and-naming.mdc` — Import & naming policy
- **Absolute imports only**: `@/…` for internal modules (no `./` / `../`)
- **kebab-case filenames**: `some-component.tsx`, `user-settings.tsx`
- **Material UI only**: No other UI libraries
- **Tree-shaking imports**:
  - ✅ `import Button from '@mui/material/Button'`
  - ❌ `import { Button } from '@mui/material'`
- **Dark mode styling**:
  - ✅ `theme.applyStyles('dark', {...})` or CSS variables `var(--color-*)`
  - ❌ Never branch on `theme.palette.mode`

## Security & secrets

- **Never commit secrets** to git
- Put secrets in `.env*` files (gitignored)
- Required env var: `VITE_APP_API_URL` — document in `README.md`

## JIT Index (what to open, not what to paste)

### Package structure

| Area | Location | Details |
|------|----------|---------|
| App entry | `src/main.tsx`, `src/App.tsx` | → [src/AGENTS.md](src/AGENTS.md) |
| Routes/pages | `src/routes/**` | → [src/routes/AGENTS.md](src/routes/AGENTS.md) |
| UI components | `src/components/**` | → [src/components/AGENTS.md](src/components/AGENTS.md) |
| Client state | `src/providers/**` | → [src/providers/AGENTS.md](src/providers/AGENTS.md) |
| Server state | `src/queries/**` | → [src/queries/AGENTS.md](src/queries/AGENTS.md) |
| API clients | `src/apis/**` | → [src/apis/AGENTS.md](src/apis/AGENTS.md) |
| Schemas | `src/schemas/**` | → [src/schemas/AGENTS.md](src/schemas/AGENTS.md) |
| Utilities | `src/lib/**` | → [src/lib/AGENTS.md](src/lib/AGENTS.md) |
| Config | `src/config/**` | → [src/config/AGENTS.md](src/config/AGENTS.md) |
| Theme + tokens | `src/theme.ts` | CSS vars + colorSchemes |
| Global CSS | `src/styles/**` | → [src/styles/AGENTS.md](src/styles/AGENTS.md) |
| Route paths | `src/constants/path.ts` | All route path constants |

### Quick find commands

```bash
# Find a component
rg -n "export default function" src/components

# Find a route/page
rg -n "export default function" src/routes

# Find usage of a component
rg -n "<ComponentName" src

# Find a query hook
rg -n "export const use" src/queries

# Find an API client
rg -n "const.*ApiRequest" src/apis

# Find a Zod schema
rg -n "export const.*Schema" src/schemas

# Anti-pattern checks (must return empty)
rg -n "theme\.palette\.mode" src        # No mode branching
rg -n "from '\\.{1,2}/" src             # No relative imports
rg -n "from '@mui/material'" src        # No barrel imports
```

## Definition of Done (before PR)

```bash
npm run lint && npm run prettier && npm run build
```

- No linter errors
- No prettier violations
- Build succeeds (includes typecheck)
- No warnings about MUI import/style rules
