# app/AGENTS.md

Detailed patterns and conventions for the `app/` directory. This is where all application code lives.

## Package Identity

This directory contains the entire React application built with React Router v7 Framework Mode and Material-UI v7. All routes, components, layouts, providers, and application logic are organized here.

**Primary Framework**: React Router v7 Framework Mode (file-based routing)  
**UI Library**: Material-UI v7 exclusively  
**State Management**: React Context API (via `app/providers/`)

## Setup & Run

All commands run from the repository root:

```bash
# Development (from root)
npm run dev

# Build (from root)
npm run build

# Type check (generates route types + TypeScript)
npm run typecheck

# Lint
npm run lint
npm run lint:fix
```

## Patterns & Conventions

### File Organization

```
app/
├── assets/              # Static assets (images, fonts, etc.)
├── components/          # Reusable UI components
│   ├── dashboard/       # Dashboard-specific components
│   ├── home/            # Home page components
│   └── icons/          # Custom icon components
├── constants/           # Constants and mock data
├── hooks/              # Custom React hooks (planned for future use)
├── layouts/             # Layout components (wrappers for routes)
├── lib/                # External library wrappers and utilities (planned)
├── providers/           # React Context providers
├── queries/            # TanStack Query hooks and configurations (planned)
├── routes/              # React Router route files (file-based routing)
│   └── dashboard/      # Dashboard routes
├── styles/              # Global CSS styles
├── tests/              # Test files (planned for future integration)
├── types/               # TypeScript type definitions
├── utils/              # Utility functions and helpers (planned)
├── root.tsx             # Root component (entry point)
├── routes.ts            # Route configuration
└── theme.ts             # MUI theme configuration
```

**Note**: Some directories (`hooks/`, `lib/`, `queries/`, `tests/`, `utils/`) are currently empty but are planned for future integration. Follow the naming and import conventions when adding files to these directories.

### Planned Directory Usage

**`hooks/`** - Custom React hooks

- Place reusable hooks here (e.g., `use-auth.ts`, `use-window-size.ts`)
- Use `use-` prefix for hook filenames
- Import via `@/hooks/use-auth`

**`lib/`** - External library wrappers and configurations

- Place third-party library initializations and wrappers here
- Examples: API client setup, authentication library wrappers, SDK configurations
- Import via `@/lib/api-client` or `@/lib/auth`

**`queries/`** - TanStack Query hooks and configurations

- Place React Query hooks here when TanStack Query v5 is integrated
- Examples: `use-users.ts`, `use-user-details.ts`
- Query clients configuration should go here as well
- Import via `@/queries/use-users`

**`tests/`** - Test files

- Place test files here when testing is configured
- Colocate with source or organize by feature/component
- Use `.test.ts` or `.test.tsx` suffix
- Follow kebab-case naming convention

**`utils/`** - Utility functions and helpers

- Place pure utility functions here (no React hooks or components)
- Examples: `format-date.ts`, `validate-email.ts`, `debounce.ts`
- Import via `@/utils/format-date`

### Naming Conventions

- **Components**: kebab-case filenames (e.g., `nav-item.tsx`, `metric-card.tsx`, `dashboard-layout.tsx`)
- **Routes**: kebab-case filenames (e.g., `home.tsx`, `dashboard/index.tsx`)
- **Icons**: kebab-case with `-icon` suffix (e.g., `analytics-icon.tsx`, `help-icon.tsx`)
- **Types**: kebab-case filenames (e.g., `theme.types.ts`)
- **Hooks**: kebab-case with `use-` prefix (e.g., `use-auth.ts`, `use-window-size.ts`) - planned for `hooks/`
- **Utils**: kebab-case filenames (e.g., `format-date.ts`, `validate-email.ts`) - planned for `utils/`
- **Tests**: kebab-case with `.test.ts` or `.test.tsx` suffix (e.g., `metric-card.test.tsx`) - planned for `tests/`

### Import Patterns

**✅ DO**: Always use absolute `@/` imports

```tsx
// ✅ Correct
import NavItem from '@/components/dashboard/nav-item'
import { useAppContext } from '@/providers/app-provider'
import { SIDEBAR_WIDTH } from '@/theme'
import type { Trend } from '@/constants/mock-data'
```

**❌ DON'T**: Use relative imports

```tsx
// ❌ Wrong
import NavItem from '../../components/dashboard/nav-item'
import { useAppContext } from '../providers/app-provider'
```

