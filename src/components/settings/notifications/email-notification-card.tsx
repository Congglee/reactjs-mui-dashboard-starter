import Box from '@mui/material/Box'
import Switch from '@mui/material/Switch'
import Typography from '@mui/material/Typography'

interface EmailNotificationCardProps {
  title: string
  description: string
  checked: boolean
  onChange: (checked: boolean) => void
}

export default function EmailNotificationCard({ title, description, checked, onChange }: EmailNotificationCardProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 2,
        p: 2,
        borderRadius: 1.5,
        border: '1px solid var(--color-border)',
        bgcolor: 'transparent'
      }}
    >
      <Box>
        <Typography
          sx={{
            fontSize: '0.875rem',
            fontWeight: 500,
            color: 'text.primary',
            mb: 0.25
          }}
        >
          {title}
        </Typography>
        <Typography
          variant='body2'
          sx={{
            color: 'text.secondary',
            fontSize: '0.8125rem',
            lineHeight: 1.5
          }}
        >
          {description}
        </Typography>
      </Box>
      <Switch
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        sx={{
          '& .MuiSwitch-switchBase': {
            '&.Mui-checked': {
              color: '#fff',
              '& + .MuiSwitch-track': {
                bgcolor: 'primary.main',
                opacity: 1
              }
            }
          },
          '& .MuiSwitch-track': {
            bgcolor: 'var(--color-border-strong)',
            opacity: 1
          }
        }}
      />
    </Box>
  )
}
