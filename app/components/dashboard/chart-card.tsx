import TrendPill from '@/components/dashboard/trend-pill'
import type { Trend } from '@/types/mock-data.types'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import type React from 'react'
import { useRef, useState } from 'react'

interface ChartCardProps {
  title: string
  metric: string
  trend: Trend
  subtitle: string
  children: React.ReactNode
}

export default function ChartCard({ title, metric, trend, subtitle, children }: ChartCardProps) {
  const scrollRef = useRef<HTMLDivElement | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const startXRef = useRef(0)
  const startScrollLeftRef = useRef(0)

  const onWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    const el = scrollRef.current
    if (!el) return
    if (el.scrollWidth <= el.clientWidth) return
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      el.scrollLeft += e.deltaY
      e.preventDefault()
    }
  }

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = scrollRef.current
    if (!el || el.scrollWidth <= el.clientWidth) return
    setIsDragging(true)
    startXRef.current = e.clientX
    startScrollLeftRef.current = el.scrollLeft
    el.setPointerCapture?.(e.pointerId)
  }

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return
    const el = scrollRef.current
    if (!el) return
    const dx = e.clientX - startXRef.current
    el.scrollLeft = startScrollLeftRef.current - dx
  }

  const onPointerUpOrLeave = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return
    setIsDragging(false)
    const el = scrollRef.current
    el?.releasePointerCapture?.(e.pointerId)
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
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

  return (
    <Paper
      sx={[
        {
          p: { xs: 1.5, sm: 2 },
          height: '100%',
          border: '1px solid var(--color-border)',
          borderRadius: 1.5,
          bgcolor: 'background.default',
          overflow: 'hidden',
          boxShadow: '0 2px 14px rgba(0,0,0,0.06)'
        },
        (theme) =>
          theme.applyStyles('dark', {
            boxShadow: '0 4px 20px rgba(0,0,0,0.5)'
          })
      ]}
    >
      <Stack direction='row' alignItems='center' justifyContent='space-between' gap={1} sx={{ mb: 0.5 }}>
        <Typography variant='subtitle1' sx={{ fontWeight: 700, color: 'text.primary' }}>
          {title}
        </Typography>
        <TrendPill trend={trend} />
      </Stack>
      <Typography variant='h5' sx={{ fontWeight: 700, lineHeight: 1.2, color: 'text.primary' }}>
        {metric}
      </Typography>
      <Typography variant='caption' color='text.secondary' sx={{ display: 'block', mb: 1.5 }}>
        {subtitle}
      </Typography>
      <Box
        ref={scrollRef}
        tabIndex={0}
        role='region'
        aria-label={`${title} chart scroll area`}
        onWheel={onWheel}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUpOrLeave}
        onPointerLeave={onPointerUpOrLeave}
        onKeyDown={onKeyDown}
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
        <Box sx={{ minWidth: { xs: 560, sm: 640, md: '100%' } }}>{children}</Box>
      </Box>
    </Paper>
  )
}
