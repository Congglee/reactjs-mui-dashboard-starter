## Package identity

- **Purpose**: Main source folder containing all React app code.
- **Tech**: React 19 + TypeScript 5.9 (strict) + Vite 7 + Material UI v7.

## Key files

| File       | Responsibility                                                                                            |
| ---------- | --------------------------------------------------------------------------------------------------------- |
| `main.tsx` | App bootstrap: mounts root, wraps with ThemeProvider, LocalizationProvider, BrowserRouter, AppProvider    |
| `App.tsx`  | Route definitions via React Router v7                                                                     |
| `theme.ts` | MUI theme config: colorSchemes (light/dark), CSS variables (`--color-*`), typography, component overrides |

## Folder layout

```
src/
├── assets/           # Static images, SVGs
├── components/       # Reusable UI components → see components/AGENTS.md
├── constants/        # Constants (mock-data, path)
├── providers/        # Context providers → see providers/AGENTS.md
├── routes/           # Page components → see routes/AGENTS.md
├── styles/           # Global CSS → see styles/AGENTS.md
├── types/            # TypeScript type definitions
├── apis/             # (future) Axios API clients
├── config/           # (future) App configuration
├── hooks/            # (future) Custom React hooks
├── lib/              # (future) Utility libraries
├── queries/          # (future) TanStack Query hooks
├── utils/            # (future) Utility functions
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

// Or use CSS variables
sx={{ bgcolor: 'var(--color-card-bg)' }}

// ❌ DON'T: Branch on palette.mode
const bg = theme.palette.mode === 'dark' ? '#121621' : '#f5f6fa'
```

### File naming

- Components/pages: `kebab-case.tsx` (e.g., `metric-card.tsx`, `dashboard-layout.tsx`)
- Types: `*.type.ts` or `*.types.ts` (e.g., `mock-data.type.ts`)
- Constants: `kebab-case.ts` (e.g., `mock-data.ts`, `path.ts`)

## Touch points

- **Theme customization**: `src/theme.ts` (colorSchemes, CSS vars, component overrides)
- **Add new route**: Update `src/App.tsx` and `src/constants/path.ts`
- **Add new provider**: Create in `src/providers/`, wrap in `src/main.tsx`
- **Add new layout**: Create in `src/components/layouts/`, use in `src/App.tsx`

## JIT hints

```bash
# Find all exports in a file
rg -n "export" src/theme.ts

# Find all CSS variables used
rg -n "var\(--color-" src

# Find all useTheme usage
rg -n "useTheme" src

# Find all route definitions
rg -n "Route path=" src/App.tsx
```

## Pre-PR checks

```bash
npm run lint && npm run prettier && npm run build
```
