import { mockUserRoles } from '@/constants/mock-data'
import CloseIcon from '@mui/icons-material/Close'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import FormLabel from '@mui/material/FormLabel'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { useState } from 'react'

interface NewUserDialogProps {
  newUserDialogOpen: boolean
  onNewUserDialogClose: () => void
}

const inputStyles = {
  flex: 1,
  minWidth: 0,
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

export default function NewUserDialog({ newUserDialogOpen, onNewUserDialogClose }: NewUserDialogProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const handlePasswordVisibilityToggle = () => {
    setShowPassword((prev) => !prev)
  }

  const handleConfirmPasswordVisibilityToggle = () => {
    setShowConfirmPassword((prev) => !prev)
  }

  return (
    <Dialog
      open={newUserDialogOpen}
      onClose={onNewUserDialogClose}
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
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', p: 3, pb: 0 }}>
        <Box>
          <Typography variant='h6' component='h2' sx={{ fontWeight: 600, color: 'text.primary' }}>
            Add New User
          </Typography>
          <Typography variant='body2' color='text.secondary' sx={{ mt: 0.5 }}>
            Create new user here. Click save when you're done.
          </Typography>
        </Box>
        <IconButton onClick={onNewUserDialogClose} size='small' sx={{ color: 'text.secondary' }}>
          <CloseIcon fontSize='small' />
        </IconButton>
      </Box>

      <DialogContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1.5, sm: 3 } }}>
            <FormLabel
              sx={{
                fontWeight: 500,
                color: 'text.primary',
                fontSize: '0.875rem',
                minWidth: { xs: 80, sm: 140 },
                flexShrink: 0,
                textAlign: { xs: 'end', sm: 'start' }
              }}
            >
              First Name
            </FormLabel>
            <TextField fullWidth placeholder='John' variant='outlined' size='small' sx={inputStyles} />
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1.5, sm: 3 } }}>
            <FormLabel
              sx={{
                fontWeight: 500,
                color: 'text.primary',
                fontSize: '0.875rem',
                minWidth: { xs: 80, sm: 140 },
                flexShrink: 0,
                textAlign: { xs: 'end', sm: 'start' }
              }}
            >
              Last Name
            </FormLabel>
            <TextField fullWidth placeholder='Doe' variant='outlined' size='small' sx={inputStyles} />
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1.5, sm: 3 } }}>
            <FormLabel
              sx={{
                fontWeight: 500,
                color: 'text.primary',
                fontSize: '0.875rem',
                minWidth: { xs: 80, sm: 140 },
                flexShrink: 0,
                textAlign: { xs: 'end', sm: 'start' }
              }}
            >
              Username
            </FormLabel>
            <TextField fullWidth placeholder='john_doe' variant='outlined' size='small' sx={inputStyles} />
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1.5, sm: 3 } }}>
            <FormLabel
              sx={{
                fontWeight: 500,
                color: 'text.primary',
                fontSize: '0.875rem',
                minWidth: { xs: 80, sm: 140 },
                flexShrink: 0,
                textAlign: { xs: 'end', sm: 'start' }
              }}
            >
              Email
            </FormLabel>
            <TextField
              fullWidth
              placeholder='john.doe@gmail.com'
              variant='outlined'
              size='small'
              type='email'
              sx={inputStyles}
            />
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1.5, sm: 3 } }}>
            <FormLabel
              sx={{
                fontWeight: 500,
                color: 'text.primary',
                fontSize: '0.875rem',
                minWidth: { xs: 80, sm: 140 },
                flexShrink: 0,
                textAlign: { xs: 'end', sm: 'start' }
              }}
            >
              Phone Number
            </FormLabel>
            <TextField fullWidth placeholder='+123456789' variant='outlined' size='small' type='tel' sx={inputStyles} />
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1.5, sm: 3 } }}>
            <FormLabel
              sx={{
                fontWeight: 500,
                color: 'text.primary',
                fontSize: '0.875rem',
                minWidth: { xs: 80, sm: 140 },
                flexShrink: 0,
                textAlign: { xs: 'end', sm: 'start' }
              }}
            >
              Role
            </FormLabel>
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Select
                fullWidth
                displayEmpty
                defaultValue=''
                size='small'
                sx={{
                  flex: 1,
                  minWidth: 0,
                  width: '100%',
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
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1.5, sm: 3 } }}>
            <FormLabel
              sx={{
                fontWeight: 500,
                color: 'text.primary',
                fontSize: '0.875rem',
                minWidth: { xs: 80, sm: 140 },
                flexShrink: 0,
                textAlign: { xs: 'end', sm: 'start' }
              }}
            >
              Password
            </FormLabel>
            <TextField
              fullWidth
              placeholder='e.g., S3cur3P@ssw0rd'
              variant='outlined'
              size='small'
              type={showPassword ? 'text' : 'password'}
              sx={inputStyles}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton
                        onClick={handlePasswordVisibilityToggle}
                        edge='end'
                        size='small'
                        sx={{ color: 'text.secondary' }}
                      >
                        {showPassword ? <VisibilityIcon fontSize='small' /> : <VisibilityOffIcon fontSize='small' />}
                      </IconButton>
                    </InputAdornment>
                  )
                }
              }}
            />
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1.5, sm: 3 } }}>
            <FormLabel
              sx={{
                fontWeight: 500,
                color: 'text.primary',
                fontSize: '0.875rem',
                minWidth: { xs: 80, sm: 140 },
                flexShrink: 0,
                textAlign: { xs: 'end', sm: 'start' }
              }}
            >
              Confirm Password
            </FormLabel>
            <TextField
              fullWidth
              placeholder='e.g., S3cur3P@ssw0rd'
              variant='outlined'
              size='small'
              type={showConfirmPassword ? 'text' : 'password'}
              sx={inputStyles}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton
                        onClick={handleConfirmPasswordVisibilityToggle}
                        edge='end'
                        size='small'
                        sx={{ color: 'text.secondary' }}
                      >
                        {showConfirmPassword ? (
                          <VisibilityIcon fontSize='small' />
                        ) : (
                          <VisibilityOffIcon fontSize='small' />
                        )}
                      </IconButton>
                    </InputAdornment>
                  )
                }
              }}
            />
          </Box>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
          <Button
            variant='contained'
            sx={{ textTransform: 'none', fontWeight: 600, px: 3, width: { xs: '100%', sm: 'auto' } }}
          >
            Save changes
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  )
}
