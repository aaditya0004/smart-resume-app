import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer'; // 👈 1. Import the new Footer

const Layout = () => {
  return (
    // 👇 2. Set the main background color here for all pages
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Header />
      <main className="flex-grow">
        <Outlet /> {/* Page components will be rendered here */}
      </main>
      <Footer /> {/* 👈 3. Add the Footer component */}
    </div>
  );
};

export default Layout;