import AnalyticsMetricCard from '@/components/analytics/analytics-metric-card'
import DevicesCard from '@/components/analytics/devices-card'
import ReferrersCard from '@/components/analytics/referrers-card'
import TrafficOverviewChart from '@/components/analytics/traffic-overview-chart'
import PageHeader from '@/components/page-header'
import {
  mockAnalyticsMetrics,
  mockAnalyticsOverview,
  mockDevicesData,
  mockReferrersData,
  mockReferrersMaxVisits
} from '@/constants/mock-data'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

export default function Analytics() {
  return (
    <Box>
      <PageHeader breadcrumbs={[{ label: 'Analytics', current: true }]} showDatePicker={true} />

      <Typography variant='h2' sx={{ fontSize: '1.5rem', fontWeight: 600, lineHeight: 1.6, color: 'text.primary' }}>
        Overview
      </Typography>

      <Box sx={{ mt: 2, mb: 3 }}>
        <TrafficOverviewChart
          title={mockAnalyticsOverview.title}
          subtitle={mockAnalyticsOverview.subtitle}
          data={mockAnalyticsOverview.data}
        />
      </Box>

      <Grid container spacing={2} sx={{ mb: 3 }}>
        {mockAnalyticsMetrics.map((metric) => (
          <Grid key={metric.id} size={{ xs: 12, sm: 6, md: 3 }}>
            <AnalyticsMetricCard metric={metric} />
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 6 }}>
          <ReferrersCard
            title='Referrers'
            subtitle='Top sources driving traffic'
            data={mockReferrersData}
            maxVisits={mockReferrersMaxVisits}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <DevicesCard title='Devices' subtitle='How users access your app' data={mockDevicesData} />
        </Grid>
      </Grid>
    </Box>
  )
}
