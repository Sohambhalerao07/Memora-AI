import React from 'react'
import Navbar from '../Components/HomePage/Navbar'
import WelcomeBanner from '../Components/HomePage/WelcomeBanner'
import Sidebar from '../Components/HomePage/Sidebar'
import PhotoGrid from '../Components/HomePage/PhotoGrid'
import FloatingUploadButton from '../Components/HomePage/FloatingUploadButton'

function HomePage() {
  return (
     <div className="bg-gray-50 min-h-screen text-gray-900">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <WelcomeBanner />
      </div>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row gap-8 mt-8">
        <Sidebar />
        <PhotoGrid />
      </main>
      <FloatingUploadButton />
    </div>
  )
}

export default HomePage
