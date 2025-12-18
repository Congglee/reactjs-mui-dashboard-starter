## Package identity

- **Purpose**: Application configuration and environment variables
- **Tech**: TypeScript + Vite env variables

## Current files

| File | Purpose |
|------|---------|
| `environment.ts` | Environment variable exports |

## Patterns & conventions

### Environment config (`environment.ts`)

```ts
// Current implementation
export const envConfig = {
  baseUrl: import.meta.env.VITE_APP_API_URL
} as const
```

### Extending environment config

```ts
// ✅ DO: Add new env vars with proper typing
export const envConfig = {
  // API
  baseUrl: import.meta.env.VITE_APP_API_URL,
  
  // Feature flags
  enableAnalytics: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
  
  // Third-party
  sentryDsn: import.meta.env.VITE_SENTRY_DSN,
  
  // App info
  appName: import.meta.env.VITE_APP_NAME || 'Dashboard',
  appVersion: import.meta.env.VITE_APP_VERSION || '1.0.0'
} as const
```

### Environment variable naming

```bash
# ✅ DO: Use VITE_ prefix for client-side vars
VITE_APP_API_URL=https://api.example.com
VITE_ENABLE_ANALYTICS=true
VITE_SENTRY_DSN=https://xxx@sentry.io/xxx

# ❌ DON'T: Server-side vars without VITE_ won't be exposed
DATABASE_URL=postgresql://...  # Not available in browser
SECRET_KEY=xxx                 # Not available in browser
```

### Adding new config modules

```ts
// src/config/api.ts — API-specific config
export const apiConfig = {
  timeout: 60 * 1000,  // 60 seconds
  retries: 3,
  endpoints: {
    posts: '/posts',
    users: '/users',
    auth: '/auth'
  }
} as const

// src/config/features.ts — Feature flags
export const features = {
  darkMode: true,
  notifications: true,
  analytics: import.meta.env.VITE_ENABLE_ANALYTICS === 'true'
} as const

// src/config/constants.ts — App constants
export const constants = {
  pagination: {
    defaultPageSize: 10,
    pageSizeOptions: [10, 25, 50, 100]
  },
  sidebar: {
    width: 256,
    collapsedWidth: 70
  }
} as const
```

### Type safety for env vars

```ts
// ✅ DO: Declare env types in vite-env.d.ts
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_API_URL: string
  readonly VITE_ENABLE_ANALYTICS: string
  readonly VITE_SENTRY_DSN: string
  readonly VITE_APP_NAME: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
```

### Using config in app

```ts
// ✅ DO: Import from config
import { envConfig } from '@/config/environment'

const http = axios.create({
  baseURL: envConfig.baseUrl
})

// ❌ DON'T: Use import.meta.env directly in components
const api = import.meta.env.VITE_APP_API_URL  // Hard to mock/test
```

## Required environment variables

| Variable | Required | Description |
|----------|----------|-------------|
| `VITE_APP_API_URL` | Yes | Backend API base URL |

## .env files

```bash
# .env — Default values (committed)
VITE_APP_API_URL=http://localhost:3000/api

# .env.local — Local overrides (gitignored)
VITE_APP_API_URL=https://dev-api.example.com

# .env.production — Production values (may be set in CI)
VITE_APP_API_URL=https://api.example.com
```

## JIT hints

```bash
# Find all env var usage
rg -n "import.meta.env" src

# Find config usage
rg -n "from '@/config/" src

# Find all config files
fd ".ts" src/config
```

## Common gotchas

- **VITE_ prefix required**: Client-side vars must start with `VITE_`
- **Restart dev server**: Changes to `.env` require server restart
- **Type safety**: Declare types in `vite-env.d.ts`
- **Centralize access**: Import from `@/config/`, not `import.meta.env` directly
- **Don't commit secrets**: `.env.local` should be gitignored

## Pre-PR checks

```bash
npm run lint && npm run prettier && npm run build
```

