import { mockUserRoles } from '@/constants/mock-data'
import type { User, UserRole } from '@/types/mock-data.type'
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
import { useEffect, useState } from 'react'

interface UserFormData {
  firstName: string
  lastName: string
  username: string
  email: string
  phoneNumber: string
  role: UserRole | ''
  password: string
  confirmPassword: string
}

const initialFormData: UserFormData = {
  firstName: '',
  lastName: '',
  username: '',
  email: '',
  phoneNumber: '',
  role: '',
  password: '',
  confirmPassword: ''
}

interface EditUserDialogProps {
  editUserDialogOpen: boolean
  onEditUserDialogClose: () => void
  user: User | null
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

export default function EditUserDialog({ editUserDialogOpen, onEditUserDialogClose, user }: EditUserDialogProps) {
  const [formData, setFormData] = useState<UserFormData>(initialFormData)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const handlePasswordVisibilityToggle = () => {
    setShowPassword((prev) => !prev)
  }

  const handleConfirmPasswordVisibilityToggle = () => {
    setShowConfirmPassword((prev) => !prev)
  }

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || user.name.split(' ')[0] || '',
        lastName: user.lastName || user.name.split(' ').slice(1).join(' ') || '',
        username: user.username,
        email: user.email,
        phoneNumber: user.phoneNumber,
        role: user.role,
        password: '',
        confirmPassword: ''
      })
    } else {
      setFormData(initialFormData)
    }
  }, [user, editUserDialogOpen])

  return (
    <Dialog
      open={editUserDialogOpen}
      onClose={onEditUserDialogClose}
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
            Edit User
          </Typography>
          <Typography variant='body2' color='text.secondary' sx={{ mt: 0.5 }}>
            Modify user details below. Click save when you&apos;re done.
          </Typography>
        </Box>
        <IconButton onClick={onEditUserDialogClose} size='small' sx={{ color: 'text.secondary' }}>
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
            <TextField
              fullWidth
              placeholder='John'
              variant='outlined'
              size='small'
              sx={inputStyles}
              value={formData.firstName}
              onChange={(e) => setFormData((prev) => ({ ...prev, firstName: e.target.value }))}
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
              Last Name
            </FormLabel>
            <TextField
              fullWidth
              placeholder='Doe'
              variant='outlined'
              size='small'
              sx={inputStyles}
              value={formData.lastName}
              onChange={(e) => setFormData((prev) => ({ ...prev, lastName: e.target.value }))}
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
              Username
            </FormLabel>
            <TextField
              fullWidth
              placeholder='john_doe'
              variant='outlined'
              size='small'
              sx={inputStyles}
              value={formData.username}
              onChange={(e) => setFormData((prev) => ({ ...prev, username: e.target.value }))}
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
              Email
            </FormLabel>
            <TextField
              fullWidth
              placeholder='john.doe@gmail.com'
              variant='outlined'
              size='small'
              type='email'
              sx={inputStyles}
              value={formData.email}
              onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
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
            <TextField
              fullWidth
              placeholder='+123456789'
              variant='outlined'
              size='small'
              type='tel'
              sx={inputStyles}
              value={formData.phoneNumber}
              onChange={(e) => setFormData((prev) => ({ ...prev, phoneNumber: e.target.value }))}
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
              Role
            </FormLabel>
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Select
                fullWidth
                displayEmpty
                size='small'
                value={formData.role}
                onChange={(e) => setFormData((prev) => ({ ...prev, role: e.target.value as UserRole }))}
                sx={{
                  flex: 1,
                  minWidth: 0,
                  width: '100%',
                  bgcolor: 'var(--color-card-elevated)',
                  '& .MuiOutlinedInput-notchedOutline': { borderColor: 'var(--color-border)' },
                  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'var(--color-border-strong)' },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'primary.main' },
                  '& .MuiSelect-select': { color: formData.role ? 'text.primary' : 'text.secondary' }
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
              value={formData.password}
              onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
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
              value={formData.confirmPassword}
              onChange={(e) => setFormData((prev) => ({ ...prev, confirmPassword: e.target.value }))}
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
