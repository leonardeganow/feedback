import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function page() {
  return (
    <div className="flex flex-col items-between justify-between h-screen">
    <Navbar />

    <Footer />
  </div>
  )
}

export default page