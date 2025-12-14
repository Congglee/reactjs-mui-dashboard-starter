import ModeMenu from '@/components/landing/mode-menu'
import Logo from '@/components/logo'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import MenuIcon from '@mui/icons-material/Menu'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import MenuItem from '@mui/material/MenuItem'
import Toolbar from '@mui/material/Toolbar'
import { alpha } from '@mui/material/styles'
import { useState } from 'react'
import { Link } from 'react-router'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleDrawerToggle = (newOpen: boolean) => () => {
    setMobileMenuOpen(newOpen)
  }

  const scrollToSection = (href: string) => {
    setMobileMenuOpen(false)
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <AppBar
      position='fixed'
      enableColorOnDark
      sx={{
        boxShadow: 0,
        bgcolor: 'transparent',
        backgroundImage: 'none',
        mt: 3.5
      }}
    >
      <Container maxWidth='lg'>
        <Toolbar
          variant='dense'
          disableGutters
          sx={(theme) => ({
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexShrink: 0,
            borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
            backdropFilter: 'blur(24px)',
            border: '1px solid',
            borderColor: (theme.vars || theme).palette.divider,
            backgroundColor: theme.vars
              ? `rgba(${theme.vars.palette.background.defaultChannel} / 0.4)`
              : alpha(theme.palette.background.default, 0.4),
            boxShadow: (theme.vars || theme).shadows[1],
            padding: '8px 12px'
          })}
        >
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', px: 0, gap: 2 }}>
            <Logo variant='header' />
            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
              <Button variant='text' color='info' size='small' onClick={() => scrollToSection('#features')}>
                Features
              </Button>
              <Button variant='text' color='info' size='small' onClick={() => scrollToSection('#testimonials')}>
                Testimonials
              </Button>
              <Button variant='text' color='info' size='small' onClick={() => scrollToSection('#highlights')}>
                Highlights
              </Button>
              <Button variant='text' color='info' size='small' onClick={() => scrollToSection('#pricing')}>
                Pricing
              </Button>
              <Button
                variant='text'
                color='info'
                size='small'
                sx={{ minWidth: 0 }}
                onClick={() => scrollToSection('#faq')}
              >
                FAQ
              </Button>
              <Button variant='text' color='info' size='small' sx={{ minWidth: 0 }}>
                Blog
              </Button>
            </Box>
          </Box>

          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              gap: 1,
              alignItems: 'center'
            }}
          >
            {/* <Button color='primary' variant='text' size='small'>
              Sign in
            </Button>
            <Button color='primary' variant='contained' size='small'>
              Sign up
            </Button> */}
            <Button component={Link} to='/dashboard' color='primary' variant='contained' size='small'>
              Go to Dashboard
            </Button>
            <ModeMenu />
          </Box>

          <Box sx={{ display: { xs: 'flex', md: 'none' }, gap: 1 }}>
            <ModeMenu />

            <IconButton aria-label='Menu button' onClick={handleDrawerToggle(true)}>
              <MenuIcon />
            </IconButton>

            <Drawer anchor='top' open={mobileMenuOpen} onClose={handleDrawerToggle(false)}>
              <Box sx={{ p: 2, backgroundColor: 'background.default' }}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'flex-end'
                  }}
                >
                  <IconButton
                    onClick={handleDrawerToggle(false)}
                    sx={{
                      border: 1,
                      borderColor: 'divider',
                      borderRadius: 1,
                      color: 'text.primary',
                      '&:hover': {
                        bgcolor: 'action.hover'
                      }
                    }}
                  >
                    <CloseRoundedIcon />
                  </IconButton>
                </Box>
                <MenuItem>Features</MenuItem>
                <MenuItem>Testimonials</MenuItem>
                <MenuItem>Highlights</MenuItem>
                <MenuItem>Pricing</MenuItem>
                <MenuItem>FAQ</MenuItem>
                <MenuItem>Blog</MenuItem>
                <Divider sx={{ my: 3 }} />
                <MenuItem sx={{ '&:hover': { backgroundColor: 'transparent' } }}>
                  <Button color='primary' variant='contained' fullWidth>
                    Sign up
                  </Button>
                </MenuItem>
                <MenuItem sx={{ '&:hover': { backgroundColor: 'transparent' } }}>
                  <Button color='primary' variant='outlined' fullWidth>
                    Sign in
                  </Button>
                </MenuItem>
              </Box>
            </Drawer>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
