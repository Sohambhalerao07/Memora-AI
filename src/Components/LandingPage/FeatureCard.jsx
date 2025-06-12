import React from 'react'

const FeatureCard = ({ img, title, desc }) => (
  <div className="flex flex-col gap-3 pb-3">
    <div className="aspect-video bg-cover bg-center rounded-xl" style={{ backgroundImage: `url(${img})` }} />
    <div>
      <p className="text-base font-medium">{title}</p>
      <p className="text-sm text-[#6B6B6B]">{desc}</p>
    </div>
  </div>
)

export default FeatureCard
