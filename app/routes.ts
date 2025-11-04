import { type RouteConfig, index, layout, prefix } from '@react-router/dev/routes'

export default [
  layout('layouts/main-layout.tsx', [
    index('routes/home.tsx'),
    ...prefix('dashboard', [layout('layouts/dashboard-layout.tsx', [index('routes/dashboard/index.tsx')])])
  ])
] satisfies RouteConfig
