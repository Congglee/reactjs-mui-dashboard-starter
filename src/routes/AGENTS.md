## Package identity

- **Purpose**: Page components rendered by React Router based on URL
- **Tech**: React 19 + Material UI v7 + React Router v7

## Current routes

| Route path | Component | Layout |
|------------|-----------|--------|
| `/` | `landing.tsx` | `MainLayout` |
| `/dashboard` | `dashboard.tsx` | `DashboardLayout` |
| `/tasks` | `tasks.tsx` | `DashboardLayout` |
| `/users` | `users.tsx` | `DashboardLayout` |
| `/settings` | `settings/profile.tsx` | `SettingsLayout` |
| `/settings/account` | `settings/account.tsx` | `SettingsLayout` |
| `/settings/appearance` | `settings/appearance.tsx` | `SettingsLayout` |
| `/settings/notifications` | `settings/notifications.tsx` | `SettingsLayout` |
| `/settings/display` | `settings/display.tsx` | `SettingsLayout` |
| `/login` | `login.tsx` | `AuthLayout` |
| `/register` | `register.tsx` | `AuthLayout` |

## Route configuration

Routes defined in `src/App.tsx`, path constants in `src/constants/path.ts`.

```tsx
// Example from src/App.tsx
<Routes>
  <Route path='' element={<MainLayout />}>
    <Route path={path.landing} element={<Landing />} />
    
    <Route path='' element={<DashboardLayout />}>
      <Route path={path.dashboard} element={<Dashboard />} />
      <Route path={path.tasks} element={<Tasks />} />
      <Route path={path.users} element={<Users />} />
      
      <Route path='' element={<SettingsLayout />}>
        <Route path={path.settings} element={<Profile />} />
        {/* ... more settings routes */}
      </Route>
    </Route>
    
    <Route path='' element={<AuthLayout />}>
      <Route path={path.login} element={<Login />} />
      <Route path={path.register} element={<Register />} />
    </Route>
  </Route>
</Routes>
```

## Patterns & conventions

### Page component structure

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

1. Create page in `src/routes/new-page.tsx` (kebab-case)
2. Add path to `src/constants/path.ts`:
   ```ts
   const path = {
     // existing...
     newPage: '/new-page'
   }
   ```
3. Add route in `src/App.tsx` under appropriate layout
4. (Optional) Add nav item in `src/components/sidebar.tsx`

### Layout hierarchy

```
MainLayout (Header/Footer for public pages)
├── Landing page
├── DashboardLayout (Sidebar/Navbar for dashboard)
│   ├── Dashboard, Tasks, Users
│   └── SettingsLayout (Settings sidebar)
│       └── Profile, Account, Appearance, etc.
└── AuthLayout (Centered card for auth)
    └── Login, Register
```

## File examples to copy

| Task | Reference file |
|------|----------------|
| Dashboard page | `src/routes/dashboard.tsx` |
| Data table page | `src/routes/tasks.tsx` |
| Landing page | `src/routes/landing.tsx` |
| Settings page | `src/routes/settings/profile.tsx` |
| Auth page | `src/routes/login.tsx` |

## JIT hints

```bash
# Find all page components
rg -n "export default function" src/routes

# Find route definitions
rg -n "Route path=" src/App.tsx

# Find path constants
rg -n ":" src/constants/path.ts

# Find pages using a specific layout
rg -n "element={<DashboardLayout" src/App.tsx
```

## Common gotchas

- **File naming**: Use `kebab-case.tsx` (e.g., `user-settings.tsx`)
- **Path constants**: Always use `path.routeName`, not hardcoded strings
- **Layout selection**: Dashboard pages → `DashboardLayout`, public → `MainLayout`, auth → `AuthLayout`
- **Nested routes**: Settings pages nest inside `SettingsLayout` inside `DashboardLayout`

## Pre-PR checks

```bash
npm run lint && npm run prettier && npm run build
```
