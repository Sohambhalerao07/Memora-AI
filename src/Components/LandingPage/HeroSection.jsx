import React from 'react'
import { useNavigate } from 'react-router-dom'

function HeroSection() {
  const navigate = useNavigate();
  return (
    <div>
      <section className="flex flex-col md:flex-row gap-8 px-4 py-10">
    <div class="flex-1 flex justify-center w-full">
      <div class="w-full max-w-lg aspect-w-16 aspect-h-9 rounded-2xl overflow-hidden border border-gray-100 bg-gray-50 shadow-sm flex items-center justify-center">
        <img src="https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80" alt="App preview"
          class="object-cover w-full h-full" />
      </div>
    </div>
    <div className="flex flex-col gap-6 justify-center md:min-w-[400px]">
      <div>
        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-black">Memora AI</h1>
        <h2 className="text-base mt-2 text-black">The smartest way to store and share your memories</h2>
      </div>
      <div className="flex gap-3 flex-wrap">
        <button className="h-12 px-5 rounded-xl bg-black text-white text-base font-bold" onClick={() => navigate("/login")}>Get started</button>
        {/* <button className="h-12 px-5 rounded-xl bg-[#EEEEEE] text-black text-base font-bold cursor-pointer " onClick={() => navigate("/login")}>Log in</button> */}
      </div>
    </div>
  </section>
    </div>
  )
}

export default HeroSection
