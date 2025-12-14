import TasksHeader from '@/components/tasks/tasks-header'
import TasksTable from '@/components/tasks/tasks-table'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'

export default function Tasks() {
  return (
    <Box>
      <TasksHeader />
      <Paper
        sx={[
          {
            width: '100%',
            overflow: 'hidden',
            bgcolor: 'background.paper',
            border: '1px solid var(--color-border)',
            borderRadius: 1
          },
          (theme) =>
            theme.applyStyles('dark', {
              bgcolor: 'background.paper'
            })
        ]}
      >
        <TasksTable />
      </Paper>
    </Box>
  )
}
