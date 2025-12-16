import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import AddIcon from '@mui/icons-material/Add'
import { useState } from 'react'

interface ProfileFormData {
  username: string
  email: string
  bio: string
  urls: string[]
}

const initialFormData: ProfileFormData = {
  username: 'mui',
  email: '',
  bio: 'I own a computer.',
  urls: ['https://mui.com/material-ui/', 'https://github.com/mui/material-ui']
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

export default function ProfileForm() {
  const [formData, setFormData] = useState<ProfileFormData>(initialFormData)

  const handleAddUrl = () => {
    setFormData((prev) => ({
      ...prev,
      urls: [...prev.urls, '']
    }))
  }

  const handleUrlChange = (index: number, value: string) => {
    setFormData((prev) => ({
      ...prev,
      urls: prev.urls.map((url, i) => (i === index ? value : url))
    }))
  }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Profile form submitted:', formData)
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
          Profile
        </Typography>
        <Typography
          variant='body2'
          sx={{
            color: 'text.secondary',
            lineHeight: 1.5
          }}
        >
          This is how others will see you on the site.
        </Typography>
      </Box>

      <Divider sx={{ borderColor: 'var(--color-border)', mb: 3 }} />

      <Box sx={{ mb: 3 }}>
        <Typography
          component='label'
          htmlFor='username'
          sx={{
            display: 'block',
            fontSize: '0.875rem',
            fontWeight: 500,
            color: 'text.primary',
            mb: 1
          }}
        >
          Username
        </Typography>
        <TextField
          id='username'
          fullWidth
          size='small'
          value={formData.username}
          onChange={(e) => setFormData((prev) => ({ ...prev, username: e.target.value }))}
          placeholder='shadcn'
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
          This is your public display name. It can be your real name or a pseudonym. You can only change this once every
          30 days.
        </Typography>
      </Box>

      <Box sx={{ mb: 3 }}>
        <Typography
          component='label'
          htmlFor='email'
          sx={{
            display: 'block',
            fontSize: '0.875rem',
            fontWeight: 500,
            color: 'text.primary',
            mb: 1
          }}
        >
          Email
        </Typography>
        <Select
          id='email'
          fullWidth
          size='small'
          value={formData.email}
          onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
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
            }
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
            Select a verified email to display
          </MenuItem>
          <MenuItem value='m@example.com'>m@example.com</MenuItem>
          <MenuItem value='m@google.com'>m@google.com</MenuItem>
          <MenuItem value='m@support.com'>m@support.com</MenuItem>
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
          You can manage verified email addresses in your email settings.
        </Typography>
      </Box>

      <Box sx={{ mb: 3 }}>
        <Typography
          component='label'
          htmlFor='bio'
          sx={{
            display: 'block',
            fontSize: '0.875rem',
            fontWeight: 500,
            color: 'text.primary',
            mb: 1
          }}
        >
          Bio
        </Typography>
        <TextField
          id='bio'
          fullWidth
          multiline
          rows={3}
          value={formData.bio}
          onChange={(e) => setFormData((prev) => ({ ...prev, bio: e.target.value }))}
          placeholder='Tell us a little bit about yourself'
          sx={{
            ...inputStyles,
            '& .MuiInputBase-input': {
              color: 'text.primary',
              fontSize: '0.875rem',
              lineHeight: 1.4,
              '&::placeholder': {
                color: 'text.secondary',
                opacity: 1
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
          You can @mention other users and organizations to link to them.
        </Typography>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography
          sx={{
            display: 'block',
            fontSize: '0.875rem',
            fontWeight: 500,
            color: 'text.primary',
            mb: 0.5
          }}
        >
          URLs
        </Typography>
        <Typography
          variant='body2'
          sx={{
            color: 'text.secondary',
            fontSize: '0.8125rem',
            mb: 1.5,
            lineHeight: 1.5
          }}
        >
          Add links to your website, blog, or social media profiles.
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25 }}>
          {formData.urls.map((url, index) => (
            <TextField
              key={index}
              fullWidth
              size='small'
              value={url}
              onChange={(e) => handleUrlChange(index, e.target.value)}
              placeholder='https://example.com'
              sx={inputStyles}
            />
          ))}
        </Box>

        <Button
          variant='outlined'
          size='small'
          startIcon={<AddIcon sx={{ fontSize: 16 }} />}
          onClick={handleAddUrl}
          sx={{
            mt: 1.5,
            textTransform: 'none',
            fontWeight: 500,
            fontSize: '0.8125rem',
            borderRadius: 1.5,
            borderColor: 'var(--color-border)',
            color: 'text.primary',
            px: 1.5,
            py: 0.625,
            '&:hover': {
              borderColor: 'var(--color-border-strong)',
              bgcolor: 'var(--color-hover)'
            }
          }}
        >
          Add URL
        </Button>
      </Box>

      <Button
        type='submit'
        variant='contained'
        disableElevation
        sx={[
          {
            mt: 2,
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
        Update profile
      </Button>
    </Box>
  )
}
