## Package identity

- **Purpose**: Reusable UI components for the dashboard application
- **Tech**: React 19 functional components + Material UI v7 + TypeScript

## Folder structure

```
components/
├── auth/             # Auth-related components (cards, forms)
├── dashboard/        # Dashboard widgets (cards, charts, tables)
├── icons/            # Custom SVG icons using MUI SvgIcon
├── landing/          # Landing page sections (hero, features, pricing)
├── layouts/          # Page layouts (Dashboard, Main, Auth, Settings)
├── settings/         # Settings page components
├── tasks/            # Task management components
├── users/            # User management components
├── date-picker.tsx   # Shared date picker
├── error-boundary.tsx # Error boundary wrapper
├── logo.tsx          # App logo
├── nav-item.tsx      # Sidebar navigation item
├── navbar.tsx        # Top navigation bar
├── page-header.tsx   # Page header with title/breadcrumbs
├── profile-menu.tsx  # User profile dropdown
├── sidebar.tsx       # Main sidebar navigation
└── theme-menu.tsx    # Theme/mode toggle menu
```

## Patterns & conventions

### Naming conventions (REQUIRED)

- **UI handlers**: use `handle*` prefix for in-component logic/event handlers (example: `src/components/theme-menu.tsx`).
- **Callback props**: always `on*` and avoid generic names like `onClose` when multiple dialogs/menus exist (example: `src/components/users/new-user-dialog.tsx` uses `onNewUserDialogClose`).
- **State props**: be explicit (example: `newUserDialogOpen`, not `open`).
- **Forms**: submit handler must be named `onSubmit` (avoid `handleSubmit`).

### Component structure

```tsx
// ✅ DO: Follow this pattern (see src/components/dashboard/metric-card.tsx)
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import TrendPill from '@/components/dashboard/trend-pill'

interface MetricCardProps {
  title: string
  value: string
  // ... typed props
}

export default function MetricCard({ title, value }: MetricCardProps) {
  return <Paper sx={{ p: 2 }}>{/* component content */}</Paper>
}
```

### Styling with sx prop (REQUIRED)

```tsx
// ✅ DO: Use sx prop for component-level styling
<Box sx={{ p: 2, borderRadius: 1.5, bgcolor: 'var(--color-card-bg)' }}>

// ✅ DO: Dark mode with applyStyles (see sidebar.tsx)
sx={[
  { boxShadow: '0 2px 14px rgba(0,0,0,0.06)' },
  (theme) => theme.applyStyles('dark', {
    boxShadow: '0 4px 20px rgba(0,0,0,0.5)'
  })
]}

// ❌ DON'T: Use styled for one-off components
// ❌ DON'T: Check theme.palette.mode directly
```

### MUI Grid v7

```tsx
// ✅ DO: Use size prop (v7 style)
<Grid container spacing={2}>
  <Grid size={{ xs: 12, md: 6 }}>{/* content */}</Grid>
</Grid>

// ❌ DON'T: Use item/xs/md props (v5/v6 style)
<Grid container spacing={2}>
  <Grid item xs={12} md={6}>{/* content */}</Grid>
</Grid>
```

### Custom icons (see src/components/icons/)

```tsx
// ✅ DO: Use SvgIcon wrapper
import SvgIcon, { type SvgIconProps } from '@mui/material/SvgIcon'

export default function AnalyticsIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props} viewBox='0 0 24 24'>
      <path d='M3 17h2V7H3v10zm4 0h2V5H7v12z...' />
    </SvgIcon>
  )
}

// ❌ DON'T: Create inline SVGs without SvgIcon wrapper
```

### Layout components (see src/components/layouts/)

```tsx
// ✅ DO: Use Outlet for nested routes
import { Outlet } from 'react-router'

export default function DashboardLayout() {
  return (
    <>
      <Sidebar />
      <Box sx={{ ml: sidebarOffset }}>
        <Navbar />
        <Box component='main'>
          <Outlet />
        </Box>
      </Box>
    </>
  )
}
```

## File examples to copy

| Task | Reference file |
|------|----------------|
| Dashboard card | `src/components/dashboard/metric-card.tsx` |
| Data table | `src/components/dashboard/dashboard-table.tsx` |
| Chart component | `src/components/dashboard/chart-card.tsx` |
| Custom icon | `src/components/icons/analytics-icon.tsx` |
| Layout with sidebar | `src/components/layouts/dashboard-layout.tsx` |
| Navigation item | `src/components/nav-item.tsx` |
| Dropdown menu | `src/components/profile-menu.tsx` |
| Landing section | `src/components/landing/hero.tsx` |
| Dialog component | `src/components/users/delete-user-dialog.tsx` |
| Drawer component | `src/components/tasks/edit-task-drawer.tsx` |
| Form component | `src/components/settings/profile-form.tsx` |

## JIT hints

```bash
# Find all components
rg -n "export default function" src/components

# Find component by name
rg -n "function MetricCard" src/components

# Find all icon components
rg -n "export default function.*Icon" src/components/icons

# Find usage of a component
rg -n "<Sidebar" src

# Find components using applyStyles
rg -n "applyStyles" src/components

# Find all dialogs
rg -n "Dialog" src/components --glob "*.tsx"
```

## Common gotchas

- **Always use `@/` imports** — no relative imports
- **Prefer `@mui/icons-material`** — only create custom icons when needed
- **Use CSS variables** (`var(--color-*)`) for colors that need dark mode support
- **Never use `theme.palette.mode`** — use `theme.applyStyles('dark', {...})`
- **File naming**: `kebab-case.tsx` only
- **Grid v7**: Use `size` prop, not `item`/`xs`/`md`

## Pre-PR checks

```bash
# Check for anti-patterns
rg -n "theme\.palette\.mode" src/components
rg -n "from '\\.{1,2}/" src/components
rg -n "Grid item" src/components

# Then run full checks
npm run lint && npm run prettier && npm run build
```
