import ButtonBase from '@mui/material/ButtonBase'
import Box from '@mui/material/Box'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import type { ElementType } from 'react'
import type { SvgIconProps } from '@mui/material/SvgIcon'
import { NavLink, useLocation } from 'react-router'

interface NavItemProps {
  label: string
  icon: ElementType<SvgIconProps>
  href: string
  collapsed?: boolean
}

export default function NavItem({ label, icon: Icon, href, collapsed = false }: NavItemProps) {
  const location = useLocation()
  const active = location.pathname === href || location.pathname.startsWith(`${href}/`)

  const button = (
    <ButtonBase
      component={NavLink}
      to={href}
      focusRipple
      aria-label={collapsed ? label : undefined}
      sx={{
        justifyContent: collapsed ? 'center' : 'flex-start',
        alignItems: 'center',
        width: '100%',
        borderRadius: 1.5,
        px: collapsed ? 0 : 1,
        py: 0.75,
        gap: collapsed ? 0 : 1,
        minHeight: 44,
        color: active ? 'text.primary' : 'text.secondary',
        bgcolor: active ? 'var(--color-selected)' : 'transparent',
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: 0,
          borderRadius: 'inherit',
          bgcolor: active ? 'var(--color-selected)' : 'transparent',
          transition: 'background-color .2s ease',
          zIndex: 0
        },
        '&:hover': {
          bgcolor: active ? 'var(--color-selected)' : 'var(--color-hover)'
        },
        transition: 'background-color .2s ease, color .2s ease',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <Box
        sx={[
          {
            width: collapsed ? 40 : 30,
            height: collapsed ? 40 : 30,
            borderRadius: 1,
            display: 'grid',
            placeItems: 'center',
            background: active ? 'linear-gradient(135deg, #027af2 0%, #0059b3 100%)' : 'transparent'
          },
          (theme) =>
            active
              ? theme.applyStyles('dark', {
                  background: 'linear-gradient(135deg, #4da6ff 0%, #2a8fff 100%)'
                })
              : {}
        ]}
      >
        <Icon
          sx={{
            fontSize: collapsed ? 22 : 18,
            color: active ? '#ffffff' : 'text.disabled'
          }}
        />
      </Box>
      {!collapsed && (
        <Typography variant='body2' sx={{ fontWeight: active ? 600 : 500, lineHeight: 1.2, letterSpacing: 0.2 }}>
          {label}
        </Typography>
      )}
    </ButtonBase>
  )

  if (!collapsed) {
    return button
  }

  return (
    <Tooltip title={label} placement='right' enterDelay={200} arrow>
      {button}
    </Tooltip>
  )
}
