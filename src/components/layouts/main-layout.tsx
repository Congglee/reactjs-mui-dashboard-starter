import Box from '@mui/material/Box'
import { Outlet } from 'react-router'

export default function MainLayout() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100dvh',
        bgcolor: 'var(--color-bg)'
      }}
    >
      <Outlet />
    </Box>
  )
}
