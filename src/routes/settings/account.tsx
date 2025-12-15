import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { useState } from 'react'
import type { Dayjs } from 'dayjs'

interface AccountFormData {
  name: string
  dateOfBirth: Dayjs | null
  language: string
}

const initialFormData: AccountFormData = {
  name: '',
  dateOfBirth: null,
  language: ''
}

const inputStyles = {
  '& .MuiOutlinedInput-root': {
    bgcolor: 'var(--color-card-bg)',
    borderRadius: 1.5,
    '& fieldset': {
      borderColor: 'var(--color-border)'
    },
    '&:hover fieldset': {
      borderColor: 'var(--color-border-strong)'
    },
    '&.Mui-focused fieldset': {
      borderColor: 'primary.main',
      borderWidth: 1
    }
  },
  '& .MuiInputBase-input': {
    color: 'text.primary',
    fontSize: '0.875rem',
    py: 1.25,
    px: 1.5,
    '&::placeholder': {
      color: 'text.secondary',
      opacity: 1
    }
  }
}

export default function Account() {
  const [formData, setFormData] = useState<AccountFormData>(initialFormData)

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Account form submitted:', formData)
  }

  return (
    <Box component='form' onSubmit={onSubmit} sx={{ maxWidth: { xs: '100%', lg: 680 }, width: '100%' }}>
      <Box sx={{ mb: 3 }}>
        <Typography
          variant='h1'
          sx={{
            fontSize: '1.375rem',
            fontWeight: 600,
            lineHeight: 1.4,
            color: 'text.primary',
            mb: 0.5
          }}
        >
          Account
        </Typography>
        <Typography
          variant='body2'
          sx={{
            color: 'text.secondary',
            lineHeight: 1.5
          }}
        >
          Update your account settings. Set your preferred language and timezone.
        </Typography>
      </Box>

      <Divider sx={{ borderColor: 'var(--color-border)', mb: 3 }} />

      <Box sx={{ mb: 3 }}>
        <Typography
          component='label'
          htmlFor='name'
          sx={{
            display: 'block',
            fontSize: '0.875rem',
            fontWeight: 500,
            color: 'text.primary',
            mb: 1
          }}
        >
          Name
        </Typography>
        <TextField
          id='name'
          fullWidth
          size='small'
          value={formData.name}
          onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
          placeholder='Your name'
          sx={inputStyles}
        />
        <Typography
          variant='body2'
          sx={{
            color: 'text.secondary',
            fontSize: '0.8125rem',
            mt: 1,
            lineHeight: 1.5
          }}
        >
          This is the name that will be displayed on your profile and in emails.
        </Typography>
      </Box>

      <Box sx={{ mb: 3 }}>
        <Typography
          component='label'
          htmlFor='dob'
          sx={{
            display: 'block',
            fontSize: '0.875rem',
            fontWeight: 500,
            color: 'text.primary',
            mb: 1
          }}
        >
          Date of birth
        </Typography>
        <DatePicker
          value={formData.dateOfBirth}
          onChange={(newValue) => setFormData((prev) => ({ ...prev, dateOfBirth: newValue }))}
          slotProps={{
            textField: {
              id: 'dob',
              size: 'small',
              placeholder: 'Pick a date',
              sx: {
                ...inputStyles,
                width: 'auto',
                minWidth: 200
              }
            },
            openPickerButton: {
              sx: {
                color: 'text.secondary'
              }
            },
            popper: {
              sx: {
                '& .MuiPaper-root': {
                  bgcolor: 'var(--color-card-bg)',
                  border: '1px solid var(--color-border)'
                }
              }
            }
          }}
        />
        <Typography
          variant='body2'
          sx={{
            color: 'text.secondary',
            fontSize: '0.8125rem',
            mt: 1,
            lineHeight: 1.5
          }}
        >
          Your date of birth is used to calculate your age.
        </Typography>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography
          component='label'
          htmlFor='language'
          sx={{
            display: 'block',
            fontSize: '0.875rem',
            fontWeight: 500,
            color: 'text.primary',
            mb: 1
          }}
        >
          Language
        </Typography>
        <Select
          id='language'
          size='small'
          value={formData.language}
          onChange={(e) => setFormData((prev) => ({ ...prev, language: e.target.value }))}
          displayEmpty
          sx={{
            bgcolor: 'var(--color-card-bg)',
            borderRadius: 1.5,
            '& fieldset': {
              borderColor: 'var(--color-border)'
            },
            '&:hover fieldset': {
              borderColor: 'var(--color-border-strong)'
            },
            '&.Mui-focused fieldset': {
              borderColor: 'primary.main',
              borderWidth: 1
            },
            '& .MuiSelect-select': {
              color: 'text.secondary',
              fontSize: '0.875rem',
              py: 1.25,
              px: 1.5
            },
            minWidth: 200
          }}
          MenuProps={{
            PaperProps: {
              sx: {
                bgcolor: 'var(--color-card-bg)',
                border: '1px solid var(--color-border)',
                '& .MuiMenuItem-root': {
                  fontSize: '0.875rem',
                  '&:hover': {
                    bgcolor: 'var(--color-hover)'
                  },
                  '&.Mui-selected': {
                    bgcolor: 'var(--color-selected)',
                    '&:hover': {
                      bgcolor: 'var(--color-selected)'
                    }
                  }
                }
              }
            }
          }}
        >
          <MenuItem value='' disabled>
            Select language
          </MenuItem>
          <MenuItem value='en'>English</MenuItem>
          <MenuItem value='vi'>Vietnamese</MenuItem>
          <MenuItem value='fr'>French</MenuItem>
          <MenuItem value='de'>German</MenuItem>
          <MenuItem value='es'>Spanish</MenuItem>
          <MenuItem value='ja'>Japanese</MenuItem>
          <MenuItem value='ko'>Korean</MenuItem>
          <MenuItem value='zh'>Chinese</MenuItem>
        </Select>
        <Typography
          variant='body2'
          sx={{
            color: 'text.secondary',
            fontSize: '0.8125rem',
            mt: 1,
            lineHeight: 1.5
          }}
        >
          This is the language that will be used in the dashboard.
        </Typography>
      </Box>

      <Button
        type='submit'
        variant='contained'
        disableElevation
        sx={[
          {
            textTransform: 'none',
            fontWeight: 500,
            fontSize: '0.875rem',
            borderRadius: 1.5,
            px: 2.5,
            py: 1,
            bgcolor: 'text.primary',
            color: 'background.default',
            '&:hover': {
              bgcolor: 'text.secondary'
            }
          },
          (theme) =>
            theme.applyStyles('dark', {
              bgcolor: '#e8eaed',
              color: '#121621',
              '&:hover': {
                bgcolor: '#d1d5db'
              }
            })
        ]}
      >
        Update account
      </Button>
    </Box>
  )
}
