import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer'; // 👈 1. Import the new Footer

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Header />
      <main className="flex-grow">
        <Outlet /> 
      </main>
      <Footer /> 
    </div>
  );
};

export default Layout;