import { createContext, useCallback, useContext, useState } from 'react'
import type { ReactNode } from 'react'

interface AppContextType {
  sidebarOpen: boolean
  setSidebarOpen: (sidebarOpen: boolean) => void
}

const AppContext = createContext<AppContextType>({
  sidebarOpen: true,
  setSidebarOpen: () => {}
})

export const useAppContext = () => {
  const context = useContext(AppContext)
  return context
}

const getInitialSidebarOpen = () => {
  try {
    const stored = globalThis?.localStorage?.getItem('sidebar')
    if (stored == null) return true
    const parsed = JSON.parse(stored)
    return typeof parsed === 'boolean' ? parsed : true
  } catch {
    return true
  }
}

export default function AppProvider({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpenState] = useState<boolean>(() => getInitialSidebarOpen())

  const setSidebarOpen = useCallback((open: boolean) => {
    setSidebarOpenState(open)
    globalThis?.localStorage?.setItem('sidebar', JSON.stringify(open))
  }, [])

  return <AppContext.Provider value={{ sidebarOpen, setSidebarOpen }}>{children}</AppContext.Provider>
}
