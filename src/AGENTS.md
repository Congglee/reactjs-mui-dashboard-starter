## Package identity

- **Purpose**: Main source folder containing all React app code
- **Tech**: React 19 + TypeScript 5.9 (strict) + Vite 7 + Material UI v7 + TanStack Query

## Key files

| File | Responsibility |
|------|----------------|
| `main.tsx` | App bootstrap: providers, router, theme |
| `App.tsx` | Route definitions (React Router v7) |
| `theme.ts` | MUI theme: colorSchemes, CSS variables, component overrides |

## Folder layout

```
src/
├── apis/             # Axios API clients → see apis/AGENTS.md
├── assets/           # Static images, SVGs
├── components/       # Reusable UI components → see components/AGENTS.md
├── config/           # Environment config → see config/AGENTS.md
├── constants/        # Constants (path.ts, mock-data.ts)
├── lib/              # Utility libraries → see lib/AGENTS.md
├── providers/        # Context providers → see providers/AGENTS.md
├── queries/          # TanStack Query hooks → see queries/AGENTS.md
├── routes/           # Page components → see routes/AGENTS.md
├── schemas/          # Zod schemas → see schemas/AGENTS.md
├── styles/           # Global CSS → see styles/AGENTS.md
├── types/            # TypeScript type definitions
├── App.tsx
├── main.tsx
└── theme.ts
```

## Patterns & conventions

### Imports (REQUIRED)

```tsx
// ✅ DO: Absolute imports with @/ alias
import Sidebar from '@/components/sidebar'
import { useAppContext } from '@/providers/app-provider'
import postApiRequest from '@/apis/post.api'

// ❌ DON'T: Relative imports
import Sidebar from '../components/sidebar'
```

### MUI tree-shaking (REQUIRED)

```tsx
// ✅ DO: Named path imports
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import { useTheme, alpha } from '@mui/material/styles'

// ❌ DON'T: Barrel imports
import { Button, Stack } from '@mui/material'
```

### Dark mode styling (REQUIRED)

```tsx
// ✅ DO: Use theme.applyStyles or CSS variables
sx={[
  { bgcolor: 'background.paper' },
  (theme) => theme.applyStyles('dark', { bgcolor: theme.palette.grey[900] })
]}

// ✅ DO: CSS variables
sx={{ bgcolor: 'var(--color-card-bg)' }}

// ❌ DON'T: Branch on palette.mode
const bg = theme.palette.mode === 'dark' ? '#121621' : '#f5f6fa'
```

### File naming

| Type | Convention | Example |
|------|------------|---------|
| Components/pages | `kebab-case.tsx` | `metric-card.tsx`, `dashboard-layout.tsx` |
| Types | `*.type.ts` | `mock-data.type.ts` |
| Schemas | `*.schema.ts` | `post.schema.ts` |
| API clients | `*.api.ts` | `post.api.ts` |
| Query hooks | `use-*.ts` | `use-posts.ts` |
| Constants | `kebab-case.ts` | `path.ts`, `mock-data.ts` |

## Data flow pattern

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   schemas/  │───▶│    apis/    │───▶│  queries/   │───▶│ components/ │
│  (Zod)      │    │  (Axios)    │    │  (TanStack) │    │  (React)    │
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
```

## Touch points

| Task | Where to work |
|------|---------------|
| Theme customization | `src/theme.ts` |
| Add new route | `src/App.tsx` + `src/constants/path.ts` |
| Add new provider | `src/providers/` + wrap in `src/main.tsx` |
| Add new layout | `src/components/layouts/` + use in `src/App.tsx` |
| Add API endpoint | `src/schemas/` → `src/apis/` → `src/queries/` |

## JIT hints

```bash
# Find all exports in theme
rg -n "export" src/theme.ts

# Find all CSS variables used
rg -n "var\(--color-" src

# Find all route definitions
rg -n "Route path=" src/App.tsx

# Find all providers in main.tsx
rg -n "Provider" src/main.tsx

# Find all query hooks
rg -n "export const use" src/queries
```

## Pre-PR checks

```bash
npm run lint && npm run prettier && npm run build
```
