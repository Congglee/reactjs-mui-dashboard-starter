import type { User } from '@/types/mock-data.type'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import FormLabel from '@mui/material/FormLabel'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { alpha } from '@mui/material/styles'
import { useEffect, useState } from 'react'

interface DeleteUserDialogProps {
  deleteUserDialogOpen: boolean
  onDeleteUserDialogClose: () => void
  onDeleteUserConfirm: () => void
  user: User | null
}

export default function DeleteUserDialog({
  deleteUserDialogOpen,
  onDeleteUserDialogClose,
  onDeleteUserConfirm,
  user
}: DeleteUserDialogProps) {
  const [confirmUsername, setConfirmUsername] = useState('')

  useEffect(() => {
    if (!deleteUserDialogOpen) {
      setConfirmUsername('')
    }
  }, [deleteUserDialogOpen])

  const isConfirmDisabled = confirmUsername !== user?.username

  return (
    <Dialog
      open={deleteUserDialogOpen}
      onClose={onDeleteUserDialogClose}
      maxWidth='sm'
      fullWidth
      slotProps={{
        paper: {
          sx: {
            borderRadius: 2.5,
            backgroundImage: 'none',
            bgcolor: 'background.paper',
            border: '1px solid',
            borderColor: 'divider',
            maxWidth: '520px',
            p: 1
          }
        }
      }}
    >
      <DialogTitle sx={{ pt: 2, pb: 1, px: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <WarningAmberIcon sx={{ color: 'error.main', fontSize: '1.5rem' }} />
          <Typography variant='h6' component='div' sx={{ fontWeight: 700, fontSize: '1.25rem', color: 'error.main' }}>
            Delete User
          </Typography>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ pb: 2, px: 3 }}>
        <Typography variant='body1' color='text.secondary' sx={{ lineHeight: 1.6, mb: 0.5 }}>
          Are you sure you want to delete{' '}
          <Box component='span' sx={{ color: 'text.primary', fontWeight: 700 }}>
            {user?.username}
          </Box>
          ?
        </Typography>
        <Typography variant='body1' color='text.secondary' sx={{ lineHeight: 1.6, mb: 3 }}>
          This action will permanently remove the user with the role of{' '}
          <Box component='span' sx={{ color: 'text.primary', fontWeight: 700, textTransform: 'uppercase' }}>
            {user?.role}
          </Box>{' '}
          from the system. This cannot be undone.
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2.5 }}>
          <FormLabel
            sx={{
              fontWeight: 500,
              color: 'text.primary',
              fontSize: '0.875rem',
              flexShrink: 0
            }}
          >
            Username:
          </FormLabel>
          <TextField
            fullWidth
            placeholder='Enter username to confirm deletion.'
            variant='outlined'
            size='small'
            value={confirmUsername}
            onChange={(e) => setConfirmUsername(e.target.value)}
            sx={{
              '& .MuiOutlinedInput-root': {
                bgcolor: 'var(--color-card-elevated)',
                '& fieldset': {
                  borderColor: 'var(--color-border)'
                },
                '&:hover fieldset': {
                  borderColor: 'var(--color-border-strong)'
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'primary.main'
                }
              },
              '& .MuiOutlinedInput-input': {
                color: 'text.primary',
                '&::placeholder': {
                  color: 'text.secondary',
                  opacity: 1
                }
              }
            }}
          />
        </Box>

        <Box
          sx={{
            bgcolor: (theme) => alpha(theme.palette.error.main, 0.08),
            border: '1px solid',
            borderColor: (theme) => alpha(theme.palette.error.main, 0.2),
            borderRadius: 2,
            p: 2
          }}
        >
          <Typography variant='body2' sx={{ fontWeight: 700, color: 'error.main', mb: 0.5 }}>
            Warning!
          </Typography>
          <Typography variant='body2' sx={{ color: 'error.main', opacity: 0.85 }}>
            Please be careful, this operation can not be rolled back.
          </Typography>
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button
          variant='outlined'
          onClick={onDeleteUserDialogClose}
          sx={{
            borderRadius: '12px',
            textTransform: 'none',
            fontSize: '0.95rem',
            fontWeight: 600,
            padding: '8px 24px',
            color: 'text.primary',
            borderColor: 'divider',
            bgcolor: (theme) => alpha(theme.palette.background.default, 0.5),
            '&:hover': {
              borderColor: 'text.secondary',
              bgcolor: 'action.hover'
            }
          }}
        >
          Cancel
        </Button>
        <Button
          variant='contained'
          color='error'
          onClick={onDeleteUserConfirm}
          disabled={isConfirmDisabled}
          disableElevation
          sx={{
            borderRadius: '12px',
            textTransform: 'none',
            fontSize: '0.95rem',
            fontWeight: 600,
            padding: '8px 24px'
          }}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  )
}
