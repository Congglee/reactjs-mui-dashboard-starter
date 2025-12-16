import PageHeader from '@/components/page-header'
import InviteUserDialog from '@/components/users/invite-user-dialog'
import NewUserDialog from '@/components/users/new-user-dialog'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import SendIcon from '@mui/icons-material/Send'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { useState } from 'react'

export default function UsersHeader() {
  const [newUserDialogOpen, setNewUserDialogOpen] = useState(false)
  const [inviteUserDialogOpen, setInviteUserDialogOpen] = useState(false)

  const handleNewUserDialogClose = () => {
    setNewUserDialogOpen(false)
  }

  const handleInviteUserDialogClose = () => {
    setInviteUserDialogOpen(false)
  }

  return (
    <>
      <Box sx={{ mb: 3, display: 'flex', flexDirection: 'column' }}>
        <PageHeader breadcrumbs={[{ label: 'Users', current: true }]} />

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
            User List
          </Typography>
          <Stack direction='row' spacing={1}>
            <Button
              variant='outlined'
              startIcon={<SendIcon />}
              onClick={() => setInviteUserDialogOpen(true)}
              sx={{
                textTransform: 'none',
                fontWeight: 600,
                px: 2,
                height: 40,
                borderColor: 'var(--color-border)',
                color: 'text.primary',
                '&:hover': {
                  borderColor: 'var(--color-border-strong)',
                  bgcolor: 'var(--color-hover)'
                }
              }}
            >
              Invite User
            </Button>
            <Button
              variant='contained'
              startIcon={<PersonAddIcon />}
              onClick={() => setNewUserDialogOpen(true)}
              sx={{
                textTransform: 'none',
                fontWeight: 600,
                height: 40,
                px: 2
              }}
            >
              Add User
            </Button>
          </Stack>
        </Box>
      </Box>

      <NewUserDialog newUserDialogOpen={newUserDialogOpen} onNewUserDialogClose={handleNewUserDialogClose} />
      <InviteUserDialog
        inviteUserDialogOpen={inviteUserDialogOpen}
        onInviteUserDialogClose={handleInviteUserDialogClose}
      />
    </>
  )
}
