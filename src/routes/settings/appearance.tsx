import ThemePreviewCard from '@/components/settings/appearance/theme-preview-card'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import { useColorScheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import { useEffect, useState } from 'react'

interface AppearanceFormData {
  font: string
  theme: 'light' | 'dark'
}

const inputStyles = {
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
    color: 'text.primary',
    fontSize: '0.875rem',
    py: 1.25,
    px: 1.5
  },
  minWidth: 200
}

export default function Appearance() {
  const { mode, setMode } = useColorScheme()

  const [formData, setFormData] = useState<AppearanceFormData>({
    font: 'inter',
    theme: (mode === 'light' || mode === 'dark' ? mode : 'dark') as 'light' | 'dark'
  })

  useEffect(() => {
    if (mode === 'light' || mode === 'dark') {
      setFormData((prev) => ({ ...prev, theme: mode }))
    }
  }, [mode])

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setMode(formData.theme)
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
          Appearance
        </Typography>
        <Typography
          variant='body2'
          sx={{
            color: 'text.secondary',
            lineHeight: 1.5
          }}
        >
          Customize the appearance of the app. Automatically switch between day and night themes.
        </Typography>
      </Box>

      <Divider sx={{ borderColor: 'var(--color-border)', mb: 3 }} />

      <Box sx={{ mb: 3 }}>
        <Typography
          component='label'
          htmlFor='font'
          sx={{
            display: 'block',
            fontSize: '0.875rem',
            fontWeight: 500,
            color: 'text.primary',
            mb: 1
          }}
        >
          Font
        </Typography>
        <Select
          id='font'
          size='small'
          value={formData.font}
          onChange={(e) => setFormData((prev) => ({ ...prev, font: e.target.value }))}
          sx={inputStyles}
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
          <MenuItem value='inter'>Inter</MenuItem>
          <MenuItem value='roboto'>Roboto</MenuItem>
          <MenuItem value='system'>System</MenuItem>
          <MenuItem value='manrope'>Manrope</MenuItem>
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
          Set the font you want to use in the dashboard.
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
          Theme
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
          Select the theme for the dashboard.
        </Typography>

        <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
          <ThemePreviewCard
            variant='light'
            selected={formData.theme === 'light'}
            onClick={() => setFormData((prev) => ({ ...prev, theme: 'light' }))}
          />
          <ThemePreviewCard
            variant='dark'
            selected={formData.theme === 'dark'}
            onClick={() => setFormData((prev) => ({ ...prev, theme: 'dark' }))}
          />
        </Box>
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
        Update preferences
      </Button>
    </Box>
  )
}
