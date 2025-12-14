import Chip from '@mui/material/Chip'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import TrendingDownIcon from '@mui/icons-material/TrendingDown'
import type { Trend } from '@/types/mock-data.type'

interface TrendPillProps {
  trend: Trend
}

export default function TrendPill({ trend }: TrendPillProps) {
  const isUpDirection = trend.direction === 'up'

  return (
    <Chip
      size='small'
      label={`${isUpDirection ? '+' : ''}${trend.value}%`}
      icon={isUpDirection ? <TrendingUpIcon /> : <TrendingDownIcon />}
      sx={{
        height: 24,
        px: 0.5,
        borderRadius: 1.25,
        fontWeight: 700,
        '& .MuiChip-icon': {
          fontSize: 16
        },
        ...(isUpDirection
          ? {
              bgcolor: 'var(--color-success-bg)',
              color: 'var(--color-success)',
              border: '1px solid var(--color-success-border)'
            }
          : {
              bgcolor: 'var(--color-error-bg)',
              color: 'var(--color-error)',
              border: '1px solid var(--color-error-border)'
            })
      }}
    />
  )
}
