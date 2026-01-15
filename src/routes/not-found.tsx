import path from '@/constants/path'
import DashboardIcon from '@mui/icons-material/Dashboard'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { keyframes } from '@mui/material/styles'
import { Link } from 'react-router'

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
  100% { transform: translateY(0px); }
`

const floatReverse = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(20px); }
  100% { transform: translateY(0px); }
`

const pulse = keyframes`
  0% { opacity: 0.4; transform: scale(1); }
  50% { opacity: 0.8; transform: scale(1.1); }
  100% { opacity: 0.4; transform: scale(1); }
`

export default function NotFound() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        bgcolor: 'background.default',
        zIndex: 1,
        overflowX: 'hidden'
      }}
    >
      <Box
        sx={{
          position: 'fixed',
          inset: 0,
          overflow: 'hidden',
          zIndex: -1,
          pointerEvents: 'none'
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: '10%',
            left: '15%',
            width: { xs: 200, md: 400 },
            height: { xs: 200, md: 400 },
            borderRadius: '50%',
            background: (theme) => `radial-gradient(circle, ${theme.palette.primary.main} 0%, transparent 70%)`,
            filter: 'blur(60px)',
            opacity: 0.4,
            animation: `${pulse} 8s infinite ease-in-out`
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: '15%',
            right: '10%',
            width: { xs: 250, md: 500 },
            height: { xs: 250, md: 500 },
            borderRadius: '50%',
            background: (theme) => `radial-gradient(circle, ${theme.palette.secondary.main} 0%, transparent 70%)`,
            filter: 'blur(80px)',
            opacity: 0.3,
            animation: `${pulse} 10s infinite ease-in-out reverse`
          }}
        />
      </Box>

      <Container
        maxWidth='md'
        sx={{
          position: 'relative',
          zIndex: 2,
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          py: 8
        }}
      >
        <Stack alignItems='center' spacing={4} textAlign='center'>
          <Box sx={{ position: 'relative' }}>
            <Typography
              variant='h1'
              sx={{
                fontSize: { xs: '8rem', sm: '12rem', md: '16rem' },
                fontWeight: 900,
                lineHeight: 1,
                letterSpacing: '-0.05em',
                background: (theme) =>
                  `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                animation: `${float} 6s infinite ease-in-out`,
                filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.1))'
              }}
            >
              404
            </Typography>

            <Box
              sx={{
                position: 'absolute',
                top: '20%',
                right: '-5%',
                width: 40,
                height: 40,
                borderRadius: '50%',
                border: (theme) => `4px solid ${theme.palette.warning.main}`,
                opacity: 0.6,
                animation: `${floatReverse} 7s infinite ease-in-out`
              }}
            />
            <Box
              sx={{
                position: 'absolute',
                bottom: '15%',
                left: '-5%',
                width: 24,
                height: 24,
                borderRadius: '4px',
                bgcolor: 'info.main',
                opacity: 0.5,
                transform: 'rotate(45deg)',
                animation: `${float} 5s infinite ease-in-out 1s`
              }}
            />
          </Box>

          <Stack spacing={2} alignItems='center' sx={{ maxWidth: 600 }}>
            <Typography
              variant='h4'
              sx={{
                fontWeight: 700,
                color: 'text.primary'
              }}
            >
              Lost in Space?
            </Typography>
            <Typography component='p' variant='body1' color='text.secondary'>
              The page you are looking for seems to have drifted away into the unknown universe. Let&apos;s get you back
              to safety.
            </Typography>
          </Stack>

          <Button
            component={Link}
            to={path.dashboard}
            variant='contained'
            size='large'
            startIcon={<DashboardIcon />}
            sx={{
              px: 4,
              py: 1.5,
              borderRadius: 4,
              fontSize: '1.1rem',
              textTransform: 'none',
              boxShadow: (theme) => `0 8px 20px -4px ${theme.palette.primary.main}66`,
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: (theme) => `0 12px 24px -4px ${theme.palette.primary.main}88`
              },
              transition: 'all 0.3s ease'
            }}
          >
            Back to Dashboard
          </Button>
        </Stack>
      </Container>
    </Box>
  )
}
