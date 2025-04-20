import React from 'react'
import AppRoutes from './routes/AppRoutes'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Header from './components/layout/Header'

const App = () => {
  return (
    <>
      <Header />
      <Navbar />
      <AppRoutes />
      <Footer />
    </>
  )
}

export default App
