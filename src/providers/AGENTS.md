## Package identity

- **Purpose**: React Context providers for global state management.
- **Tech**: React 19 Context API + TypeScript.

## Current providers

| Provider      | File               | Purpose                                                |
| ------------- | ------------------ | ------------------------------------------------------ |
| `AppProvider` | `app-provider.tsx` | Sidebar open/close state with localStorage persistence |

## Provider hierarchy (in main.tsx)

```tsx
<BrowserRouter>
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <AppProvider>
        <App />
      </AppProvider>
    </LocalizationProvider>
  </ThemeProvider>
</BrowserRouter>
```

## Patterns & conventions

### Provider structure (example)

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

  return <AppContext.Provider value={{ sidebarOpen, setSidebarOpen }}>{children}</AppContext.Provider>
}
```

### Adding a new provider

1. Create provider file in `src/providers/new-provider.tsx` (kebab-case)
2. Follow the pattern above:
   - Define `interface XxxContextType`
   - Create context with `createContext<XxxContextType>`
   - Export `useXxxContext` hook
   - Export default `XxxProvider` component
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
// ✅ DO: Use the exported hook (see src/components/sidebar.tsx)
import { useAppContext } from '@/providers/app-provider'

function Sidebar() {
  const { sidebarOpen, setSidebarOpen } = useAppContext()
  // ...
}
```

## Future plans

- `src/queries/` - TanStack Query hooks for server state
- `src/apis/` - Axios API clients

When TanStack Query is added:

- Use `QueryClientProvider` in `main.tsx`
- Server state goes in `queries/`, not `providers/`
- Keep `providers/` for client-only state

## JIT hints

```bash
# Find all providers
rg -n "export default function.*Provider" src/providers

# Find all context hooks
rg -n "export const use" src/providers

# Find provider usage
rg -n "useAppContext" src
```

## Common gotchas

- **Export both**: Always export the hook (`useXxxContext`) AND the provider (`XxxProvider`).
- **Type the context**: Always define `XxxContextType` interface.
- **Default values**: Provide sensible defaults in `createContext()` for type safety.
- **localStorage**: Use `globalThis?.localStorage` for SSR safety.

## Pre-PR checks

```bash
npm run lint && npm run prettier && npm run build
```
