import { useTheme, alpha } from '@mui/material/styles'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import TrendPill from '@/components/dashboard/trend-pill'
import { SparkLineChart } from '@mui/x-charts/SparkLineChart'
import Box from '@mui/material/Box'
import type { Trend } from '@/types/mock-data.types'

interface MetricCardProps {
  title: string
  value: string
  caption: string
  color: string
  trend: Trend
  data: number[]
}

export default function MetricCard({ title, value, caption, color, trend, data }: MetricCardProps) {
  const theme = useTheme()

  return (
    <Paper
      sx={[
        {
          position: 'relative',
          p: 2,
          height: '100%',
          border: '1px solid var(--color-border)',
          borderRadius: 1.5,
          overflow: 'hidden',
          bgcolor: 'background.default',
          boxShadow: '0 2px 14px rgba(0,0,0,0.06)'
        },
        (theme) =>
          theme.applyStyles('dark', {
            boxShadow: '0 4px 20px rgba(0,0,0,0.5)'
          })
      ]}
    >
      <Stack direction='row' alignItems='center' justifyContent='space-between' flexWrap='wrap' gap={1}>
        <Typography variant='subtitle2' fontWeight={700} color='text.primary'>
          {title}
        </Typography>
        <TrendPill trend={trend} />
      </Stack>
      <Typography variant='h5' sx={{ mt: 0.75, fontWeight: 700, lineHeight: 1.15, color: 'text.primary' }}>
        {value}
      </Typography>
      <Typography variant='caption' color='text.secondary'>
        {caption}
      </Typography>

      <Box sx={{ position: 'absolute', left: 0, right: 0, bottom: 0, p: 0, height: 64 }}>
        <SparkLineChart
          data={data}
          height={64}
          showHighlight={false}
          curve='monotoneX'
          area
          color={color}
          fillOpacity={0.25}
          margin={{ left: 8, right: 8, bottom: 4, top: 4 }}
          sx={[
            {
              '& .MuiAreaElement-root': {
                fill: alpha(color, 0.2)
              },
              '& .MuiLineElement-root': {
                strokeWidth: 2,
                opacity: 1
              },
              '& .MuiChartsAxis-root, & .MuiChartsGrid-root': { display: 'none' },
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0
            },
            (theme) =>
              theme.applyStyles('dark', {
                '& .MuiAreaElement-root': {
                  fill: alpha(color, 0.15)
                },
                '& .MuiLineElement-root': {
                  opacity: 0.9
                }
              })
          ]}
        />
        <Box
          sx={[
            {
              position: 'absolute',
              inset: 0,
              pointerEvents: 'none',
              background: `linear-gradient(180deg, ${alpha(theme.palette.background.paper, 0)} 0%, ${alpha(theme.palette.background.paper, 0)} 30%, ${alpha(theme.palette.background.paper, 0.85)} 100%)`
            },
            (theme) =>
              theme.applyStyles('dark', {
                background:
                  'linear-gradient(180deg, rgba(30, 37, 50, 0) 0%, rgba(30, 37, 50, 0) 25%, rgba(30, 37, 50, 0.9) 100%)'
              })
          ]}
        />
      </Box>
    </Paper>
  )
}
