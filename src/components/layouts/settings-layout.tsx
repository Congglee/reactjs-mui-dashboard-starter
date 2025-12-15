import PageHeader from '@/components/page-header'
import SettingsSidebar from '@/components/settings/settings-sidebar'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import { Outlet } from 'react-router'

export default function SettingsLayout() {
  return (
    <Box>
      <PageHeader breadcrumbs={[{ label: 'Settings' }, { label: 'Profile', current: true }]} />

      <Typography
        variant='h2'
        sx={{ fontSize: '1.5rem', fontWeight: 600, lineHeight: 1, color: 'text.primary', mb: 3.5 }}
      >
        Settings
      </Typography>

      <Divider sx={{ mb: 3.5, borderColor: 'var(--color-border)' }} />

      <Box
        sx={{
          display: 'flex',
          gap: { xs: 3, md: 6 },
          flexDirection: { xs: 'column', lg: 'row' }
        }}
      >
        <SettingsSidebar />

        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  )
}

