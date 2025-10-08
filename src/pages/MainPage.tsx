import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ShowcaseGaming from '../components/ShowcaseGaming'

const MainPage = () => {
  return (
    <div>
      <Navbar />
      {/* this give access to other component that are not consistent on the landing page to be shown here */}
      {/* check the landing page for other components on the landingpage */}
      <Outlet />
      <ShowcaseGaming />
      <Footer />
    </div>
  )
}

export default MainPage