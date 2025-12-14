import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import MuiLink from '@mui/material/Link'
import InputLabel from '@mui/material/InputLabel'
import visuallyHidden from '@mui/utils/visuallyHidden'
import HeroBannerDark from '@/assets/hero-banner-dashboard-dark.png'
import HeroBannerLight from '@/assets/hero-banner-dashboard-light.png'
import { useColorScheme } from '@mui/material/styles'

export default function Hero() {
  const { mode, systemMode } = useColorScheme()

  const heroBanner =
    mode === 'system'
      ? systemMode === 'dark'
        ? HeroBannerDark
        : HeroBannerLight
      : mode === 'dark'
        ? HeroBannerDark
        : HeroBannerLight

  return (
    <Box
      id='hero'
      sx={(theme) => ({
        width: '100%',
        backgroundRepeat: 'no-repeat',
        backgroundImage: 'radial-gradient(ellipse 80% 50% at 50% -20%, hsl(210, 100%, 90%), transparent)',
        ...theme.applyStyles('dark', {
          backgroundImage: 'radial-gradient(ellipse 80% 50% at 50% -20%, hsl(210, 100%, 16%), transparent)'
        })
      })}
    >
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          pt: { xs: 14, sm: 20 },
          pb: { xs: 8, sm: 12 }
        }}
      >
        <Stack spacing={2} useFlexGap sx={{ alignItems: 'center', width: { xs: '100%', sm: '70%' } }}>
          <Typography
            variant='h1'
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: 'center',
              fontSize: 'clamp(3rem, 10vw, 3.5rem)'
            }}
          >
            Our&nbsp;latest&nbsp;
            <Typography
              component='span'
              variant='h1'
              sx={(theme) => ({
                fontSize: 'inherit',
                color: 'primary.main',
                ...theme.applyStyles('dark', {
                  color: 'primary.light'
                })
              })}
            >
              products
            </Typography>
          </Typography>

          <Typography
            sx={{
              textAlign: 'center',
              color: 'text.secondary',
              width: { sm: '100%', md: '80%' }
            }}
          >
            Explore our cutting-edge dashboard, delivering high-quality solutions tailored to your needs. Elevate your
            experience with top-tier features and services.
          </Typography>

          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={1}
            useFlexGap
            sx={{ pt: 2, width: { xs: '100%', sm: '350px' } }}
          >
            <InputLabel htmlFor='email-hero' sx={visuallyHidden}>
              Email
            </InputLabel>
            <TextField
              id='email-hero'
              hiddenLabel
              size='small'
              variant='outlined'
              aria-label='Enter your email address'
              placeholder='Your email address'
              fullWidth
              slotProps={{
                htmlInput: {
                  autoComplete: 'off',
                  'aria-label': 'Enter your email address'
                }
              }}
            />
            <Button variant='contained' color='primary' size='small' sx={{ minWidth: 'fit-content' }}>
              Start now
            </Button>
          </Stack>

          <Typography variant='caption' color='text.secondary' sx={{ textAlign: 'center' }}>
            By clicking &quot;Start now&quot; you agree to our&nbsp;
            <MuiLink href='#' color='primary'>
              Terms & Conditions
            </MuiLink>
            .
          </Typography>
        </Stack>

        <Box
          sx={(theme) => ({
            alignSelf: 'center',
            width: '100%',
            height: '100%',
            marginTop: theme.spacing(4),
            borderRadius: theme.shape.borderRadius,
            outline: '6px solid',
            outlineColor: 'hsla(220, 25%, 80%, 0.2)',
            border: '1px solid',
            borderColor: theme.palette.grey[200],
            [theme.breakpoints.up('sm')]: {
              marginTop: theme.spacing(10)
            },
            ...theme.applyStyles('dark', {
              boxShadow: '0 0 24px 12px hsla(210, 100%, 25%, 0.2)',
              outlineColor: 'hsla(220, 20%, 42%, 0.1)',
              borderColor: theme.palette.grey[700]
            })
          })}
        >
          <img
            src={heroBanner}
            alt='Hero Banner'
            style={{ maxWidth: '100%', display: 'block', borderRadius: 'inherit' }}
          />
        </Box>
      </Container>
    </Box>
  )
}