**Example files**:

- ✅ See `app/layouts/dashboard-layout.tsx` for correct import patterns
- ✅ See `app/components/dashboard/metric-card.tsx` for component imports

### Component Patterns

**✅ DO**: Use functional components with TypeScript

```tsx
// ✅ Pattern from app/components/dashboard/metric-card.tsx
interface MetricCardProps {
  title: string
  value: string
  // ...
}

export default function MetricCard({ title, value }: MetricCardProps) {
  return <Paper>...</Paper>
}
```

**✅ DO**: Use MUI components with tree-shaking imports

```tsx
// ✅ Correct - tree-shaking imports
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import DeleteIcon from '@mui/icons-material/Delete'
```

**❌ DON'T**: Use barrel imports or deep imports

```tsx
// ❌ Wrong
import { Paper, Stack } from '@mui/material'
import { createTheme } from '@mui/material/styles/createTheme'
```

**Example files**:

- ✅ Component pattern: `app/components/dashboard/metric-card.tsx`
- ✅ Layout pattern: `app/layouts/dashboard-layout.tsx`
- ✅ Icon pattern: `app/components/icons/analytics-icon.tsx`

### Styling Patterns

**✅ DO**: Use `sx` prop for component-level styling

```tsx
// ✅ Pattern from app/components/dashboard/metric-card.tsx
<Paper
  sx={[
    {
      p: 2,
      border: '1px solid var(--color-border)',
      bgcolor: 'background.default'
    },
    (theme) =>
      theme.applyStyles('dark', {
        boxShadow: '0 4px 20px rgba(0,0,0,0.5)'
      })
  ]}
>
```

**✅ DO**: Use `styled` only for global reusable components shared across routes

```tsx
// ✅ Use styled for components used in multiple routes/pages
import { styled } from '@mui/material/styles'

const StyledPanel = styled('div')(({ theme }) => [
  { backgroundColor: theme.palette.background.paper },
  theme.applyStyles('dark', {
    backgroundColor: theme.palette.grey[900]
  })
])
```

**❌ DON'T**: Check `theme.palette.mode` directly

```tsx
// ❌ Wrong - causes SSR flicker
const color = theme.palette.mode === 'dark' ? '#fff' : '#000'
```

**Example files**:

- ✅ Styling pattern: `app/components/dashboard/metric-card.tsx` (lines 24-39, 64-88)
- ✅ Theme usage: `app/theme.ts`

### Dark Mode Patterns

**✅ DO**: Use CSS variables and `theme.applyStyles()`

```tsx
// ✅ Pattern from app/components/dashboard/metric-card.tsx
sx={[
  { bgcolor: 'background.default' },
  (theme) =>
    theme.applyStyles('dark', {
      boxShadow: '0 4px 20px rgba(0,0,0,0.5)'
    })
]}
```

**✅ DO**: Use CSS variables defined in theme

```tsx
// ✅ Use theme CSS variables
sx={{ border: '1px solid var(--color-border)' }}
```

**Example files**:

- ✅ Dark mode pattern: `app/components/dashboard/metric-card.tsx`
- ✅ Theme variables: `app/theme.ts` (lines 57-168)

### Routing Patterns

**✅ DO**: Use file-based routing in `app/routes/`

```tsx
// ✅ Pattern from app/routes/home.tsx
import type { Route } from './+types/home'

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Page Title' }]
}

export default function Home() {
  return <Header />
}
```

**✅ DO**: Configure routes in `app/routes.ts`

```tsx
// ✅ Pattern from app/routes.ts
import { type RouteConfig, index, layout, prefix } from '@react-router/dev/routes'

export default [
  layout('layouts/main-layout.tsx', [
    index('routes/home.tsx'),
    ...prefix('dashboard', [layout('layouts/dashboard-layout.tsx', [index('routes/dashboard/index.tsx')])])
  ])
] satisfies RouteConfig
```

**Example files**:

- ✅ Route file: `app/routes/home.tsx`
- ✅ Route config: `app/routes.ts`
- ✅ Layout: `app/layouts/dashboard-layout.tsx`

### Context Provider Patterns

**✅ DO**: Create providers in `app/providers/` and export hooks

```tsx
// ✅ Pattern from app/providers/app-provider.tsx
import { createContext, useContext } from 'react'

interface AppContextType {
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
}

const AppContext = createContext<AppContextType>({...})

export const useAppContext = () => {
  const context = useContext(AppContext)
  return context
}

export default function AppProvider({ children }: { children: React.ReactNode }) {
  // ...
}
```

