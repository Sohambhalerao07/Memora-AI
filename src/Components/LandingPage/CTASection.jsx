import React from 'react'

const CTASection = () => (
  <section className="p-4">
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 rounded-xl border border-[#DEDEDE] bg-white p-5">
      <div>
        <p className="text-base font-bold">Ready to get started?</p>
        <p className="text-base text-[#6B6B6B]">Join today and get 50% off your first year</p>
      </div>
      <button className="h-8 px-4 rounded-xl bg-black text-white text-sm font-medium">Sign up</button>
    </div>
  </section>
)

export default CTASection
