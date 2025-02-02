import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Historia from './pages/Historia';
import FAQ from './pages/FAQ';
import Contacto from './pages/Contacto';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Error404 from './pages/Error404';

function App() {
  return (
    <Router>
      <div className="layout">
        <Header />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/historia" element={<Historia />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="*" element={<Error404 />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
