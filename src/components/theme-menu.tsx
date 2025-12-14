import DarkModeIcon from '@mui/icons-material/DarkMode'
import LightModeIcon from '@mui/icons-material/LightMode'
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness'
import IconButton from '@mui/material/IconButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { useColorScheme } from '@mui/material/styles'
import { useState } from 'react'

export default function ThemeMenu() {
  const { mode, setMode } = useColorScheme()

  const [anchorThemeMenuEl, setAnchorThemeMenuEl] = useState<null | HTMLElement>(null)

  const handleThemeMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorThemeMenuEl(event.currentTarget)
  }

  const handleThemeMenuClose = () => {
    setAnchorThemeMenuEl(null)
  }

  const handleThemeMenuSelect = (selectedMode: 'light' | 'dark' | 'system') => {
    setMode(selectedMode)
    handleThemeMenuClose()
  }

  if (!mode) {
    return null
  }

  return (
    <>
      <IconButton
        aria-label='theme settings'
        aria-controls='theme-menu'
        aria-haspopup='true'
        onClick={handleThemeMenuOpen}
        sx={{
          width: 36,
          height: 36,
          borderRadius: 1.25,
          border: '1px solid var(--color-border)',
          color: 'text.secondary',
          bgcolor: 'var(--color-hover)',
          '&:hover': {
            bgcolor: 'var(--color-active)'
          }
        }}
      >
        {mode === 'light' ? (
          <LightModeIcon sx={{ fontSize: 20 }} />
        ) : mode === 'dark' ? (
          <DarkModeIcon sx={{ fontSize: 20 }} />
        ) : (
          <SettingsBrightnessIcon sx={{ fontSize: 20 }} />
        )}
      </IconButton>

      <Menu
        id='theme-menu'
        anchorEl={anchorThemeMenuEl}
        open={Boolean(anchorThemeMenuEl)}
        onClose={handleThemeMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        sx={[
          {
            '& .MuiPaper-root': {
              mt: 0.5,
              minWidth: 120,
              bgcolor: 'var(--color-card-elevated)',
              border: '1px solid var(--color-border)',
              borderRadius: 1.25,
              boxShadow: '0 2px 14px rgba(0,0,0,0.06)'
            }
          },
          (theme) => ({
            '& .MuiPaper-root': {
              ...theme.applyStyles('dark', {
                boxShadow: '0 4px 20px rgba(0,0,0,0.5)'
              })
            }
          })
        ]}
      >
        <MenuItem
          onClick={() => handleThemeMenuSelect('light')}
          selected={mode === 'light'}
          sx={{
            py: 1,
            px: 1.5,
            color: 'text.primary',
            '&.Mui-selected': {
              bgcolor: 'var(--color-selected)',
              '&:hover': { bgcolor: 'var(--color-focus)' }
            },
            '&:hover': { bgcolor: 'var(--color-hover)' }
          }}
        >
          <ListItemIcon sx={{ minWidth: 36 }}>
            <LightModeIcon sx={{ fontSize: 20, color: 'text.secondary' }} />
          </ListItemIcon>
          <ListItemText primary='Light' slotProps={{ primary: { sx: { color: 'text.primary', fontSize: 14 } } }} />
        </MenuItem>
        <MenuItem
          onClick={() => handleThemeMenuSelect('dark')}
          selected={mode === 'dark'}
          sx={{
            py: 1,
            px: 1.5,
            color: 'text.primary',
            '&.Mui-selected': {
              bgcolor: 'var(--color-selected)',
              '&:hover': { bgcolor: 'var(--color-focus)' }
            },
            '&:hover': { bgcolor: 'var(--color-hover)' }
          }}
        >
          <ListItemIcon sx={{ minWidth: 36 }}>
            <DarkModeIcon sx={{ fontSize: 20, color: 'text.secondary' }} />
          </ListItemIcon>
          <ListItemText primary='Dark' slotProps={{ primary: { sx: { color: 'text.primary', fontSize: 14 } } }} />
        </MenuItem>
        <MenuItem
          onClick={() => handleThemeMenuSelect('system')}
          selected={mode === 'system'}
          sx={{
            py: 1,
            px: 1.5,
            color: 'text.primary',
            '&.Mui-selected': {
              bgcolor: 'var(--color-selected)',
              '&:hover': { bgcolor: 'var(--color-focus)' }
            },
            '&:hover': { bgcolor: 'var(--color-hover)' }
          }}
        >
          <ListItemIcon sx={{ minWidth: 36 }}>
            <SettingsBrightnessIcon sx={{ fontSize: 20, color: 'text.secondary' }} />
          </ListItemIcon>
          <ListItemText primary='System' slotProps={{ primary: { sx: { color: 'text.primary', fontSize: 14 } } }} />
        </MenuItem>
      </Menu>
    </>
  )
}
