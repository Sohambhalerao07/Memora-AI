import React from 'react'
import { useNavigate } from 'react-router-dom'

function Header() {
  const navigate=useNavigate();
  return (
    <div>
      <header className="flex items-center justify-between border-b border-[#EEEEEE] px-10 py-3">
    <div className="flex items-center gap-4 text-black">
      <div className="size-4">
        <svg viewBox="0 0 48 48" fill="none">
          <path d="M24 4C25.78 14.21 33.78 22.21 44 24C33.78 25.78 25.78 33.78 24 44C22.21 33.78 14.21 25.78 4 24C14.21 22.21 22.21 14.21 24 4Z" fill="currentColor" />
        </svg>
      </div>
      <h2 className="text-lg font-bold">Memora AI</h2>
    </div>
    <div className="flex flex-1 justify-end gap-8">
      <nav className="flex items-center gap-9">
        <a href="#">Features</a>
        <a href="#">Pricing</a>
        <a href="#">Enterprise</a>
        <a href="#">Resources</a>
      </nav>
      <div className="flex gap-2">
        <button className="h-10 px-4 rounded-xl bg-black text-white text-sm font-bold hover:bg-indigo-600 " onClick={()=> navigate("/signup")}>Sign up</button>
        <button className="h-10 px-4 rounded-xl bg-[#EEEEEE] text-black text-sm font-bold  "onClick={() => navigate("/login")}>Log in</button>
      </div>
    </div>
  </header>
    </div>
  )
}

export default Header
