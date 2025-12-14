import type { Mode } from '@/types/theme.type'
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined'
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined'
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness'
import Box from '@mui/material/Box'
import IconButton, { type IconButtonOwnProps } from '@mui/material/IconButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { useColorScheme } from '@mui/material/styles'
import { useState } from 'react'

export default function ModeMenu(props: IconButtonOwnProps) {
  const { mode, setMode } = useColorScheme()

  const [anchorModeMenuEl, setAnchorModeMenuEl] = useState<null | HTMLElement>(null)

  const isModeMenuOpen = Boolean(anchorModeMenuEl)

  const handleModeMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorModeMenuEl(event.currentTarget)
  }

  const handleModeMenuClose = () => {
    setAnchorModeMenuEl(null)
  }

  const handleModeSelect = (targetMode: Mode) => () => {
    setMode(targetMode)
    handleModeMenuClose()
  }

  if (!mode) {
    return (
      <Box
        data-screenshot='toggle-mode'
        sx={(theme) => ({
          verticalAlign: 'bottom',
          display: 'inline-flex',
          width: '2.25rem',
          height: '2.25rem',
          borderRadius: (theme.vars || theme).shape.borderRadius,
          border: '1px solid',
          borderColor: (theme.vars || theme).palette.divider
        })}
      />
    )
  }

  const icon = {
    system: <SettingsBrightnessIcon />,
    light: <LightModeOutlinedIcon />,
    dark: <DarkModeOutlinedIcon />
  }[mode || 'system']

  return (
    <>
      <IconButton
        data-screenshot='toggle-mode'
        onClick={handleModeMenuOpen}
        disableRipple
        size='small'
        aria-controls={isModeMenuOpen ? 'color-scheme-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={isModeMenuOpen ? 'true' : undefined}
        {...props}
      >
        {icon}
      </IconButton>

      <Menu
        anchorEl={anchorModeMenuEl}
        id='account-menu'
        open={isModeMenuOpen}
        onClose={handleModeMenuClose}
        onClick={handleModeMenuClose}
        slotProps={{
          paper: {
            variant: 'outlined',
            elevation: 0,
            sx: {
              my: '4px',
              minWidth: 120,
              borderRadius: 2
            }
          }
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem selected={mode === 'system'} onClick={handleModeSelect('system')}>
          <ListItemIcon
            sx={{
              mr: 1.5,
              '&.MuiListItemIcon-root': {
                minWidth: '0'
              }
            }}
          >
            <SettingsBrightnessIcon fontSize='small' />
          </ListItemIcon>
          System
        </MenuItem>
        <MenuItem selected={mode === 'light'} onClick={handleModeSelect('light')}>
          <ListItemIcon
            sx={{
              mr: 1.5,
              '&.MuiListItemIcon-root': {
                minWidth: '0'
              }
            }}
          >
            <LightModeOutlinedIcon fontSize='small' />
          </ListItemIcon>
          Light
        </MenuItem>
        <MenuItem selected={mode === 'dark'} onClick={handleModeSelect('dark')}>
          <ListItemIcon
            sx={{
              mr: 1.5,
              '&.MuiListItemIcon-root': {
                minWidth: '0'
              }
            }}
          >
            <DarkModeOutlinedIcon fontSize='small' />
          </ListItemIcon>
          Dark
        </MenuItem>
      </Menu>
    </>
  )
}
