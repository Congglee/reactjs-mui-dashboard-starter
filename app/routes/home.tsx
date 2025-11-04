import Header from '@/components/home/header'
import Hero from '@/components/home/hero'
import type { Route } from './+types/home'
import Box from '@mui/material/Box'
import Companies from '@/components/home/companies'
import Features from '@/components/home/features'
import Divider from '@mui/material/Divider'
import Testimonials from '@/components/home/testimonials'
import Highlights from '@/components/home/Highlights'
import Pricing from '@/components/home/pricing'
import FAQ from '@/components/home/faq'
import Footer from '@/components/home/footer'

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Nexus Dashboard Starter' },
    {
      name: 'description',
      content: 'A production-ready boilerplate template for building modern dashboard applications.'
    }
  ]
}

export default function Home() {
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
