import React from 'react'
import AppRoutes from './routes/AppRoutes'
import NavBar from './components/layout/NavBar'
import Footer from './components/layout/Footer'
import Header from './components/layout/Header'

const App = () => {
  return (
    <>
    <div className="app-container">
      <NavBar />
      
      <Header />

      <main className="app-content">
        <AppRoutes />
      </main>

      <Footer />
    </div>
    </>
  )
}

export default App
