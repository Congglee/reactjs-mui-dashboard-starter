import type { AnalyticsMetric } from '@/types/mock-data.type'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline'
import ShowChartIcon from '@mui/icons-material/ShowChart'
import TrendingDownIcon from '@mui/icons-material/TrendingDown'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

interface AnalyticsMetricCardProps {
  metric: AnalyticsMetric
}

export default function AnalyticsMetricCard({ metric }: AnalyticsMetricCardProps) {
  const { label, value, trend, icon } = metric

  const getIcon = (iconType: AnalyticsMetric['icon']) => {
    const iconSx = { fontSize: 20, color: 'text.secondary' }

    switch (iconType) {
      case 'chart':
        return <ShowChartIcon sx={iconSx} />
      case 'users':
        return <PeopleOutlineIcon sx={iconSx} />
      case 'bounce':
        return <TrendingDownIcon sx={iconSx} />
      case 'clock':
        return <AccessTimeIcon sx={iconSx} />
      default:
        return <ShowChartIcon sx={iconSx} />
    }
  }

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
      <Stack direction='row' alignItems='center' justifyContent='space-between' sx={{ mb: 2 }}>
        <Typography
          variant='subtitle2'
          sx={{
            fontWeight: 700,
            color: 'text.primary'
          }}
        >
          {label}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {getIcon(icon)}
        </Box>
      </Stack>

      <Typography
        variant='h4'
        sx={{
          fontWeight: 700,
          color: 'text.primary',
          lineHeight: 1.2,
          mb: 0.5
        }}
      >
        {value}
      </Typography>

      <Typography
        variant='caption'
        sx={{
          color: trend.isPositive ? 'success.main' : 'error.main',
          fontWeight: 500
        }}
      >
        {trend.value}
      </Typography>
    </Paper>
  )
}
