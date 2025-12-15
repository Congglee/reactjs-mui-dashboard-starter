import path from '@/constants/path'
import Box from '@mui/material/Box'
import ButtonBase from '@mui/material/ButtonBase'
import Typography from '@mui/material/Typography'
import DesktopWindowsOutlinedIcon from '@mui/icons-material/DesktopWindowsOutlined'
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined'
import PaletteOutlinedIcon from '@mui/icons-material/PaletteOutlined'
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined'
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined'
import type { ElementType } from 'react'
import type { SvgIconProps } from '@mui/material/SvgIcon'
import { NavLink, useLocation } from 'react-router'

interface SettingsNavItem {
  label: string
  href: string
  icon: ElementType<SvgIconProps>
}

const settingsNavItems: SettingsNavItem[] = [
  { label: 'Profile', href: path.settings, icon: ShareOutlinedIcon },
  { label: 'Account', href: path.account, icon: VpnKeyOutlinedIcon },
  { label: 'Appearance', href: path.appearance, icon: PaletteOutlinedIcon },
  { label: 'Notifications', href: path.notifications, icon: NotificationsNoneOutlinedIcon },
  { label: 'Display', href: path.display, icon: DesktopWindowsOutlinedIcon }
]

export default function SettingsSidebar() {
  const location = useLocation()

  return (
    <Box
      component='nav'
      sx={{
        display: 'flex',
        flexDirection: { xs: 'row', lg: 'column' },
        overflowX: 'auto',
        gap: 0.25,
        width: { xs: '100%', lg: 200 },
        flexShrink: 0
      }}
    >
      {settingsNavItems.map((item) => {
        const Icon = item.icon
        const isActive = location.pathname === item.href

        return (
          <ButtonBase
            key={item.href}
            component={NavLink}
            to={item.href}
            sx={{
              justifyContent: { xs: 'center', lg: 'flex-start' },
              alignItems: 'center',
              width: { xs: 'auto', lg: '100%' },
              borderRadius: 1.5,
              px: 1.5,
              py: 1,
              gap: 1.25,
              minHeight: 40,
              color: isActive ? 'text.primary' : 'text.secondary',
              bgcolor: isActive ? 'var(--color-selected)' : 'transparent',
              transition: 'background-color .15s ease, color .15s ease',
              '&:hover': {
                bgcolor: isActive ? 'var(--color-selected)' : 'var(--color-hover)'
              }
            }}
          >
            <Icon
              sx={{
                fontSize: 18,
                color: isActive ? 'text.primary' : 'text.secondary'
              }}
            />
            <Typography
              variant='body2'
              sx={{
                fontWeight: isActive ? 600 : 400,
                lineHeight: 1.4,
                letterSpacing: 0.1
              }}
            >
              {item.label}
            </Typography>
          </ButtonBase>
        )
      })}
    </Box>
  )
}
