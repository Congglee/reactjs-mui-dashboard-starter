import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Skeleton from '@mui/material/Skeleton'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

export default function TasksTableSkeleton() {
  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          p: 1.5,
          borderBottom: '1px solid var(--color-border)'
        }}
      >
        <Stack direction='row' spacing={1} sx={{ ml: 'auto' }}>
          <Skeleton variant='rounded' width={36} height={36} sx={{ borderRadius: 1 }} />
          <Skeleton variant='rounded' width={36} height={36} sx={{ borderRadius: 1 }} />
          <Skeleton variant='rounded' width={36} height={36} sx={{ borderRadius: 1 }} />
          <Skeleton variant='rounded' width={36} height={36} sx={{ borderRadius: 1 }} />
        </Stack>
      </Box>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: '24px 120px minmax(250px, 1fr) 120px 150px 150px 100px 100px',
          gap: 2,
          px: 2,
          py: 1.5,
          borderBottom: '1px solid var(--color-border)',
          alignItems: 'center'
        }}
      >
        <Skeleton variant='rounded' width={16} height={16} sx={{ borderRadius: 0.5 }} />
        <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.secondary' }}>
          ID
        </Typography>
        <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.secondary' }}>
          Title
        </Typography>
        <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.secondary' }}>
          Priority
        </Typography>
        <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.secondary' }}>
          Created At
        </Typography>
        <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.secondary' }}>
          Category
        </Typography>
        <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.secondary', textAlign: 'center' }}>
          Status
        </Typography>
        <Box />
      </Box>

      <Divider />

      {Array.from({ length: 10 }).map((_, i) => (
        <Box
          key={i}
          sx={{
            display: 'grid',
            gridTemplateColumns: '24px 120px minmax(250px, 1fr) 120px 150px 150px 100px 100px',
            alignItems: 'center',
            gap: 2,
            px: 2,
            py: 1.5,
            borderTop: i === 0 ? 'none' : '1px solid var(--color-border)',
            minHeight: 52
          }}
        >
          <Skeleton variant='rounded' width={16} height={16} sx={{ borderRadius: 0.5 }} />
          <Skeleton variant='text' width={60} height={20} />
          <Skeleton variant='text' width='80%' height={20} />
          <Skeleton variant='rounded' width={64} height={24} sx={{ borderRadius: 999 }} />
          <Skeleton variant='text' width={80} height={20} />
          <Skeleton variant='text' width={100} height={20} />
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Skeleton variant='circular' width={20} height={20} />
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 0.5 }}>
            <Skeleton variant='circular' width={32} height={32} />
            <Skeleton variant='circular' width={32} height={32} />
          </Box>
        </Box>
      ))}

      <Divider />

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: 2,
          py: 1,
          borderTop: '1px solid var(--color-border)'
        }}
      >
        <Skeleton variant='text' width={120} height={20} />
        <Stack direction='row' spacing={1} alignItems='center'>
          <Skeleton variant='text' width={60} height={20} />
          <Skeleton variant='rounded' width={64} height={32} sx={{ borderRadius: 1 }} />
          <Skeleton variant='text' width={40} height={20} />
          <Skeleton variant='rounded' width={32} height={32} sx={{ borderRadius: 1 }} />
          <Skeleton variant='rounded' width={32} height={32} sx={{ borderRadius: 1 }} />
        </Stack>
      </Box>
    </Box>
  )
}
