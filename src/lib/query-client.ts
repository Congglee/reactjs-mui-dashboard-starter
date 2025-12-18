import { QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // The data time is considered "fresh" (no refetch)
      staleTime: 1000 * 60 * 5,
      // The cache time is kept after no component is subscribed
      gcTime: 1000 * 60 * 10,
      // Retry when fail
      retry: 1,
      // Don't refetch when window focus again (can be enabled if needed)
      refetchOnWindowFocus: false
    },
    mutations: {
      // Retry when fail for mutations
      retry: 0
    }
  }
})
