## Package identity

- **Purpose**: Utility libraries and shared instances
- **Tech**: Axios, TanStack Query client, utility functions

## Current files

| File | Purpose |
|------|---------|
| `http.ts` | Axios instance with default config |
| `query-client.ts` | TanStack Query client with default options |

## Patterns & conventions

### HTTP client (`http.ts`)

```ts
// Current implementation
import { envConfig } from '@/config/environment'
import axios, { type AxiosInstance } from 'axios'

export class Http {
  instance: AxiosInstance

  constructor() {
    this.instance = axios.create({
      baseURL: envConfig.baseUrl,
      timeout: 1000 * 60 * 10,  // 10 minutes
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true
    })
  }
}

const http = new Http().instance
export default http
```

### Extending HTTP client with interceptors

```ts
// ✅ DO: Add interceptors for auth, error handling
constructor() {
  this.instance = axios.create({ ... })

  // Request interceptor (add auth token)
  this.instance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token')
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    },
    (error) => Promise.reject(error)
  )

  // Response interceptor (handle errors)
  this.instance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        // Handle unauthorized
        localStorage.removeItem('token')
        window.location.href = '/login'
      }
      return Promise.reject(error)
    }
  )
}
```

### Query client (`query-client.ts`)

```ts
// Current implementation
import { QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,     // 5 minutes fresh
      gcTime: 1000 * 60 * 10,       // 10 minutes cache
      retry: 1,
      refetchOnWindowFocus: false
    },
    mutations: {
      retry: 0
    }
  }
})
```

### Adding new utility files

```ts
// ✅ DO: Create focused utility modules
// src/lib/storage.ts — localStorage wrapper
export const storage = {
  get: <T>(key: string): T | null => {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : null
  },
  set: <T>(key: string, value: T): void => {
    localStorage.setItem(key, JSON.stringify(value))
  },
  remove: (key: string): void => {
    localStorage.removeItem(key)
  }
}

// src/lib/format.ts — Formatting utilities
export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-US', { 
    style: 'currency', 
    currency: 'USD' 
  }).format(value)
}

export const formatDate = (date: Date | string): string => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(new Date(date))
}
```

### Naming conventions

| Type | Convention | Example |
|------|------------|---------|
| HTTP instance | `http.ts` | Single instance |
| Query client | `query-client.ts` | Single instance |
| Utilities | `{purpose}.ts` | `format.ts`, `storage.ts`, `validation.ts` |

## JIT hints

```bash
# Find all lib exports
rg -n "export" src/lib

# Find http usage
rg -n "from '@/lib/http'" src

# Find queryClient usage
rg -n "from '@/lib/query-client'" src

# Find all lib files
fd ".ts" src/lib
```

## Common gotchas

- **Single instances**: `http` and `queryClient` are singletons, don't create multiple
- **Config from env**: HTTP baseURL comes from `@/config/environment`
- **Import path**: Use `@/lib/http`, not `axios` directly in API files
- **Query client in main.tsx**: Already wrapped with `QueryClientProvider`

## Pre-PR checks

```bash
npm run lint && npm run prettier && npm run build
```

