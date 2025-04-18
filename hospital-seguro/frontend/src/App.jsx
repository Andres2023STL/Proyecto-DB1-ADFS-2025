import React from 'react'
import AppRoutes from './routes/AppRoutes'
import NavBar from './components/layout/NavBar'
import Footer from './components/layout/Footer'

const App = () => {
  return (
    <>
    <div className="app-container">
      <NavBar />
      
      <main className="app-content">
        <AppRoutes />
      </main>

      <Footer />
    </div>
    </>
  )
}

export default App
