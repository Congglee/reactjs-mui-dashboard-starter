import type { ReferrerData } from '@/types/mock-data.type'
import Box from '@mui/material/Box'
import LinearProgress from '@mui/material/LinearProgress'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

interface ReferrersCardProps {
  title: string
  subtitle: string
  data: ReferrerData[]
  maxVisits: number
}

export default function ReferrersCard({ title, subtitle, data, maxVisits }: ReferrersCardProps) {
  return (
    <Paper
      sx={[
        {
          p: 2.5,
          height: '100%',
          border: '1px solid var(--color-border)',
          borderRadius: 1.5,
          bgcolor: 'background.default',
          boxShadow: '0 2px 14px rgba(0,0,0,0.06)'
        },
        (theme) =>
          theme.applyStyles('dark', {
            boxShadow: '0 4px 20px rgba(0,0,0,0.5)'
          })
      ]}
    >
      <Typography
        variant='subtitle1'
        sx={{
          fontWeight: 700,
          color: 'text.primary',
          mb: 0.5
        }}
      >
        {title}
      </Typography>
      <Typography
        variant='body2'
        sx={{
          color: 'text.secondary',
          mb: 3
        }}
      >
        {subtitle}
      </Typography>

      <Stack spacing={2.5}>
        {data.map((referrer) => {
          const percentage = (referrer.visits / maxVisits) * 100

          return (
            <Box key={referrer.id}>
              <Stack direction='row' justifyContent='space-between' alignItems='center' sx={{ mb: 0.75 }}>
                <Typography
                  variant='body2'
                  sx={{
                    fontWeight: 500,
                    color: 'text.primary'
                  }}
                >
                  {referrer.source}
                </Typography>
                <Typography
                  variant='body2'
                  sx={{
                    fontWeight: 600,
                    color: 'text.secondary'
                  }}
                >
                  {referrer.visits.toLocaleString()}
                </Typography>
              </Stack>
              <LinearProgress
                variant='determinate'
                value={percentage}
                sx={[
                  {
                    height: 6,
                    borderRadius: 3,
                    bgcolor: 'var(--color-border)',
                    '& .MuiLinearProgress-bar': {
                      borderRadius: 3,
                      bgcolor: referrer.color
                    }
                  }
                ]}
              />
            </Box>
          )
        })}
      </Stack>
    </Paper>
  )
}
