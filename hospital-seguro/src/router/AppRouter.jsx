import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Hospital from '../pages/Hospital';
import Seguro from '../pages/Seguro';
import Login from '../pages/Login';
import Register from '../pages/Register';
import NotFound from '../pages/NotFound';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/hospital" element={<Hospital />} />
      <Route path="/seguro" element={<Seguro />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRouter;
