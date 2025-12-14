import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import Badge from '@mui/material/Badge'
import SearchIcon from '@mui/icons-material/Search'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import MenuIcon from '@mui/icons-material/Menu'
import { useAppContext } from '@/providers/app-provider'
import ThemeMenu from '@/components/theme-menu'

export default function Navbar() {
  const { sidebarOpen, setSidebarOpen } = useAppContext()

  return (
    <Box
      component='header'
      sx={{
        position: 'sticky',
        top: 0,
        zIndex: 10,
        height: 64,
        bgcolor: 'var(--color-navbar-bg)',
        borderBottom: '1px solid var(--color-border)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 1,
        overflowX: 'auto',
        overflowY: 'hidden',
        WebkitOverflowScrolling: 'touch',
        pb: 0.5,
        scrollbarGutter: 'stable',
        flexWrap: 'nowrap',
        whiteSpace: 'nowrap',
        '& > *': { flexShrink: 0 },
        px: 2
      }}
    >
      <IconButton
        aria-label='toggle sidebar'
        onClick={() => setSidebarOpen(!sidebarOpen)}
        sx={{
          width: 36,
          height: 36,
          borderRadius: 1.25,
          border: '1px solid var(--color-border)',
          color: 'text.secondary',
          bgcolor: 'var(--color-surface)',
          '&:hover': { bgcolor: 'var(--color-hover)' }
        }}
      >
        <MenuIcon sx={{ fontSize: 20 }} />
      </IconButton>

      <Stack
        direction='row'
        alignItems='center'
        spacing={{ xs: 1, sm: 1.25 }}
        sx={{
          flexWrap: 'nowrap',
          justifyContent: 'flex-end',
          minWidth: 'max-content',
          '& > *': { flexShrink: 0 }
        }}
      >
        <OutlinedInput
          placeholder='Search...'
          size='small'
          sx={{
            width: { xs: 160, sm: 220, md: 320 },
            height: 36,
            borderRadius: 1.25,
            bgcolor: 'var(--color-surface)',
            color: 'text.primary',
            '& .MuiOutlinedInput-input': {
              py: 0.75
            },
            '& input::placeholder': { color: 'text.secondary', opacity: 1 },
            '& .MuiOutlinedInput-notchedOutline': { borderColor: 'var(--color-border)' },
            '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'var(--color-border-strong)' },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'primary.main', borderWidth: 2 }
          }}
          startAdornment={
            <InputAdornment position='start'>
              <SearchIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
            </InputAdornment>
          }
        />

        <IconButton
          aria-label='notifications'
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
          <Badge
            color='error'
            variant='dot'
            overlap='circular'
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            sx={{
              '& .MuiBadge-dot': {
                width: 8,
                height: 8,
                minWidth: 8
              }
            }}
          >
            <NotificationsNoneIcon sx={{ fontSize: 20 }} />
          </Badge>
        </IconButton>

        <ThemeMenu />
      </Stack>
    </Box>
  )
}
