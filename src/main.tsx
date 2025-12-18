import App from '@/App'
import ErrorBoundary from '@/components/error-boundary'
import { queryClient } from '@/lib/query-client'
import AppProvider from '@/providers/app-provider'
import '@/styles/index.css'
import theme from '@/theme'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
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
            <ReactQueryDevtools initialIsOpen={false} />
          </ErrorBoundary>
        </ThemeProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>
)
