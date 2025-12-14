import Stack from '@mui/material/Stack'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'

export default function CalloutCard() {
  return (
    <Paper
      sx={[
        {
          p: 2,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
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
      <Stack direction='row' alignItems='center' flexWrap='wrap' gap={1.25}>
        <Box
          sx={{
            width: 28,
            height: 28,
            borderRadius: 1.25,
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: 'var(--color-info-bg)',
            color: 'var(--color-info)'
          }}
        >
          <AutoAwesomeIcon sx={{ fontSize: 18 }} />
        </Box>
        <Typography variant='subtitle1' sx={{ fontSize: '0.875rem', fontWeight: 700, color: 'text.primary' }}>
          Explore your data
        </Typography>
      </Stack>
      <Typography variant='body2' color='text.secondary' sx={{ my: 1.25 }}>
        Uncover performance and visitor insights with our data wizardry.
      </Typography>
      <Button
        variant='outlined'
        endIcon={<ChevronRightIcon />}
        sx={{
          alignSelf: 'flex-start',
          textTransform: 'none',
          borderRadius: 1.25,
          borderColor: 'var(--color-border)',
          color: 'text.primary',
          bgcolor: 'var(--color-hover)',
          '&:hover': {
            borderColor: 'var(--color-border-strong)',
            bgcolor: 'var(--color-active)'
          }
        }}
      >
        Get insights
      </Button>
    </Paper>
  )
}
