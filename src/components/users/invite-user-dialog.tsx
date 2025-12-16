import { mockUserRoles } from '@/constants/mock-data'
import CloseIcon from '@mui/icons-material/Close'
import MailOutlineIcon from '@mui/icons-material/MailOutline'
import SendIcon from '@mui/icons-material/Send'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import FormLabel from '@mui/material/FormLabel'
import IconButton from '@mui/material/IconButton'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

interface InviteUserDialogProps {
  inviteUserDialogOpen: boolean
  onInviteUserDialogClose: () => void
}

const inputStyles = {
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
}

export default function InviteUserDialog({ inviteUserDialogOpen, onInviteUserDialogClose }: InviteUserDialogProps) {
  return (
    <Dialog
      open={inviteUserDialogOpen}
      onClose={onInviteUserDialogClose}
      maxWidth='sm'
      fullWidth
      slotProps={{
        paper: {
          sx: {
            bgcolor: 'background.paper',
            backgroundImage: 'none',
            borderRadius: 2.5,
            maxWidth: 560
          }
        }
      }}
    >
      <Box sx={{ p: 3, pb: 0 }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <MailOutlineIcon sx={{ color: 'text.primary', fontSize: 24 }} />
            <Typography variant='h6' component='h2' sx={{ fontWeight: 600, color: 'text.primary' }}>
              Invite User
            </Typography>
          </Box>
          <IconButton
            onClick={onInviteUserDialogClose}
            size='small'
            sx={{ color: 'text.secondary', mt: -0.5, mr: -0.5 }}
          >
            <CloseIcon fontSize='small' />
          </IconButton>
        </Box>
        <Typography variant='body2' color='text.secondary' sx={{ mt: 1.5, lineHeight: 1.5, pr: 4 }}>
          Invite new user to join your team by sending them an email invitation. Assign a role to define their access
          level.
        </Typography>
      </Box>

      <DialogContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
          <Box>
            <FormLabel
              sx={{
                fontWeight: 500,
                color: 'text.primary',
                fontSize: '0.875rem',
                mb: 1,
                display: 'block'
              }}
            >
              Email
            </FormLabel>
            <TextField
              fullWidth
              placeholder='eg: john.doe@gmail.com'
              variant='outlined'
              size='small'
              type='email'
              sx={inputStyles}
            />
          </Box>

          <Box>
            <FormLabel
              sx={{
                fontWeight: 500,
                color: 'text.primary',
                fontSize: '0.875rem',
                mb: 1,
                display: 'block'
              }}
            >
              Role
            </FormLabel>
            <Select
              fullWidth
              displayEmpty
              defaultValue=''
              size='small'
              sx={{
                bgcolor: 'var(--color-card-elevated)',
                '& .MuiOutlinedInput-notchedOutline': { borderColor: 'var(--color-border)' },
                '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'var(--color-border-strong)' },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'primary.main' },
                '& .MuiSelect-select': { color: 'text.secondary' }
              }}
            >
              <MenuItem value='' disabled>
                Select a role
              </MenuItem>
              {mockUserRoles.map((role) => (
                <MenuItem key={role} value={role}>
                  {role}
                </MenuItem>
              ))}
            </Select>
          </Box>

          <Box>
            <FormLabel
              sx={{
                fontWeight: 500,
                color: 'text.primary',
                fontSize: '0.875rem',
                mb: 1,
                display: 'block'
              }}
            >
              Description (optional)
            </FormLabel>
            <TextField
              fullWidth
              placeholder='Add a personal note to your invitation (optional)'
              variant='outlined'
              size='small'
              multiline
              rows={3}
              sx={inputStyles}
            />
          </Box>
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'flex-end',
            gap: 1.5,
            mt: 3
          }}
        >
          <Button
            variant='outlined'
            onClick={onInviteUserDialogClose}
            sx={{
              textTransform: 'none',
              fontWeight: 600,
              px: 3,
              borderColor: 'var(--color-border)',
              color: 'text.primary',
              '&:hover': {
                borderColor: 'var(--color-border-strong)',
                bgcolor: 'var(--color-hover)'
              }
            }}
          >
            Cancel
          </Button>
          <Button
            variant='contained'
            endIcon={<SendIcon sx={{ fontSize: '1rem !important' }} />}
            sx={{ textTransform: 'none', fontWeight: 600, px: 3 }}
          >
            Invite
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  )
}
