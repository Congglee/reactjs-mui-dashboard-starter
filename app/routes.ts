import { type RouteConfig, index, layout, prefix } from '@react-router/dev/routes'

export default [
  layout('layouts/main-layout.tsx', [
    // Public routes
    index('routes/home.tsx'),

    // Dashboard routes
    layout('layouts/dashboard-layout.tsx', [
      ...prefix('dashboard', [index('routes/dashboard.tsx')]),
      ...prefix('tasks', [index('routes/tasks.tsx')])
    ])
  ])
] satisfies RouteConfig
