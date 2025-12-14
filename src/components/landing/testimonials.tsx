import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import { useColorScheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import Avatar1 from '@/assets/testimonials-avatar-1.jpg'
import Avatar2 from '@/assets/testimonials-avatar-2.jpg'
import Avatar3 from '@/assets/testimonials-avatar-3.jpg'
import Avatar4 from '@/assets/testimonials-avatar-4.jpg'
import Avatar5 from '@/assets/testimonials-avatar-5.jpg'
import Avatar6 from '@/assets/testimonials-avatar-6.jpg'

const testimonials = [
  {
    avatar: <Avatar alt='Remy Sharp' src={Avatar1} />,
    name: 'Remy Sharp',
    occupation: 'Senior Engineer',
    testimonial:
      "I absolutely love how versatile this product is! Whether I'm tackling work projects or indulging in my favorite hobbies, it seamlessly adapts to my changing needs. Its intuitive design has truly enhanced my daily routine, making tasks more efficient and enjoyable."
  },
  {
    avatar: <Avatar alt='Travis Howard' src={Avatar2} />,
    name: 'Travis Howard',
    occupation: 'Lead Product Designer',
    testimonial:
      "One of the standout features of this product is the exceptional customer support. In my experience, the team behind this product has been quick to respond and incredibly helpful. It's reassuring to know that they stand firmly behind their product."
  },
  {
    avatar: <Avatar alt='Cindy Baker' src={Avatar3} />,
    name: 'Cindy Baker',
    occupation: 'CTO',
    testimonial:
      'The level of simplicity and user-friendliness in this product has significantly simplified my life. I appreciate the creators for delivering a solution that not only meets but exceeds user expectations.'
  },
  {
    avatar: <Avatar alt='Remy Sharp' src={Avatar4} />,
    name: 'Julia Stewart',
    occupation: 'Senior Engineer',
    testimonial:
      "I appreciate the attention to detail in the design of this product. The small touches make a big difference, and it's evident that the creators focused on delivering a premium experience."
  },
  {
    avatar: <Avatar alt='Travis Howard' src={Avatar5} />,
    name: 'John Smith',
    occupation: 'Product Designer',
    testimonial:
      "I've tried other similar products, but this one stands out for its innovative features. It's clear that the makers put a lot of thought into creating a solution that truly addresses user needs."
  },
  {
    avatar: <Avatar alt='Cindy Baker' src={Avatar6} />,
    name: 'Daniel Wolf',
    occupation: 'CDO',
    testimonial:
      "The quality of this product exceeded my expectations. It's durable, well-designed, and built to last. Definitely worth the investment!"
  }
]

const lightModeLogos = [
  'https://35z23d3vth.ufs.sh/f/S5pa1AZTQ5KAZNAhvIPRvP1kJeo5WtxDd6gsIVYzjwXHyfMK',
  'https://35z23d3vth.ufs.sh/f/S5pa1AZTQ5KASOIpWndZTQ5KAthD84CypuL761YnNJsIleRj',
  'https://35z23d3vth.ufs.sh/f/S5pa1AZTQ5KApXO0OG4ach4iVN5xvWGTnEwzKOtRgmfyu7M3',
  'https://35z23d3vth.ufs.sh/f/S5pa1AZTQ5KAjFYGXH0B20tDSxerGVLyFZo67lEMvshA1ipn',
  'https://35z23d3vth.ufs.sh/f/S5pa1AZTQ5KA0PKRlT3GoH2Wpwz8he9cNlfTgmBusy3LRJiD',
  'https://35z23d3vth.ufs.sh/f/S5pa1AZTQ5KAgRP8Hd4jXs2wIWKYVSvG7Ptqm8fg53hCpRTA'
]

const darkModeLogos = [
  'https://35z23d3vth.ufs.sh/f/S5pa1AZTQ5KA6jqkc5pxyu8GInpsUPTbA9VQLadzgFMNjv3H',
  'https://35z23d3vth.ufs.sh/f/S5pa1AZTQ5KAcCOn1henoQDleYaSW4Ed5jfFwC3b9Zv8AUgm',
  'https://35z23d3vth.ufs.sh/f/S5pa1AZTQ5KAchGkgdenoQDleYaSW4Ed5jfFwC3b9Zv8AUgm',
  'https://35z23d3vth.ufs.sh/f/S5pa1AZTQ5KAEoTIh0wkKTGRcI7a4lQPHgx6pu23OzUvD1NW',
  'https://35z23d3vth.ufs.sh/f/S5pa1AZTQ5KAy8rnMa7cSDweR1k8p4jOfn7W6IsK5rUNGuZi',
  'https://35z23d3vth.ufs.sh/f/S5pa1AZTQ5KAUUsx5IdUZohctfVvlu70X4mRGxDHbg6PrCIi'
]

export default function Testimonials() {
  const { mode, systemMode } = useColorScheme()

  // Calculate logos directly from mode and systemMode (derived state)
  const logos =
    mode === 'system'
      ? systemMode === 'light'
        ? lightModeLogos
        : darkModeLogos
      : mode === 'light'
        ? lightModeLogos
        : darkModeLogos

  return (
    <Box
      id='testimonials'
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: { xs: 3, sm: 6 }
      }}
    >
      <Container
        maxWidth='lg'
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: { xs: 3, sm: 6 }
        }}
      >
        <Box
          sx={{
            width: { sm: '100%', md: '60%' },
            textAlign: { sm: 'left', md: 'center' }
          }}
        >
          <Typography variant='h4' component='h2' gutterBottom sx={{ color: 'text.primary' }}>
            Testimonials
          </Typography>
          <Typography variant='body1' sx={{ color: 'text.secondary' }}>
            Teams use Trellone to stay organized, collaborate in real-time, and ship faster. See how kanban boards help
            teams move work forward.
          </Typography>
        </Box>

        <Grid container spacing={2}>
          {testimonials.map((testimonial, index) => (
            <Grid key={index} size={{ xs: 12, sm: 6, md: 4 }} sx={{ display: 'flex' }}>
              <Card
                variant='outlined'
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  flexGrow: 1
                }}
              >
                <CardContent>
                  <Typography variant='body1' gutterBottom sx={{ color: 'text.secondary', fontStyle: 'italic' }}>
                    &quot;{testimonial.testimonial}&quot;
                  </Typography>
                </CardContent>

                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                  <CardHeader avatar={testimonial.avatar} title={testimonial.name} subheader={testimonial.occupation} />
                  <img src={logos[index]} alt={`Logo ${index + 1}`} style={{ width: '64px', opacity: 0.3 }} />
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  )
}
