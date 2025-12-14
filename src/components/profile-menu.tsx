import LogoutIcon from '@mui/icons-material/Logout'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import Divider from '@mui/material/Divider'
import Grow from '@mui/material/Grow'
import IconButton from '@mui/material/IconButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import type { PopoverOrigin } from '@mui/material/Popover'
import { useTheme } from '@mui/material/styles'
import { useState, type MouseEvent, type ReactNode } from 'react'

type ProfileMenuPlacement = 'default' | 'side'

type ProfileMenuTriggerProps = {
  id: string
  onClick: (event: MouseEvent<HTMLElement>) => void
  'aria-haspopup': 'menu'
  'aria-expanded': 'true' | undefined
  'aria-controls': string | undefined
  'aria-label': string
}

const DEFAULT_TRIGGER_ID = 'profile-options-button'
const DEFAULT_MENU_ID = 'profile-options-menu'
const DEFAULT_ARIA_LABEL = 'profile options'

const DEFAULT_ANCHOR_ORIGIN: PopoverOrigin = { vertical: 'bottom', horizontal: 'right' }
const SIDE_ANCHOR_ORIGIN: PopoverOrigin = { vertical: 'center', horizontal: 'right' }

const DEFAULT_TRANSFORM_ORIGIN: PopoverOrigin = { vertical: 'top', horizontal: 'right' }
const SIDE_TRANSFORM_ORIGIN: PopoverOrigin = { vertical: 'center', horizontal: 'left' }

interface ProfileMenuProps {
  renderTrigger?: (props: ProfileMenuTriggerProps) => ReactNode
  placement?: ProfileMenuPlacement
  triggerId?: string
  menuId?: string
  ariaLabel?: string
}

export default function ProfileMenu({
  renderTrigger,
  placement = 'default',
  triggerId = DEFAULT_TRIGGER_ID,
  menuId = DEFAULT_MENU_ID,
  ariaLabel = DEFAULT_ARIA_LABEL
}: ProfileMenuProps = {}) {
  const theme = useTheme()

  const [profileMenuAnchorEl, setProfileMenuAnchorEl] = useState<null | HTMLElement>(null)

  const isProfileMenuOpen = Boolean(profileMenuAnchorEl)

  const handleProfileMenuOpen = (event: MouseEvent<HTMLElement>) => {
    setProfileMenuAnchorEl(event.currentTarget)
  }

  const handleProfileMenuClose = () => {
    setProfileMenuAnchorEl(null)
  }

  const anchorOrigin = placement === 'side' ? SIDE_ANCHOR_ORIGIN : DEFAULT_ANCHOR_ORIGIN
  const transformOrigin = placement === 'side' ? SIDE_TRANSFORM_ORIGIN : DEFAULT_TRANSFORM_ORIGIN

  const triggerProps: ProfileMenuTriggerProps = {
    id: triggerId,
    onClick: handleProfileMenuOpen,
    'aria-haspopup': 'menu',
    'aria-expanded': isProfileMenuOpen ? 'true' : undefined,
    'aria-controls': isProfileMenuOpen ? menuId : undefined,
    'aria-label': ariaLabel
  }

  const triggerNode = renderTrigger ? (
    renderTrigger(triggerProps)
  ) : (
    <IconButton
      {...triggerProps}
      size='small'
      sx={{
        width: 36,
        height: 36,
        borderRadius: 1.25,
        border: '1px solid var(--color-border)',
        color: 'text.secondary',
        '&:hover': {
          bgcolor: 'var(--color-hover)'
        }
      }}
    >
      <MoreVertIcon fontSize='small' />
    </IconButton>
  )

  return (
    <>
      {triggerNode}

      <Menu
        id={menuId}
        anchorEl={profileMenuAnchorEl}
        open={isProfileMenuOpen}
        onClose={handleProfileMenuClose}
        slots={{ transition: Grow }}
        transitionDuration={{
          enter: theme.transitions.duration.shorter,
          exit: theme.transitions.duration.shortest
        }}
        anchorOrigin={anchorOrigin}
        transformOrigin={transformOrigin}
        slotProps={{
          paper: {
            elevation: 0,
            sx: [
              {
                minWidth: 200,
                borderRadius: 1.5,
                border: '1px solid var(--color-border)',
                bgcolor: 'var(--color-card-elevated)',
                color: 'text.primary',
                boxShadow: '0 10px 30px rgba(0,0,0,0.12)',
                ...(placement === 'side' ? { ml: 1 } : { mt: 1 })
              },
              (theme) =>
                theme.applyStyles('dark', {
                  boxShadow: '0 16px 40px rgba(0,0,0,0.5)'
                })
            ]
          },
          list: {
            'aria-labelledby': triggerId,
            dense: false,
            sx: {
              py: 0.5,
              '& .MuiMenuItem-root': {
                typography: 'body2'
              }
            }
          }
        }}
      >
        <MenuItem onClick={handleProfileMenuClose}>Profile</MenuItem>
        <MenuItem onClick={handleProfileMenuClose}>My account</MenuItem>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem onClick={handleProfileMenuClose}>Add another account</MenuItem>
        <MenuItem onClick={handleProfileMenuClose}>Settings</MenuItem>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem
          onClick={handleProfileMenuClose}
          sx={{ color: 'text.primary', display: 'flex', justifyContent: 'space-between', gap: 1 }}
        >
          Logout
          <ListItemIcon
            sx={{
              color: 'text.secondary',
              '&.MuiListItemIcon-root': {
                minWidth: 20
              }
            }}
          >
            <LogoutIcon fontSize='small' />
          </ListItemIcon>
        </MenuItem>
      </Menu>
    </>
  )
}
