import React from 'react'
import Navbar from  '../Components/Dashboard/Navbar'
import Header from '../Components/Common/Header'
import TrusteeDetail from '../Components/Dashboard/TrusteeDetail'
import Projects from '../Components/Dashboard/Projects'
import Cities from '../Components/Dashboard/Cities'
import Footer from '../Components/Common/Footer'

const Dashboard = () => {
  return (
    <div>
      <Navbar />
      <Header />
      <TrusteeDetail />
      <Projects />
      <Cities />
      <Footer />
    </div>
  )
}

export default Dashboard
