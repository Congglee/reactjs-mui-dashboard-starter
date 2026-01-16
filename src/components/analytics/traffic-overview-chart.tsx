import type { TrafficDataPoint } from '@/types/mock-data.type'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import { alpha, useTheme } from '@mui/material/styles'
import { LineChart } from '@mui/x-charts/LineChart'
import type React from 'react'
import { useRef, useState } from 'react'

interface TrafficOverviewChartProps {
  title: string
  subtitle: string
  data: TrafficDataPoint[]
}

export default function TrafficOverviewChart({ title, subtitle, data }: TrafficOverviewChartProps) {
  const theme = useTheme()
  const scrollRef = useRef<HTMLDivElement | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const startXRef = useRef(0)
  const startScrollLeftRef = useRef(0)

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    const el = scrollRef.current
    if (!el) return
    if (el.scrollWidth <= el.clientWidth) return
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      el.scrollLeft += e.deltaY
      e.preventDefault()
    }
  }

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = scrollRef.current
    if (!el || el.scrollWidth <= el.clientWidth) return
    setIsDragging(true)
    startXRef.current = e.clientX
    startScrollLeftRef.current = el.scrollLeft
    el.setPointerCapture?.(e.pointerId)
  }

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return
    const el = scrollRef.current
    if (!el) return
    const dx = e.clientX - startXRef.current
    el.scrollLeft = startScrollLeftRef.current - dx
  }

  const handlePointerUpOrLeave = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return
    setIsDragging(false)
    const el = scrollRef.current
    el?.releasePointerCapture?.(e.pointerId)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const el = scrollRef.current
    if (!el || el.scrollWidth <= el.clientWidth) return
    const step = 80
    if (e.key === 'ArrowRight') {
      el.scrollBy({ left: step, behavior: 'smooth' })
      e.preventDefault()
    } else if (e.key === 'ArrowLeft') {
      el.scrollBy({ left: -step, behavior: 'smooth' })
      e.preventDefault()
    } else if (e.key === 'Home') {
      el.scrollTo({ left: 0, behavior: 'smooth' })
      e.preventDefault()
    } else if (e.key === 'End') {
      el.scrollTo({ left: el.scrollWidth, behavior: 'smooth' })
      e.preventDefault()
    }
  }

  const days = data.map((d) => d.day)
  const clicks = data.map((d) => d.clicks)
  const visitors = data.map((d) => d.visitors)

  return (
    <Paper
      sx={[
        {
          p: { xs: 2, sm: 3 },
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
          mb: 2
        }}
      >
        {subtitle}
      </Typography>

      <Box
        ref={scrollRef}
        tabIndex={0}
        role='region'
        aria-label={`${title} chart scroll area`}
        onWheel={handleWheel}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUpOrLeave}
        onPointerLeave={handlePointerUpOrLeave}
        onKeyDown={handleKeyDown}
        sx={[
          {
            position: 'relative',
            width: '100%',
            overflowX: 'auto',
            overflowY: 'hidden',
            WebkitOverflowScrolling: 'touch',
            overscrollBehaviorX: 'contain',
            touchAction: 'pan-y',
            scrollBehavior: 'smooth',
            cursor: isDragging ? 'grabbing' : 'grab',
            scrollbarWidth: 'thin',
            '&::-webkit-scrollbar': { height: 8 },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: 'rgba(148, 160, 184, 0.4)',
              borderRadius: 8
            },
            '&:hover::-webkit-scrollbar-thumb': {
              backgroundColor: 'rgba(148, 160, 184, 0.6)'
            }
          },
          (theme) =>
            theme.applyStyles('dark', {
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: 'rgba(86, 100, 129, 0.6)'
              },
              '&:hover::-webkit-scrollbar-thumb': {
                backgroundColor: 'rgba(86, 100, 129, 0.8)'
              }
            })
        ]}
      >
        <Box sx={{ minWidth: { xs: 560, sm: 640, md: '100%' }, height: 320 }}>
          <LineChart
            xAxis={[
              {
                scaleType: 'point',
                data: days,
                tickLabelStyle: {
                  fill: 'var(--color-chart-axis)',
                  fontSize: 12
                }
              }
            ]}
            yAxis={[
              {
                tickLabelStyle: {
                  fill: 'var(--color-chart-axis)',
                  fontSize: 12
                }
              }
            ]}
            series={[
              {
                id: 'clicks',
                label: 'Clicks',
                data: clicks,
                color: alpha(theme.palette.info.main, 0.85),
                area: true,
                curve: 'monotoneX',
                valueFormatter: (v: number | null) => (v == null ? '-' : v.toLocaleString())
              },
              {
                id: 'visitors',
                label: 'Visitors',
                data: visitors,
                color: alpha(theme.palette.primary.main, 0.5),
                area: true,
                curve: 'monotoneX',
                valueFormatter: (v: number | null) => (v == null ? '-' : v.toLocaleString())
              }
            ]}
            height={320}
            margin={{ left: 50, right: 20, top: 20, bottom: 30 }}
            sx={{
              '& .MuiChartsLegend-root': { display: 'none' },
              '& .MuiChartsAxis-bottom .MuiChartsAxis-tickLabel': { fill: 'var(--color-chart-axis)' },
              '& .MuiChartsAxis-left .MuiChartsAxis-tickLabel': { fill: 'var(--color-chart-axis)' },
              '& .MuiChartsGrid-line': { stroke: 'var(--color-chart-grid)' },
              '& .MuiAreaElement-series-clicks': {
                fillOpacity: 0.5
              },
              '& .MuiAreaElement-series-visitors': {
                fillOpacity: 0.35
              }
            }}
          />
        </Box>
      </Box>
    </Paper>
  )
}
