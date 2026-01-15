import path from '@/constants/path'
import DashboardIcon from '@mui/icons-material/Dashboard'
import RefreshIcon from '@mui/icons-material/Refresh'
import ReportProblemIcon from '@mui/icons-material/ReportProblem'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { alpha, keyframes } from '@mui/material/styles'
import { Component, type ErrorInfo, type ReactNode } from 'react'

interface Props {
  children?: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

const pulse = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(227, 29, 28, 0.4); }
  70% { box-shadow: 0 0 0 15px rgba(227, 29, 28, 0); }
  100% { box-shadow: 0 0 0 0 rgba(227, 29, 28, 0); }
`

export default class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo)
  }

  private handleReload = () => {
    window.location.reload()
  }

  public render() {
    if (this.state.hasError) {
      return (
        <Box
          sx={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: 'background.default',
            p: 3
          }}
        >
          <Container maxWidth='sm'>
            <Paper
              elevation={0}
              sx={{
                p: { xs: 3, sm: 5 },
                borderRadius: 4,
                textAlign: 'center',
                border: '1px solid',
                borderColor: 'divider',
                bgcolor: 'background.paper',
                boxShadow: (theme) => `0 20px 40px -10px ${alpha(theme.palette.error.main, 0.1)}`
              }}
            >
              <Box
                sx={{
                  display: 'inline-flex',
                  p: 2,
                  borderRadius: '50%',
                  bgcolor: (theme) => alpha(theme.palette.error.main, 0.1),
                  color: 'error.main',
                  mb: 3,
                  animation: `${pulse} 2s infinite`
                }}
              >
                <ReportProblemIcon sx={{ fontSize: 48 }} />
              </Box>

              <Typography variant='h4' gutterBottom fontWeight={700}>
                Something went wrong
              </Typography>

              <Typography color='text.secondary' paragraph sx={{ mb: 4 }}>
                We apologize for the inconvenience. An unexpected error has occurred. Please try reloading the page or
                return to the dashboard.
              </Typography>

              {this.state.error && (
                <Box
                  sx={{
                    mb: 4,
                    p: 2,
                    borderRadius: 2,
                    bgcolor: (theme) => alpha(theme.palette.error.main, 0.05),
                    border: '1px dashed',
                    borderColor: (theme) => alpha(theme.palette.error.main, 0.3),
                    textAlign: 'left'
                  }}
                >
                  <Typography
                    variant='caption'
                    component='pre'
                    sx={{
                      fontFamily: 'monospace',
                      color: 'error.main',
                      whiteSpace: 'pre-wrap',
                      wordBreak: 'break-word',
                      m: 0
                    }}
                  >
                    {this.state.error.message}
                  </Typography>
                </Box>
              )}

              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent='center'>
                <Button
                  variant='contained'
                  color='primary'
                  size='large'
                  startIcon={<RefreshIcon />}
                  onClick={this.handleReload}
                  sx={{ borderRadius: 2, px: 4 }}
                >
                  Try Again
                </Button>

                <Button
                  variant='outlined'
                  color='inherit'
                  size='large'
                  startIcon={<DashboardIcon />}
                  href={path.dashboard}
                  sx={{ borderRadius: 2, px: 4 }}
                >
                  Back to Dashboard
                </Button>
              </Stack>
            </Paper>
          </Container>
        </Box>
      )
    }

    return this.props.children
  }
}
