import React from 'react'
import Header from '../Components/LandingPage/Header'
import HeroSection from '../Components/LandingPage/HeroSection'
import FeaturesSection from '../Components/LandingPage/FeaturesSection'
import CTASection from '../Components/LandingPage/CTASection'

const LandingPage = () => (
  <div className="min-h-screen flex flex-col bg-white overflow-x-hidden" style={{ fontFamily: '"Plus Jakarta Sans", "Noto Sans", sans-serif' }}>
    <Header />
    <main className="px-10 md:px-40 flex-1 py-5">
      <div className="max-w-[960px] mx-auto">
        <HeroSection />
        <FeaturesSection />
        <CTASection />
      </div>
    </main>
  </div>
)

export default LandingPage
