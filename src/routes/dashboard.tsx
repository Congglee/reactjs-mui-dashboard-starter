import CalloutCard from '@/components/dashboard/callout-card'
import ChartCard from '@/components/dashboard/chart-card'
import DashboardTable from '@/components/dashboard/dashboard-table'
import MetricCard from '@/components/dashboard/metric-card'
import ProductTree from '@/components/dashboard/product-tree'
import UsersByCountry from '@/components/dashboard/users-by-country'
import PageHeader from '@/components/page-header'
import {
  mockConvSpark,
  mockDownloads,
  mockEventSpark,
  mockPageViews,
  mockSessionsA,
  mockSessionsB,
  mockSessionsC,
  mockUsersSpark
} from '@/constants/mock-data'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import { alpha, useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import { BarChart } from '@mui/x-charts/BarChart'
import { LineChart } from '@mui/x-charts/LineChart'

export default function Dashboard() {
  const theme = useTheme()
  const stackedBarRadius = 8

  const sessionsDays = Array.from({ length: 26 }, (_, i) => i + 5)
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul']

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', bgcolor: 'background.default' }}>
      <PageHeader breadcrumbs={[{ label: 'Dashboard' }, { label: 'Home', current: true }]} showDatePicker={true} />

      <Typography variant='h2' sx={{ fontSize: '1.5rem', fontWeight: 600, lineHeight: 1.6, color: 'text.primary' }}>
        Overview
      </Typography>

      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <MetricCard
            title='Users'
            value='14k'
            caption='Last 30 days'
            color={theme.palette.success.main}
            trend={{ value: 25, direction: 'up' }}
            data={mockUsersSpark}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <MetricCard
            title='Conversions'
            value='325'
            caption='Last 30 days'
            color={theme.palette.error.main}
            trend={{ value: 25, direction: 'down' }}
            data={mockConvSpark}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <MetricCard
            title='Event count'
            value='200k'
            caption='Last 30 days'
            color={theme.palette.info.main}
            trend={{ value: 5, direction: 'up' }}
            data={mockEventSpark}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <CalloutCard />
        </Grid>

        <Grid size={12} sx={{ minWidth: 0 }}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }} sx={{ minWidth: 0 }}>
              <ChartCard
                title='Sessions'
                metric='13,277'
                trend={{ value: 35, direction: 'up' }}
                subtitle='Sessions per day for the last 30 days'
              >
                <LineChart
                  xAxis={[
                    {
                      scaleType: 'point',
                      data: sessionsDays.map((d) => `Apr ${d}`),
                      tickInterval: (_, i) => i % 5 === 0
                    }
                  ]}
                  series={[
                    {
                      id: 'A',
                      label: 'Direct',
                      data: mockSessionsA,
                      color: theme.palette.info.light,
                      area: true,
                      curve: 'monotoneX',
                      valueFormatter: (v: number | null) => (v == null ? '-' : v.toLocaleString())
                    },
                    {
                      id: 'B',
                      label: 'Referral',
                      data: mockSessionsB,
                      color: alpha(theme.palette.info.main, 0.9),
                      area: true,
                      curve: 'monotoneX',
                      valueFormatter: (v: number | null) => (v == null ? '-' : v.toLocaleString())
                    },
                    {
                      id: 'C',
                      label: 'Organic',
                      data: mockSessionsC,
                      color: alpha(theme.palette.primary.main, 0.9),
                      area: true,
                      curve: 'monotoneX',
                      valueFormatter: (v: number | null) => (v == null ? '-' : v.toLocaleString())
                    }
                  ]}
                  height={320}
                  sx={{
                    '& .MuiChartsLegend-root': { display: 'none' },
                    '& .MuiChartsAxis-bottom .MuiChartsAxis-tickLabel': { fill: 'var(--color-chart-axis)' },
                    '& .MuiChartsAxis-left .MuiChartsAxis-tickLabel': { fill: 'var(--color-chart-axis)' },
                    '& .MuiChartsGrid-line': { stroke: 'var(--color-chart-grid)' }
                  }}
                />
              </ChartCard>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }} sx={{ minWidth: 0 }}>
              <ChartCard
                title='Page views and downloads'
                metric='1.3M'
                trend={{ value: 8, direction: 'down' }}
                subtitle='Page views and downloads for the last 6 months'
              >
                <BarChart
                  xAxis={[{ scaleType: 'band', data: months }]}
                  series={[
                    {
                      id: 'views',
                      data: mockPageViews,
                      label: 'Views',
                      color: alpha(theme.palette.info.main, 0.9),
                      stack: 'total'
                    },
                    {
                      id: 'downloads',
                      data: mockDownloads,
                      label: 'Downloads',
                      color: theme.palette.info.light,
                      stack: 'total'
                    }
                  ]}
                  height={320}
                  sx={{
                    '& .MuiChartsLegend-series tspan': { fill: 'var(--color-chart-axis)' },
                    '& .MuiChartsAxis-bottom .MuiChartsAxis-tickLabel': { fill: 'var(--color-chart-axis)' },
                    '& .MuiChartsAxis-left .MuiChartsAxis-tickLabel': { fill: 'var(--color-chart-axis)' },
                    '& .MuiChartsGrid-line': { stroke: 'var(--color-chart-grid)' },
                    '& .MuiBarElement-series-downloads': {
                      clipPath: `inset(0 round ${stackedBarRadius}px ${stackedBarRadius}px 0px 0px)`
                    }
                  }}
                />
              </ChartCard>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Typography
        variant='h2'
        sx={{ my: 2, fontSize: '1.5rem', fontWeight: 600, lineHeight: 1.6, color: 'text.primary' }}
      >
        Details
      </Typography>

      <Grid container spacing={2} sx={{ alignItems: 'stretch' }}>
        <Grid size={{ xs: 12, lg: 9 }} sx={{ minWidth: 0 }}>
          <Box
            sx={{
              width: '100%',
              border: '1px solid var(--color-border)',
              borderRadius: 1,
              overflow: 'hidden',
              bgcolor: 'var(--color-surface)'
            }}
          >
            <DashboardTable />
          </Box>
        </Grid>

        <Grid size={{ xs: 12, lg: 3 }} sx={{ minWidth: 0 }}>
          <Stack spacing={2} sx={{ height: '100%' }}>
            <ProductTree />
            <UsersByCountry />
          </Stack>
        </Grid>
      </Grid>
    </Box>
  )
}
