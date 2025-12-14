## Package identity

- **Purpose**: Page components that are rendered by React Router based on URL.
- **Tech**: React 19 + Material UI v7 + React Router v7.

## Current routes

| Route path   | Component       | Layout            |
| ------------ | --------------- | ----------------- |
| `/`          | `landing.tsx`   | `MainLayout`      |
| `/dashboard` | `dashboard.tsx` | `DashboardLayout` |
| `/tasks`     | `tasks.tsx`     | `DashboardLayout` |

## Route configuration

Routes are defined in `src/App.tsx`:

```tsx
<Routes>
  <Route path='' element={<MainLayout />}>
    <Route path={path.landing} element={<Landing />} />

    <Route path='' element={<DashboardLayout />}>
      <Route path={path.dashboard} element={<Dashboard />} />
      <Route path={path.tasks} element={<Tasks />} />
    </Route>
  </Route>
</Routes>
```

Path constants are in `src/constants/path.ts`.

## Patterns & conventions

### Page component structure (example)

```tsx
// ✅ DO: Follow this pattern (see src/routes/dashboard.tsx)
import PageHeader from '@/components/page-header'
import MetricCard from '@/components/dashboard/metric-card'
import Grid from '@mui/material/Grid'

export default function Dashboard() {
  return (
    <>
      <PageHeader title='Dashboard' />
      <Grid container spacing={2}>
        {/* page content */}
      </Grid>
    </>
  )
}
```

### Adding a new route

1. Create page component in `src/routes/new-page.tsx` (kebab-case)
2. Add path constant to `src/constants/path.ts`:
   ```ts
   const path = {
     // existing...
     newPage: '/new-page'
   }
   ```
3. Add route in `src/App.tsx`:
   ```tsx
   <Route path={path.newPage} element={<NewPage />} />
   ```
4. (Optional) Add nav item in `src/components/sidebar.tsx`

### Page layout usage

```tsx
// Pages automatically receive their layout via <Outlet />
// No need to import layouts in page components

// For dashboard pages: use DashboardLayout
// - Includes: Sidebar, Navbar, main content area
// - Pages render inside the <Outlet /> in dashboard-layout.tsx

// For landing pages: use MainLayout
// - Includes: Header, Footer
// - Pages render inside the <Outlet /> in main-layout.tsx
```

## File examples to copy

| Task            | Reference file             |
| --------------- | -------------------------- |
| Dashboard page  | `src/routes/dashboard.tsx` |
| Data/table page | `src/routes/tasks.tsx`     |
| Landing page    | `src/routes/landing.tsx`   |

## JIT hints

```bash
# Find all page components
rg -n "export default function" src/routes

# Find route usage in App
rg -n "Route path=" src/App.tsx

# Find path constants
rg -n ":" src/constants/path.ts
```

## Common gotchas

- **File naming**: Use `kebab-case.tsx` (e.g., `user-settings.tsx`, not `UserSettings.tsx`).
- **Path constants**: Always use `path.routeName` from constants, not hardcoded strings.
- **Layout selection**: Dashboard pages go under `DashboardLayout`, public pages under `MainLayout`.
- **Imports**: Always use `@/` prefix for internal imports.

## Pre-PR checks

```bash
npm run lint && npm run prettier && npm run build
```
