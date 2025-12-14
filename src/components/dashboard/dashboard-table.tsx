import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Divider from '@mui/material/Divider'
import Skeleton from '@mui/material/Skeleton'
import Stack from '@mui/material/Stack'
import { useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import type { GridColDef } from '@mui/x-data-grid'
import { DataGrid } from '@mui/x-data-grid'
import { useEffect, useMemo, useState } from 'react'

type DashboardRow = {
  id: number
  title: string
  status: 'Online' | 'Offline'
  users: number
  eventCount: number
  viewsPerUser: number
  conversions: number[]
}

const TITLES = [
  'Homepage Overview',
  'Product Details - Gadgets',
  'Checkout Process - Step 1',
  'User Profile Dashboard',
  'Article Listing - Tech News',
  'FAQs - Customer Support',
  'Product Comparison - Laptops',
  'Shopping Cart - Electronics',
  'Payment Confirmation - Order',
  'Product Reviews - Smartphones',
  'Subscription Management',
  'Order Tracking - Shipment',
  'Customer Feedback - Surveys',
  'Account Settings - Preferences',
  'Login Page - Authentication',
  'Promotions - Seasonal Sale',
  'Tutorials - How to Guides',
  'Blog Posts - Tech Insights',
  'Events - Webinars',
  'Support - Contact Us',
  'Reports - Analytics',
  'About - Company Info',
  'Terms & Conditions',
  'Privacy Policy',
  'Careers - Open Roles',
  'Press - Media Kit',
  'Partners - Integration',
  'Developers - API Docs',
  'Roadmap - Product',
  'Changelog - Releases',
  'Community - Forum',
  'Sitemap',
  'Legal - Compliance',
  'Security - Best Practices',
  'Accessibility Statement',
  'Contact - Offices'
]

// Generate random data once during component initialization
const generateRows = (): DashboardRow[] => {
  const randomBars = () => {
    return Array.from({ length: 40 }, () => 2 + Math.round(Math.random() * 18))
  }

  const randomFrom = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  return TITLES.slice(0, 35).map((t, i) => {
    const users = randomFrom(12000, 230000)
    const eventCount = randomFrom(3200, 125000)
    const vpu = Math.round((Math.random() * 18 + 2) * 10) / 10
    const online = Math.random() > 0.35

    return {
      id: i + 1,
      title: t,
      status: online ? 'Online' : 'Offline',
      users,
      eventCount,
      viewsPerUser: vpu,
      conversions: randomBars()
    }
  })
}

export default function DashboardTable() {
  const theme = useTheme()

  const [isLoading, setIsLoading] = useState(true)
  // Use lazy initializer to generate rows only once on mount
  const [rows] = useState<DashboardRow[]>(() => generateRows())

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800)
    return () => clearTimeout(timer)
  }, [])

  const headerLabel = (text: string) => (
    <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.secondary' }} noWrap>
      {text}
    </Typography>
  )

  const columns: GridColDef<DashboardRow>[] = useMemo(
    () => [
      {
        field: 'title',
        headerName: 'Page Title',
        flex: 1.4,
        minWidth: 220,
        renderHeader: () => headerLabel('Page Title'),
        renderCell: (params) => (
          <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
            <Typography variant='body2' noWrap sx={{ fontWeight: 500 }}>
              {params.value}
            </Typography>
          </Box>
        )
      },
      {
        field: 'status',
        headerName: 'Status',
        width: 140,
        renderHeader: () => headerLabel('Status'),
        renderCell: (params) => (
          <Chip
            size='small'
            label={params.value}
            sx={{
              height: 24,
              fontSize: '0.75rem',
              borderRadius: 999,
              px: 0.75,
              bgcolor: params.value === 'Online' ? 'var(--color-success-bg)' : 'var(--color-flag-bg)',
              color: params.value === 'Online' ? 'var(--color-success)' : 'text.secondary',
              border: `1px solid ${params.value === 'Online' ? 'var(--color-success-border)' : 'var(--color-flag-border)'}`
            }}
          />
        )
      },
      {
        field: 'users',
        headerName: 'Users',
        width: 120,
        align: 'right',
        headerAlign: 'right',
        renderHeader: () => headerLabel('Users'),
        valueFormatter: ({ value }) => (value == null ? '-' : Number(value).toLocaleString()),
        renderCell: (params) => (
          <Typography variant='body2' sx={{ width: '100%', textAlign: 'right' }}>
            {params.value == null ? '-' : Number(params.value).toLocaleString()}
          </Typography>
        )
      },
      {
        field: 'eventCount',
        headerName: 'Event Count',
        width: 140,
        align: 'right',
        headerAlign: 'right',
        renderHeader: () => headerLabel('Event Count'),
        valueFormatter: ({ value }) => (value == null ? '-' : Number(value).toLocaleString()),
        renderCell: (params) => (
          <Typography variant='body2' sx={{ width: '100%', textAlign: 'right' }}>
            {params.value == null ? '-' : Number(params.value).toLocaleString()}
          </Typography>
        )
      },
      {
        field: 'viewsPerUser',
        headerName: 'Views per User',
        width: 150,
        align: 'right',
        headerAlign: 'right',
        renderHeader: () => headerLabel('Views per User'),
        valueFormatter: ({ value }) =>
          value == null ? '-' : Number(value).toLocaleString(undefined, { maximumFractionDigits: 1 }),
        renderCell: (params) => (
          <Typography variant='body2' sx={{ width: '100%', textAlign: 'right' }}>
            {params.value == null ? '-' : Number(params.value).toLocaleString(undefined, { maximumFractionDigits: 1 })}
          </Typography>
        )
      },
      {
        field: 'conversions',
        headerName: 'Daily Conversions',
        flex: 1,
        minWidth: 260,
        sortable: false,
        filterable: false,
        disableColumnMenu: true,
        renderHeader: () => headerLabel('Daily Conversions'),
        renderCell: (params) => (
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: `repeat(${(params.value as number[]).length}, 5px)`,
              alignItems: 'end',
              gap: 0,
              width: '100%',
              height: 24,
              overflow: 'hidden'
            }}
          >
            {(params.value as number[]).map((h: number, idx: number) => (
              <Box
                key={idx}
                sx={{
                  width: '100%',
                  height: `${Math.max(4, Math.min(h, 20))}px`,
                  bgcolor: theme.palette.primary.main,
                  borderRadius: 0,
                  opacity: 1
                }}
              />
            ))}
          </Box>
        )
      }
    ],
    [theme]
  )

  const CustomLoadingOverlay = () => (
    <Box sx={{ width: '100%' }}>
      <Box
        sx={{
          display: { xs: 'none', sm: 'grid' },
          gridTemplateColumns: '24px minmax(180px,1.4fr) 120px 1fr 1fr 1fr minmax(160px,1fr)',
          gap: 2,
          px: 2,
          py: 1.25,
          color: 'text.secondary'
        }}
      >
        <Typography variant='caption' aria-hidden></Typography>
        <Typography variant='caption'>Page Title</Typography>
        <Typography variant='caption'>Status</Typography>
        <Typography variant='caption'>Users</Typography>
        <Typography variant='caption'>Event Count</Typography>
        <Typography variant='caption'>Views per User</Typography>
        <Typography variant='caption'>Daily Conversions</Typography>
      </Box>
      <Divider />
      {Array.from({ length: 8 }).map((_, i) => (
        <Box
          key={i}
          sx={{
            display: 'grid',
            gridTemplateColumns: '24px minmax(180px,1.4fr) 120px 1fr 1fr 1fr minmax(160px,1fr)',
            alignItems: 'center',
            gap: 2,
            px: 2,
            py: 1.25,
            borderTop: i === 0 ? 'none' : '1px solid var(--color-border)'
          }}
        >
          <Skeleton variant='rounded' width={16} height={16} sx={{ borderRadius: 0.5 }} />
          <Skeleton variant='text' width='80%' />
          <Skeleton variant='rounded' width={64} height={24} sx={{ borderRadius: 999 }} />
          <Skeleton variant='text' width='50%' />
          <Skeleton variant='text' width='50%' />
          <Skeleton variant='text' width='50%' />
          <Skeleton variant='rectangular' height={22} sx={{ borderRadius: 1 }} />
        </Box>
      ))}
      <Divider />
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 1,
          px: 2,
          py: 1.25
        }}
      >
        <Skeleton variant='text' width={120} />
        <Stack direction='row' spacing={1.5} alignItems='center'>
          <Skeleton variant='text' width={80} />
          <Stack direction='row' spacing={1}>
            <Skeleton variant='rounded' width={28} height={28} />
            <Skeleton variant='rounded' width={28} height={28} />
          </Stack>
        </Stack>
      </Box>
    </Box>
  )

  return (
    <DataGrid
      rows={rows}
      columns={columns}
      checkboxSelection
      disableRowSelectionOnClick
      autoHeight
      density='standard'
      rowHeight={45}
      columnHeaderHeight={42}
      loading={isLoading}
      pageSizeOptions={[10, 20, 50]}
      initialState={{ pagination: { paginationModel: { pageSize: 20, page: 0 } } }}
      slots={{ loadingOverlay: CustomLoadingOverlay }}
      sx={{
        border: 'none',
        '--DataGrid-containerBackground': 'transparent',
        '& .MuiDataGrid-cellCheckbox': { alignItems: 'center' },
        '& .MuiDataGrid-columnHeaders': {
          bgcolor: 'transparent',
          color: 'text.secondary',
          borderBottom: '1px solid var(--color-border)',
          fontSize: '0.875rem'
        },
        '& .MuiDataGrid-columnHeaderTitle': {
          fontWeight: 600
        },
        '& .MuiDataGrid-cell': {
          borderColor: 'var(--color-border)',
          color: 'text.primary',
          fontSize: '0.875rem',
          display: 'flex',
          alignItems: 'center',
          py: 0
        },
        '& .MuiDataGrid-row:hover': {
          bgcolor: 'var(--color-hover)'
        },
        '& .MuiDataGrid-row.Mui-selected': {
          bgcolor: 'var(--color-selected)',
          '&:hover': {
            bgcolor: 'var(--color-focus)'
          }
        },
        '& .MuiDataGrid-selectedRowCount': {
          color: 'text.secondary'
        },
        '& .MuiDataGrid-footerContainer': {
          borderTop: '1px solid var(--color-border)',
          color: 'text.secondary',
          px: 1,
          bgcolor: 'transparent'
        },
        '& .MuiTablePagination-displayedRows, & .MuiTablePagination-selectLabel': {
          color: 'text.secondary'
        },
        '& .MuiDataGrid-columnSeparator': { display: 'none' }
      }}
    />
  )
}
