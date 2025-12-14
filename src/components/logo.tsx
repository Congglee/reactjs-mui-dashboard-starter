import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import type { SxProps, Theme } from '@mui/material/styles'
import MUILogo from '@/assets/mui.svg'

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
        sx={{
          width: isSidebar ? 34 : isFooter ? { xs: 32, sm: 36 } : { xs: 28, sm: 32 },
          height: isSidebar ? 34 : isFooter ? { xs: 32, sm: 36 } : { xs: 28, sm: 32 },
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Box
          component='img'
          src={MUILogo}
          alt='App logo'
          loading='eager'
          draggable={false}
          sx={[
            {
              width: '100%',
              height: '100%',
              display: 'block',
              borderRadius: 1.5,
              objectFit: 'contain',
              backgroundColor: '#ffffff'
            },
            (theme) =>
              theme.applyStyles('dark', {
                backgroundColor: 'transparent'
              })
          ]}
        />
      </Box>

      {(!collapsed || !isSidebar) && (
        <Box sx={{ minWidth: 0, display: { xs: isSidebar || isFooter ? 'block' : 'none', sm: 'block' } }}>
          <Typography
            variant={isSidebar ? 'subtitle1' : 'h6'}
            title='MUI Admin'
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
            MUI Admin
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
