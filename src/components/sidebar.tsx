import AnalyticsIcon from '@/components/icons/analytics-icon'
import HelpIcon from '@/components/icons/help-icon'
import HomeIcon from '@/components/icons/home-icon'
import InfoIcon from '@/components/icons/info-icon'
import SettingsIcon from '@/components/icons/settings-icon'
import TasksIcon from '@/components/icons/tasks-icon'
import UsersIcon from '@/components/icons/users-icon'
import Logo from '@/components/logo'
import NavItem from '@/components/nav-item'
import ProfileMenu from '@/components/profile-menu'
import { useAppContext } from '@/providers/app-provider'
import { SIDEBAR_COLLAPSED_WIDTH, SIDEBAR_WIDTH } from '@/theme'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import ButtonBase from '@mui/material/ButtonBase'
import Avatar from '@mui/material/Avatar'
import Drawer from '@mui/material/Drawer'
import Tooltip from '@mui/material/Tooltip'
import { alpha, useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'

interface SidebarProps {
  width?: number
}

export default function Sidebar({ width = SIDEBAR_WIDTH }: SidebarProps) {
  const theme = useTheme()
  const isSm = useMediaQuery('(max-width:600px)')

  const { sidebarOpen, setSidebarOpen } = useAppContext()

  const isPersistent = !isSm
  const isCollapsed = isPersistent && !sidebarOpen
  const drawerWidth = isCollapsed ? SIDEBAR_COLLAPSED_WIDTH : width
  const horizontalPadding = isCollapsed ? 1 : 2

  return (
    <Drawer
      variant={isSm ? 'temporary' : 'persistent'}
      anchor='left'
      open={isSm ? sidebarOpen : true}
      onClose={() => {
        if (isSm) {
          setSidebarOpen(false)
        }
      }}
      sx={{
        '& .MuiDrawer-paper': {
          bgcolor: 'var(--color-sidebar-bg)',
          color: 'text.primary',
          backgroundImage: 'none',
          boxShadow: 'none'
        }
      }}
      slotProps={{
        transition: {
          appear: true,
          easing: {
            enter: 'cubic-bezier(0.4, 0, 0.2, 1)',
            exit: 'cubic-bezier(0.4, 0, 0.6, 1)'
          },
          timeout: {
            enter: theme.transitions.duration.enteringScreen,
            exit: theme.transitions.duration.leavingScreen
          }
        },
        backdrop: {
          sx: {
            backgroundColor: (theme) => alpha(theme.palette.background.default, 0.72),
            backdropFilter: 'blur(2px)',
            transition: 'opacity 225ms cubic-bezier(0.4, 0, 0.2, 1) !important'
          }
        },
        paper: {
          component: 'aside',
          elevation: 0,
          square: true,
          sx: {
            width: drawerWidth,
            bgcolor: 'var(--color-sidebar-bg)',
            color: 'text.primary',
            backgroundImage: 'none',
            borderRight: '1px solid var(--color-border)',
            boxSizing: 'border-box',
            px: horizontalPadding,
            py: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: isCollapsed ? 1.5 : 2,
            height: '100dvh',
            overflow: 'hidden',
            boxShadow: 'none',
            willChange: 'transform',
            transform: 'translate3d(0, 0, 0)',
            backfaceVisibility: 'hidden',
            WebkitFontSmoothing: 'antialiased',
            contain: 'layout style paint',
            transition: 'width 225ms cubic-bezier(0.4, 0, 0.2, 1), transform 225ms cubic-bezier(0.4, 0, 0.2, 1)'
          }
        }
      }}
      ModalProps={{ keepMounted: true }}
    >
      <Logo variant='sidebar' collapsed={isCollapsed} horizontalPadding={horizontalPadding} />

      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: isCollapsed ? 1.5 : 2,
          minHeight: 0,
          minWidth: 0,
          overflowY: 'auto',
          overflowX: 'hidden',
          mr: -horizontalPadding,
          pr: horizontalPadding
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
          <NavItem icon={HomeIcon} label='Home' href='/dashboard' collapsed={isCollapsed} />
          <NavItem icon={AnalyticsIcon} label='Analytics' href='/analytics' collapsed={isCollapsed} />
          <NavItem icon={UsersIcon} label='Clients' href='/clients' collapsed={isCollapsed} />
          <NavItem icon={TasksIcon} label='Tasks' href='/tasks' collapsed={isCollapsed} />
        </Box>

        <Box sx={{ mt: 'auto', display: 'flex', flexDirection: 'column', gap: 0.5 }}>
          <NavItem icon={SettingsIcon} label='Settings' href='/settings' collapsed={isCollapsed} />
          <NavItem icon={InfoIcon} label='About' href='/about' collapsed={isCollapsed} />
          <NavItem icon={HelpIcon} label='Feedback' href='/feedback' collapsed={isCollapsed} />

          {isCollapsed ? (
            <Tooltip
              placement='right'
              arrow
              enterDelay={200}
              title={
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                  <Typography variant='subtitle2' sx={{ fontWeight: 600 }}>
                    Plan about to expire
                  </Typography>
                  <Typography variant='caption'>Enjoy 10% off when renewing your plan today.</Typography>
                </Box>
              }
            >
              <Box
                aria-label='Plan renew promotion'
                sx={[
                  {
                    display: 'grid',
                    placeItems: 'center',
                    width: 48,
                    height: 48,
                    mx: 'auto',
                    mt: 1.5,
                    borderRadius: 1.5,
                    border: '1px solid var(--color-border)',
                    bgcolor: 'var(--color-card-elevated)',
                    color: 'var(--color-info)',
                    boxShadow: '0 2px 14px rgba(0,0,0,0.06)',
                    transition: 'background-color .2s ease, box-shadow .2s ease',
                    '&:hover': {
                      bgcolor: 'var(--color-hover)'
                    }
                  },
                  (theme) =>
                    theme.applyStyles('dark', {
                      boxShadow: '0 4px 20px rgba(0,0,0,0.5)'
                    })
                ]}
              >
                <AutoAwesomeIcon sx={{ fontSize: 22 }} />
              </Box>
            </Tooltip>
          ) : (
            <Box
              aria-label='Plan renew promotion'
              sx={[
                {
                  p: 2,
                  mt: 1.5,
                  border: '1px solid var(--color-border)',
                  borderRadius: 1.5,
                  bgcolor: 'var(--color-card-elevated)',
                  boxShadow: '0 2px 14px rgba(0,0,0,0.06)'
                },
                (theme) =>
                  theme.applyStyles('dark', {
                    boxShadow: '0 4px 20px rgba(0,0,0,0.5)'
                  })
              ]}
            >
              <Box
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 28,
                  height: 28,
                  borderRadius: 1.25,
                  bgcolor: 'var(--color-info-bg)',
                  color: 'var(--color-info)',
                  mb: 1
                }}
              >
                <AutoAwesomeIcon sx={{ fontSize: 18 }} />
              </Box>

              <Typography variant='subtitle2' sx={{ fontWeight: 600, mb: 0.5, color: 'text.primary' }}>
                Plan about to expire
              </Typography>
              <Typography variant='body2' color='text.secondary' sx={{ mb: 1.25 }}>
                Enjoy 10% off when renewing your plan today.
              </Typography>

              <Button
                fullWidth
                variant='contained'
                disableElevation
                sx={[
                  {
                    textTransform: 'none',
                    fontWeight: 600,
                    borderRadius: 1.25,
                    bgcolor: 'primary.main',
                    color: '#ffffff',
                    '&:hover': {
                      bgcolor: 'primary.light'
                    }
                  },
                  (theme) =>
                    theme.applyStyles('dark', {
                      color: '#0b0e14'
                    })
                ]}
              >
                Get the discount
              </Button>
            </Box>
          )}
        </Box>
      </Box>

      <Box
        sx={{
          pt: 1.5,
          pb: 2,
          mx: -horizontalPadding,
          px: horizontalPadding,
          borderTop: '1px solid var(--color-border)'
        }}
      >
        {isCollapsed ? (
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <ProfileMenu
              placement='side'
              triggerId='sidebar-profile-avatar-button'
              menuId='sidebar-profile-menu'
              ariaLabel='Open profile menu'
              renderTrigger={(triggerProps) => (
                <ButtonBase
                  {...triggerProps}
                  disableRipple
                  sx={[
                    {
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      p: 0,
                      overflow: 'hidden',
                      border: '1px solid transparent',
                      transition:
                        'border-color 180ms cubic-bezier(0.4, 0, 0.2, 1), transform 180ms cubic-bezier(0.4, 0, 0.2, 1)'
                    },
                    (theme) => {
                      const focusColor = theme.vars?.palette.primary.main ?? theme.palette.primary.main

                      return {
                        '&:focus-visible': {
                          outline: `2px solid ${focusColor}`,
                          outlineOffset: 2
                        }
                      }
                    },
                    (theme) =>
                      theme.applyStyles('dark', {
                        borderColor: theme.palette.primary.light
                      })
                  ]}
                >
                  <Avatar
                    alt='Riley Carter'
                    src='https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&fit=crop&crop=faces&w=160&h=160&auto=format'
                    sx={{ width: 40, height: 40 }}
                  />
                </ButtonBase>
              )}
            />
          </Box>
        ) : (
          <Box
            sx={{
              p: 1.25,
              border: '1px solid var(--color-border)',
              borderRadius: 1.5,
              bgcolor: 'var(--color-sidebar-bg)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 1.25
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25, minWidth: 0 }}>
              <Avatar
                alt='Riley Carter'
                src='https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&fit=crop&crop=faces&w=160&h=160&auto=format'
                sx={{ width: 40, height: 40 }}
              />
              <Box sx={{ minWidth: 0 }}>
                <Typography variant='subtitle2' sx={{ fontWeight: 600, lineHeight: 1.2, color: 'text.primary' }} noWrap>
                  Riley Carter
                </Typography>
                <Typography variant='caption' sx={{ color: 'text.secondary' }} noWrap>
                  riley@email.com
                </Typography>
              </Box>
            </Box>

            <ProfileMenu />
          </Box>
        )}
      </Box>
    </Drawer>
  )
}
