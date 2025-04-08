// src/App.jsx
import React from "react";
import AppRouter from "./routes/AppRouter";
import { BrowserRouter } from "react-router-dom";
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import "../src/assets/styles/global.css"


const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <AppRouter />
      <Footer />
    </BrowserRouter>
  );
};

export default App;
