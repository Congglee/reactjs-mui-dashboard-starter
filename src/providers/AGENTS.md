## Package identity

- **Purpose**: React Context providers for client-side global state
- **Tech**: React 19 Context API + TypeScript

## Current providers

| Provider | File | Purpose |
|----------|------|---------|
| `AppProvider` | `app-provider.tsx` | Sidebar open/close state with localStorage persistence |

## Provider hierarchy (in main.tsx)

```tsx
<BrowserRouter>
  <QueryClientProvider client={queryClient}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ErrorBoundary>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <AppProvider>
            <App />
          </AppProvider>
        </LocalizationProvider>
      </ErrorBoundary>
    </ThemeProvider>
  </QueryClientProvider>
</BrowserRouter>
```

## Patterns & conventions

### Provider structure (REQUIRED pattern)

```tsx
// ✅ DO: Follow this pattern (see src/providers/app-provider.tsx)
import { createContext, useCallback, useContext, useState } from 'react'
import type { ReactNode } from 'react'

// 1. Define context type
interface AppContextType {
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
}

// 2. Create context with default values
const AppContext = createContext<AppContextType>({
  sidebarOpen: true,
  setSidebarOpen: () => {}
})

// 3. Export custom hook for consuming
export const useAppContext = () => {
  const context = useContext(AppContext)
  return context
}

// 4. Export provider component
export default function AppProvider({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpenState] = useState<boolean>(() => getInitialState())

  const setSidebarOpen = useCallback((open: boolean) => {
    setSidebarOpenState(open)
    localStorage.setItem('sidebar', JSON.stringify(open))
  }, [])

  return (
    <AppContext.Provider value={{ sidebarOpen, setSidebarOpen }}>
      {children}
    </AppContext.Provider>
  )
}
```

### Adding a new provider

1. Create file: `src/providers/new-provider.tsx` (kebab-case)
2. Follow the pattern:
   - `interface XxxContextType` — define context shape
   - `const XxxContext = createContext<XxxContextType>(...)` — create context
   - `export const useXxxContext = () => ...` — export hook
   - `export default function XxxProvider` — export provider
3. Wrap in `src/main.tsx`:
   ```tsx
   <AppProvider>
     <NewProvider>
       <App />
     </NewProvider>
   </AppProvider>
   ```

### Using providers in components

```tsx
// ✅ DO: Use the exported hook
import { useAppContext } from '@/providers/app-provider'

function Sidebar() {
  const { sidebarOpen, setSidebarOpen } = useAppContext()
  // ...
}
```

## State management guidelines

| State type | Where to put it |
|------------|-----------------|
| Server data (API) | `src/queries/` (TanStack Query) |
| Client-only global | `src/providers/` (Context) |
| Component-local | `useState` / `useReducer` |
| Form state | Local state or form library |

## JIT hints

```bash
# Find all providers
rg -n "export default function.*Provider" src/providers

# Find all context hooks
rg -n "export const use" src/providers

# Find provider usage
rg -n "useAppContext" src

# Find provider wrapping in main.tsx
rg -n "Provider" src/main.tsx
```

## Common gotchas

- **Export both**: Always export hook (`useXxxContext`) AND provider (`XxxProvider`)
- **Type the context**: Always define `XxxContextType` interface
- **Default values**: Provide sensible defaults in `createContext()` for type safety
- **localStorage**: Use `globalThis?.localStorage` for SSR safety
- **Server state**: Use TanStack Query for API data, not Context

## Pre-PR checks

```bash
npm run lint && npm run prettier && npm run build
```
