import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Typography from '@mui/material/Typography'
import { alpha } from '@mui/material/styles'

interface DeleteTaskDialogProps {
  deleteTaskDialogOpen: boolean
  onDeleteTaskDialogClose: () => void
  onDeleteTaskConfirm: () => void
  taskId?: string
}

export default function DeleteTaskDialog({
  deleteTaskDialogOpen,
  onDeleteTaskDialogClose,
  onDeleteTaskConfirm,
  taskId
}: DeleteTaskDialogProps) {
  return (
    <Dialog
      open={deleteTaskDialogOpen}
      onClose={onDeleteTaskDialogClose}
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
            maxWidth: '480px',
            p: 1
          }
        }
        // backdrop: {
        //   sx: {
        //     backgroundColor: 'rgba(0, 0, 0, 0.5)',
        //     backdropFilter: 'blur(4px)'
        //   }
        // }
      }}
    >
      <DialogTitle sx={{ pt: 2, pb: 1, px: 3 }}>
        <Typography variant='h6' component='div' sx={{ fontWeight: 700, fontSize: '1.25rem' }}>
          Delete this task: {taskId} ?
        </Typography>
      </DialogTitle>

      <DialogContent sx={{ pb: 3, px: 3 }}>
        <Typography variant='body1' color='text.secondary' sx={{ lineHeight: 1.6 }}>
          You are about to delete a task with the ID{' '}
          <Box component='span' sx={{ color: 'text.primary', fontWeight: 700 }}>
            {taskId}
          </Box>
          . This action cannot be undone.
        </Typography>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button
          variant='outlined'
          onClick={onDeleteTaskDialogClose}
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
          onClick={onDeleteTaskConfirm}
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
