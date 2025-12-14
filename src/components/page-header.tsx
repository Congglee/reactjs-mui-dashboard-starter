import DatePicker from '@/components/date-picker'
import Box from '@mui/material/Box'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Typography from '@mui/material/Typography'

interface PageHeaderProps {
  breadcrumbs: {
    label: string
    current?: boolean
  }[]
  showDatePicker?: boolean
}

export default function PageHeader({ breadcrumbs, showDatePicker = false }: PageHeaderProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 2,
        minHeight: 48,
        pb: 1
      }}
    >
      <Box sx={{ minWidth: 0 }}>
        <Breadcrumbs
          aria-label='breadcrumb'
          separator='›'
          sx={{
            '& .MuiBreadcrumbs-separator': { color: 'text.secondary' }
          }}
        >
          {breadcrumbs.map((item, index) => (
            <Typography
              key={`${item.label}-${index}`}
              variant={item.current ? 'subtitle2' : 'body2'}
              sx={{
                fontWeight: item.current ? 700 : 500,
                color: item.current ? 'text.primary' : 'primary.main'
              }}
              noWrap
            >
              {item.label}
            </Typography>
          ))}
        </Breadcrumbs>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25 }}>{showDatePicker && <DatePicker />}</Box>
    </Box>
  )
}
