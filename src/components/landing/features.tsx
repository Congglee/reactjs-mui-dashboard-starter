import DashboardDark from '@/assets/features-dashboard-dark.png'
import DashboardDevicesDark from '@/assets/features-dashboard-devices-dark.png'
import DashboardDevicesLight from '@/assets/features-dashboard-devices-light.png'
import DashboardLight from '@/assets/features-dashboard-light.png'
import DashboardMobileDark from '@/assets/features-dashboard-mobile-dark.png'
import DashboardMobileLight from '@/assets/features-dashboard-mobile-light.png'
import DevicesRoundedIcon from '@mui/icons-material/DevicesRounded'
import EdgesensorHighRoundedIcon from '@mui/icons-material/EdgesensorHighRounded'
import ViewQuiltRoundedIcon from '@mui/icons-material/ViewQuiltRounded'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import MuiChip from '@mui/material/Chip'
import Container from '@mui/material/Container'
import { styled, type CSSProperties } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import { useState } from 'react'

const features = [
  {
    icon: <ViewQuiltRoundedIcon />,
    title: 'Dashboard',
    description:
      'This item could provide a snapshot of the most important metrics or data points related to the product.',
    imageLight: `url(${DashboardLight})`,
    imageDark: `url(${DashboardDark})`
  },
  {
    icon: <EdgesensorHighRoundedIcon />,
    title: 'Mobile integration',
    description: 'This item could provide information about the mobile app version of the product.',
    imageLight: `url(${DashboardMobileLight})`,
    imageDark: `url(${DashboardMobileDark})`
  },
  {
    icon: <DevicesRoundedIcon />,
    title: 'Available on all platforms',
    description:
      'This item could let users know the product is available on all platforms, such as web, mobile, and desktop.',
    imageLight: `url(${DashboardDevicesLight})`,
    imageDark: `url(${DashboardDevicesDark})`
  }
]

interface ChipProps {
  selected?: boolean
}

const Chip = styled(MuiChip)<ChipProps>(({ theme }) => ({
  variants: [
    {
      props: ({ selected }) => !!selected,
      style: {
        background: 'linear-gradient(to bottom right, hsl(210, 98%, 48%), hsl(210, 98%, 35%))',
        color: 'hsl(0, 0%, 100%)',
        borderColor: theme.palette.primary.light,
        '& .MuiChip-label': {
          color: 'hsl(0, 0%, 100%)'
        },
        ...theme.applyStyles('dark', {
          borderColor: theme.palette.primary.dark
        })
      }
    }
  ]
}))

export default function Features() {
  const [selectedItemIndex, setSelectedItemIndex] = useState(0)

  const handleItemClick = (index: number) => {
    setSelectedItemIndex(index)
  }

  const selectedFeature = features[selectedItemIndex]

  return (
    <Box id='features' sx={{ py: { xs: 8, sm: 16 } }}>
      <Container maxWidth='lg'>
        <Box sx={{ width: { sm: '100%', md: '60%' } }}>
          <Typography variant='h4' component='h2' gutterBottom sx={{ color: 'text.primary' }}>
            Product features
          </Typography>
          <Typography variant='body1' sx={{ color: 'text.secondary', mb: { xs: 2, sm: 4 } }}>
            Visual kanban boards, flexible workflows, and detailed cards help teams organize work, collaborate in
            real-time, and deliver results faster.
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row-reverse' }, gap: 2 }}>
          <Box sx={{ width: { xs: '100%', md: '50%' } }}>
            <Box
              sx={{
                display: { xs: 'none', sm: 'flex' },
                flexDirection: 'column',
                gap: 2,
                height: '100%'
              }}
            >
              {features.map((feature, index) => (
                <Box
                  key={index}
                  component={Button}
                  onClick={() => handleItemClick(index)}
                  sx={[
                    (theme) => ({
                      p: 2,
                      height: '100%',
                      width: '100%',
                      '&:hover': {
                        backgroundColor: theme.palette.action.hover
                      }
                    }),
                    selectedItemIndex === index && {
                      backgroundColor: 'action.selected'
                    }
                  ]}
                >
                  <Box
                    sx={[
                      {
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'left',
                        gap: 1,
                        textAlign: 'left',
                        textTransform: 'none',
                        color: 'text.secondary'
                      },
                      selectedItemIndex === index && {
                        color: 'text.primary'
                      }
                    ]}
                  >
                    {feature.icon}
                    <Typography variant='h6'>{feature.title}</Typography>
                    <Typography variant='body2'>{feature.description}</Typography>
                  </Box>
                </Box>
              ))}
            </Box>

            <Box
              sx={{
                display: { xs: 'flex', sm: 'none' },
                flexDirection: 'column',
                gap: 2
              }}
            >
              <Box sx={{ display: 'flex', gap: 2, overflow: 'auto' }}>
                {features.map((feature, index) => (
                  <Chip
                    size='medium'
                    key={index}
                    label={feature.title}
                    onClick={() => handleItemClick(index)}
                    selected={selectedItemIndex === index}
                  />
                ))}
              </Box>
              <Card variant='outlined'>
                <Box
                  sx={(theme) => ({
                    mb: 2,
                    backgroundSize: 'cover',
                    backgroundPosition: 'top center',
                    backgroundRepeat: 'no-repeat',
                    minHeight: 250,
                    backgroundImage: features[selectedItemIndex].imageLight,
                    ...theme.applyStyles('dark', {
                      backgroundImage: features[selectedItemIndex].imageDark
                    })
                  })}
                  style={
                    features[selectedItemIndex]
                      ? ({
                          '--items-image': features[selectedItemIndex].imageLight
                        } as CSSProperties)
                      : {}
                  }
                />
                <Box sx={{ px: 2, pb: 2 }}>
                  <Typography gutterBottom sx={{ color: 'text.primary', fontWeight: 'medium' }}>
                    {selectedFeature.title}
                  </Typography>
                  <Typography variant='body2' sx={{ color: 'text.secondary', mb: 1.5 }}>
                    {selectedFeature.description}
                  </Typography>
                </Box>
              </Card>
            </Box>
          </Box>

          <Box
            sx={{
              display: { xs: 'none', sm: 'flex' },
              width: { xs: '100%', md: '50%' },
              height: 'var(--items-image-height)'
            }}
          >
            <Card
              variant='outlined'
              sx={{
                height: '100%',
                width: '100%',
                display: { xs: 'none', sm: 'flex' },
                pointerEvents: 'none'
              }}
            >
              <Box
                sx={(theme) => ({
                  m: 'auto',
                  width: '100%',
                  height: { xs: 300, sm: 500 },
                  backgroundSize: 'contain',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center',
                  backgroundImage: features[selectedItemIndex].imageLight,
                  ...theme.applyStyles('dark', {
                    backgroundImage: features[selectedItemIndex].imageDark
                  })
                })}
                style={
                  features[selectedItemIndex]
                    ? ({
                        '--items-image': features[selectedItemIndex].imageLight
                      } as CSSProperties)
                    : {}
                }
              />
            </Card>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}
