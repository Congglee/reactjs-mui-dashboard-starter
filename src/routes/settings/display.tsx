import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import Divider from '@mui/material/Divider'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import Typography from '@mui/material/Typography'
import { useState } from 'react'

interface DisplayFormData {
  recents: boolean
  home: boolean
  applications: boolean
  desktop: boolean
  downloads: boolean
  documents: boolean
}

const initialFormData: DisplayFormData = {
  recents: true,
  home: true,
  applications: true,
  desktop: false,
  downloads: false,
  documents: false
}

const sidebarItems = [
  { key: 'recents', label: 'Recents' },
  { key: 'home', label: 'Home' },
  { key: 'applications', label: 'Applications' },
  { key: 'desktop', label: 'Desktop' },
  { key: 'downloads', label: 'Downloads' },
  { key: 'documents', label: 'Documents' }
] as const

export default function Display() {
  const [formData, setFormData] = useState<DisplayFormData>(initialFormData)

  const handleChange = (key: keyof DisplayFormData) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [key]: event.target.checked }))
  }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Display form submitted:', formData)
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
          Display
        </Typography>
        <Typography
          variant='body2'
          sx={{
            color: 'text.secondary',
            lineHeight: 1.5
          }}
        >
          Turn items on or off to control what&apos;s displayed in the app.
        </Typography>
      </Box>

      <Divider sx={{ borderColor: 'var(--color-border)', mb: 3 }} />

      <Box sx={{ mb: 4 }}>
        <Typography
          sx={{
            fontSize: '0.9375rem',
            fontWeight: 600,
            color: 'text.primary',
            mb: 0.5
          }}
        >
          Sidebar
        </Typography>
        <Typography
          variant='body2'
          sx={{
            color: 'text.secondary',
            fontSize: '0.8125rem',
            mb: 2,
            lineHeight: 1.5
          }}
        >
          Select the items you want to display in the sidebar.
        </Typography>

        <FormGroup sx={{ gap: 0.5 }}>
          {sidebarItems.map((item) => (
            <FormControlLabel
              key={item.key}
              control={
                <Checkbox
                  checked={formData[item.key]}
                  onChange={handleChange(item.key)}
                  size='small'
                  sx={{
                    color: 'var(--color-border-strong)',
                    '&.Mui-checked': {
                      color: 'primary.main'
                    },
                    py: 0.5
                  }}
                />
              }
              label={item.label}
              sx={{
                '& .MuiFormControlLabel-label': {
                  fontSize: '0.875rem',
                  color: 'text.primary'
                }
              }}
            />
          ))}
        </FormGroup>
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
        Update display
      </Button>
    </Box>
  )
}
