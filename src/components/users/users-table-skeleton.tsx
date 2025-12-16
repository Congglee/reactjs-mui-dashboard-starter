import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Skeleton from '@mui/material/Skeleton'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

export default function UsersTableSkeleton() {
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
          gridTemplateColumns: '24px 180px 180px minmax(220px, 1fr) 160px 120px 140px 60px',
          gap: 2,
          px: 2,
          py: 1.5,
          borderBottom: '1px solid var(--color-border)',
          alignItems: 'center'
        }}
      >
        <Skeleton variant='rounded' width={16} height={16} sx={{ borderRadius: 0.5 }} />
        <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.secondary' }}>
          Username
        </Typography>
        <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.secondary' }}>
          Name
        </Typography>
        <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.secondary' }}>
          Email
        </Typography>
        <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.secondary' }}>
          Phone Number
        </Typography>
        <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.secondary' }}>
          Status
        </Typography>
        <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.secondary' }}>
          Role
        </Typography>
        <Box />
      </Box>

      <Divider />

      {Array.from({ length: 10 }).map((_, i) => (
        <Box
          key={i}
          sx={{
            display: 'grid',
            gridTemplateColumns: '24px 180px 180px minmax(220px, 1fr) 160px 120px 140px 60px',
            alignItems: 'center',
            gap: 2,
            px: 2,
            py: 1.5,
            borderTop: i === 0 ? 'none' : '1px solid var(--color-border)',
            minHeight: 52
          }}
        >
          <Skeleton variant='rounded' width={16} height={16} sx={{ borderRadius: 0.5 }} />
          <Skeleton variant='text' width={120} height={20} />
          <Skeleton variant='text' width={120} height={20} />
          <Skeleton variant='text' width='80%' height={20} />
          <Skeleton variant='text' width={100} height={20} />
          <Skeleton variant='rounded' width={80} height={24} sx={{ borderRadius: 999 }} />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Skeleton variant='circular' width={20} height={20} />
            <Skeleton variant='text' width={60} height={20} />
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Skeleton variant='circular' width={24} height={24} />
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
