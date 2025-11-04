import Navbar from '@/components/navbar'
import Sidebar from '@/components/sidebar'
import { SIDEBAR_COLLAPSED_WIDTH, SIDEBAR_WIDTH } from '@/theme'
import Box from '@mui/material/Box'
import useMediaQuery from '@mui/material/useMediaQuery'
import { Outlet } from 'react-router'
import { useAppContext } from '@/providers/app-provider'

export default function DashboardLayout() {
  const { sidebarOpen } = useAppContext()
  const isSm = useMediaQuery('(max-width:600px)')

  const sidebarOffset = isSm ? 0 : sidebarOpen ? SIDEBAR_WIDTH : SIDEBAR_COLLAPSED_WIDTH

  return (
    <>
      <Sidebar width={SIDEBAR_WIDTH} />
      <Box
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          minWidth: 0,
          minHeight: 0,
          ml: sidebarOffset ? `${sidebarOffset}px` : 0
        }}
      >
        <Navbar />
        <Box
          component='main'
          sx={{
            flex: 1,
            px: 2.5,
            pt: 2,
            pb: 4,
            color: 'text.primary',
            overflow: 'auto',
            minHeight: 0
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </>
  )
}
