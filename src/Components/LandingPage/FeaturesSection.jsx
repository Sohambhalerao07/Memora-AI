import React from 'react'
import FeatureCard from './FeatureCard'

const features = [
  {
    img: 'https://cdn.usegalileo.ai/sdxl10/98fe8964-660d-4278-af4a-1bb6bd84e767.png',
    title: 'Smart face recognition',
    desc: 'Easily find photos of friends and family'
  },
  {
    img: 'https://cdn.usegalileo.ai/sdxl10/9ed0e1d8-abf7-4ec9-86e7-704cbf82cab3.png',
    title: 'Private albums for each guest',
    desc: 'Share photos with friends and family privately'
  },
  {
    img: 'https://cdn.usegalileo.ai/sdxl10/b0b9c839-6505-4390-99fb-2a944dbcba86.png',
    title: 'Instant upload and sharing',
    desc: 'Automatically back up your photos'
  },
  {
    img: 'https://cdn.usegalileo.ai/sdxl10/4aeb7be8-d04c-4b31-9ce8-7cb71fc0987d.png',
    title: 'AI photo curation',
    desc: 'Keep your gallery organized and clutter-free'
  }
]

const FeaturesSection = () => (
  <section className="flex flex-col gap-10 px-4 py-10">
    <div>
      <h1 className="text-2xl md:text-4xl font-bold max-w-[720px] text-black">The features you need</h1>
      <p className="text-base text-black max-w-[720px]">We help you manage your photos, so you can focus on making memories</p>
    </div>
    <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3">
      {features.map((feature, idx) => (
        <FeatureCard key={idx} {...feature} />
      ))}
    </div>
  </section>
)

export default FeaturesSection