**Example files**:

- ✅ Provider pattern: `app/providers/app-provider.tsx`
- ✅ Usage: `app/layouts/dashboard-layout.tsx` (line 7, 10)

### Grid Patterns (MUI v7)

**✅ DO**: Use new Grid v7 API with `size` prop

```tsx
// ✅ MUI v7 Grid pattern
import Grid from '@mui/material/Grid'
;<Grid container spacing={2}>
  <Grid size={{ xs: 12, sm: 6, md: 3 }}>{/* Content */}</Grid>
</Grid>
```

**❌ DON'T**: Use old Grid API (`item`, `xs={12}`)

```tsx
// ❌ Old Grid API (v5/v6)
<Grid container spacing={2}>
  <Grid item xs={12} md={6}>
    ...
  </Grid>
</Grid>
```

## Touch Points / Key Files

### Critical Files to Understand

- **Root Entry**: `app/root.tsx` - Root component with ThemeProvider, CssBaseline, InitColorSchemeScript
- **Route Config**: `app/routes.ts` - File-based routing configuration
- **Theme**: `app/theme.ts` - MUI theme with CSS variables, light/dark color schemes
- **Main Layout**: `app/layouts/main-layout.tsx` - Top-level layout wrapper
- **Dashboard Layout**: `app/layouts/dashboard-layout.tsx` - Dashboard-specific layout with sidebar/navbar
- **App Provider**: `app/providers/app-provider.tsx` - Global state management (sidebar state)
- **Example Route**: `app/routes/home.tsx` - Route file pattern
- **Example Component**: `app/components/dashboard/metric-card.tsx` - Component with MUI styling patterns

### Configuration Files

- **TypeScript**: `tsconfig.json` (root) - Path alias `@/*` → `app/*`
- **Vite**: `vite.config.ts` (root) - SSR config, MUI X packages in `noExternal`
- **React Router**: `react-router.config.ts` (root) - SSR enabled

## JIT Index Hints

```bash
# Find React components
rg -n "export (default )?function .*" app/components

# Find route files
rg -n "export default function" app/routes

# Find MUI component imports
rg -n "from '@mui/material/" app

# Find icon imports
rg -n "from '@mui/icons-material/" app

# Find custom icons
rg -n "SvgIcon" app/components/icons

# Find theme.palette.mode usage (anti-pattern to fix)
rg -n "theme\.palette\.mode" app

# Find relative imports (anti-pattern to fix)
rg -n "from '\\.\\.?/" app

# Find context providers
rg -n "createContext" app/providers

# Find custom hooks (in hooks/ directory when added)
rg -n "export const use" app/hooks

# Find utility functions (in utils/ directory when added)
rg -n "export (function|const)" app/utils

# Find query hooks (in queries/ directory when added)
rg -n "useQuery|useMutation" app/queries

# Find test files (in tests/ directory when added)
find app/tests -name "*.test.ts*" -o -name "*.spec.ts*"

# Find route meta functions
rg -n "export function meta" app/routes

# Find TypeScript type definitions
rg -n "export (type|interface)" app/types

# Find static assets
find app/assets -type f
```

## Common Gotchas

1. **Import alias**: Always use `@/` - never relative imports like `./` or `../`
2. **File naming**: Components must be kebab-case (`nav-item.tsx`, not `NavItem.tsx`)
3. **MUI imports**: Tree-shake - import from `@mui/material/Button`, not `@mui/material`
4. **Dark mode**: Never check `theme.palette.mode` - use `theme.applyStyles('dark', {...})` instead
5. **SSR flicker**: Theme uses `InitColorSchemeScript` in `app/root.tsx` to prevent dark mode flicker
6. **Grid v7**: Use `size={{ xs: 12 }}` prop, not `xs={12}` or `item` prop
7. **Route types**: React Router generates types in `app/routes/**/+types/` - import via `Route` type helper
8. **MUI X packages**: Must be in Vite `ssr.noExternal` (already configured in `vite.config.ts`)

## Pre-PR Checks

Run these commands from the repository root before creating a PR:

```bash
npm run typecheck && npm run lint && npm run prettier && npm run build
```

This ensures:

- TypeScript types are generated and validated
- No linting errors
- Code is properly formatted
- Production build succeeds
