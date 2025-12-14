import Companies from '@/components/landing/companies'
import FAQ from '@/components/landing/faq'
import Features from '@/components/landing/features'
import Footer from '@/components/landing/footer'
import Header from '@/components/landing/header'
import Hero from '@/components/landing/hero'
import Highlights from '@/components/landing/highlights'
import Pricing from '@/components/landing/pricing'
import Testimonials from '@/components/landing/testimonials'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'

export default function Landing() {
  return (
    <>
      <Header />
      <Hero />
      <Box>
        <Companies />
        <Features />
        <Divider />
        <Testimonials />
        <Divider />
        <Highlights />
        <Divider />
        <Pricing />
        <Divider />
        <FAQ />
        <Divider />
        <Footer />
      </Box>
    </>
  )
}
