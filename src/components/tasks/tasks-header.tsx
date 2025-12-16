import PageHeader from '@/components/page-header'
import NewTaskDrawer from '@/components/tasks/new-task-drawer'
import AddIcon from '@mui/icons-material/Add'
import RefreshIcon from '@mui/icons-material/Refresh'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { useState } from 'react'

export default function TasksHeader() {
  const [newTaskDrawerOpen, setNewTaskDrawerOpen] = useState(false)

  const handleNewTaskDrawerClose = () => {
    setNewTaskDrawerOpen(false)
  }

  return (
    <>
      <Box sx={{ mb: 3, display: 'flex', flexDirection: 'column' }}>
        <PageHeader breadcrumbs={[{ label: 'Tasks', current: true }]} />

        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: { xs: 'flex-start', sm: 'center' },
            justifyContent: { xs: 'flex-start', sm: 'space-between' },
            gap: 1
          }}
        >
          <Typography
            variant='h2'
            component='h1'
            sx={{ fontSize: '1.5rem', fontWeight: 600, lineHeight: 1.6, color: 'text.primary' }}
          >
            Task List
          </Typography>
          <Stack direction='row' spacing={1}>
            <IconButton sx={{ color: 'text.secondary' }}>
              <RefreshIcon />
            </IconButton>
            <Button
              variant='contained'
              startIcon={<AddIcon />}
              onClick={() => setNewTaskDrawerOpen(true)}
              sx={{
                textTransform: 'none',
                fontWeight: 600,
                px: 2
              }}
            >
              Create
            </Button>
          </Stack>
        </Box>
      </Box>

      <NewTaskDrawer newTaskDrawerOpen={newTaskDrawerOpen} onNewTaskDrawerClose={handleNewTaskDrawerClose} />
    </>
  )
}
