import UsersHeader from '@/components/users/users-header'
import UsersTable from '@/components/users/users-table'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'

export default function Users() {
  return (
    <Box>
      <UsersHeader />
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
        <UsersTable />
      </Paper>
    </Box>
  )
}
