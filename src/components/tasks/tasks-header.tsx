import PageHeader from '@/components/page-header'
import NewTaskDialog from '@/components/tasks/new-task-dialog'
import AddIcon from '@mui/icons-material/Add'
import RefreshIcon from '@mui/icons-material/Refresh'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { useState } from 'react'

export default function TasksHeader() {
  const [newTaskDialogOpen, setNewTaskDialogOpen] = useState(false)

  const handleNewTaskDialogClose = () => {
    setNewTaskDialogOpen(false)
  }

  return (
    <>
      <Box sx={{ mb: 3, display: 'flex', flexDirection: 'column' }}>
        <PageHeader breadcrumbs={[{ label: 'Tasks', current: true }]} />

        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography
            variant='h2'
            component='h1'
            sx={{ fontSize: '1.5rem', fontWeight: 600, lineHeight: 1.6, color: 'text.primary' }}
          >
            Tasks
          </Typography>
          <Stack direction='row' spacing={1}>
            <IconButton sx={{ color: 'text.secondary' }}>
              <RefreshIcon />
            </IconButton>
            <Button
              variant='contained'
              startIcon={<AddIcon />}
              onClick={() => setNewTaskDialogOpen(true)}
              sx={{
                textTransform: 'uppercase',
                fontWeight: 600,
                px: 2
              }}
            >
              Create
            </Button>
          </Stack>
        </Box>
      </Box>

      <NewTaskDialog newTaskDialogOpen={newTaskDialogOpen} onNewTaskDialogClose={handleNewTaskDialogClose} />
    </>
  )
}
