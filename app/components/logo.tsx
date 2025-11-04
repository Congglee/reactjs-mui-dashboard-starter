import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import type { SxProps, Theme } from '@mui/material/styles'

interface LogoProps {
  variant?: 'sidebar' | 'header' | 'footer'
  collapsed?: boolean
  horizontalPadding?: number
  containerSx?: SxProps<Theme>
}

export default function Logo({ variant = 'header', collapsed = false, horizontalPadding = 0, containerSx }: LogoProps) {
  const isSidebar = variant === 'sidebar'
  const isFooter = variant === 'footer'

  return (
    <Box
      aria-label='Application brand'
      sx={[
        {
          display: 'flex',
          alignItems: 'center',
          justifyContent: isSidebar && collapsed ? 'center' : 'flex-start',
          gap: isSidebar && collapsed ? 0 : isFooter ? 1.5 : 1.25,
          ...(isSidebar && {
            mx: -horizontalPadding,
            px: horizontalPadding,
            height: 64,
            flexShrink: 0,
            borderBottom: '1px solid var(--color-border)'
          })
        },
        ...(containerSx ? (Array.isArray(containerSx) ? containerSx : [containerSx]) : [])
      ]}
    >
      <Box
        sx={[
          {
            width: isSidebar ? 34 : isFooter ? { xs: 32, sm: 36 } : { xs: 28, sm: 32 },
            height: isSidebar ? 34 : isFooter ? { xs: 32, sm: 36 } : { xs: 28, sm: 32 },
            borderRadius: 1.5,
            p: '2px',
            background: 'linear-gradient(135deg, #027AF2 0%, #0059B3 100%)',
            boxShadow: '0 6px 18px rgba(0,0,0,0.10)',
            flexShrink: 0
          },
          (theme) =>
            theme.applyStyles('dark', {
              boxShadow: '0 6px 18px rgba(2,122,242,0.25)'
            })
        ]}
      >
        <Box
          component='img'
          src='/favicon.ico'
          alt='App logo'
          sx={[
            {
              width: '100%',
              height: '100%',
              display: 'block',
              borderRadius: 1.25,
              objectFit: 'cover',
              backgroundColor: '#ffffff'
            },
            (theme) =>
              theme.applyStyles('dark', {
                backgroundColor: '#0b0e14'
              })
          ]}
        />
      </Box>

      {(!collapsed || !isSidebar) && (
        <Box sx={{ minWidth: 0, display: { xs: isSidebar || isFooter ? 'block' : 'none', sm: 'block' } }}>
          <Typography
            variant={isSidebar ? 'subtitle1' : 'h6'}
            title='Nexus'
            color='text.primary'
            sx={[
              {
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                lineHeight: 1.3,
                fontWeight: isSidebar ? 400 : isFooter ? 700 : 600
              },
              isFooter && {
                fontSize: { xs: '1rem', sm: '1.25rem' }
              },
              !isSidebar &&
                !isFooter && {
                  fontSize: { xs: '0.875rem', sm: '1rem' }
                }
            ]}
          >
            Nexus
          </Typography>
          {isSidebar && (
            <Typography variant='caption' color='text.secondary' sx={{ display: { xs: 'none', sm: 'block' } }}>
              Dashboard
            </Typography>
          )}
        </Box>
      )}
    </Box>
  )
}
