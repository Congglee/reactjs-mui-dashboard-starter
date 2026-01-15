import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

interface ThemePreviewCardProps {
  variant: 'light' | 'dark'
  selected: boolean
  onThemePreviewToggle: () => void
}

export default function ThemePreviewCard({ variant, selected, onThemePreviewToggle }: ThemePreviewCardProps) {
  const isLight = variant === 'light'

  return (
    <Box
      onClick={onThemePreviewToggle}
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        cursor: 'pointer'
      }}
    >
      <Box
        sx={[
          {
            width: 160,
            height: 110,
            borderRadius: 2,
            border: '2px solid',
            borderColor: selected ? 'primary.main' : 'var(--color-border)',
            bgcolor: isLight ? '#ffffff' : '#1e2532',
            p: 1.5,
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            transition: 'border-color 0.15s ease',
            '&:hover': {
              borderColor: selected ? 'primary.main' : 'var(--color-border-strong)'
            }
          }
        ]}
      >
        <Box
          sx={{
            width: '70%',
            height: 8,
            borderRadius: 0.5,
            bgcolor: isLight ? '#e0e0e0' : '#4a5568'
          }}
        />
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
          <Box
            sx={{
              width: 14,
              height: 14,
              borderRadius: '50%',
              bgcolor: isLight ? '#e0e0e0' : '#4a5568'
            }}
          />
          <Box
            sx={{
              flex: 1,
              height: 8,
              borderRadius: 0.5,
              bgcolor: isLight ? '#e0e0e0' : '#a0aec0'
            }}
          />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
          <Box
            sx={{
              width: 14,
              height: 14,
              borderRadius: '50%',
              bgcolor: isLight ? '#e0e0e0' : '#4a5568'
            }}
          />
          <Box
            sx={{
              flex: 1,
              height: 8,
              borderRadius: 0.5,
              bgcolor: isLight ? '#e0e0e0' : '#a0aec0'
            }}
          />
        </Box>
      </Box>
      <Typography
        variant='body2'
        sx={{
          fontWeight: selected ? 600 : 400,
          color: 'text.primary'
        }}
      >
        {isLight ? 'Light' : 'Dark'}
      </Typography>
    </Box>
  )
}
