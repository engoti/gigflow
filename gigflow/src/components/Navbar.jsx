// src/components/Navbar.jsx
import React, { useState } from 'react';

export default function Navbar({ 
  onLoginClick, 
  isLoggedIn, 
  user, 
  userPlan = 'basic',
  onDashboardClick, 
  onLogout 
}) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <header className="bg-darkAlt/90 backdrop-blur-md border-b border-slate-700 sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <div className="flex items-center gap-2">
          <span className="text-3xl font-bold text-primary">GigFlow</span>
          <span className="text-xs uppercase tracking-wider text-accent font-medium">
            Pro
          </span>
        </div>

        {/* Desktop Links + Auth */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-textLight hover:text-primary transition">Features</a>
          <a href="#pricing" className="text-textLight hover:text-primary transition">Pricing</a>
          <a href="#how" className="text-textLight hover:text-primary transition">How It Works</a>
          <a href="#faq" className="text-textLight hover:text-primary transition">FAQ</a>

          {isLoggedIn ? (
            <div className="flex items-center gap-4">
              <button
                onClick={onDashboardClick}
                className="px-6 py-2.5 bg-primary hover:bg-primaryDark text-white rounded-lg font-medium transition"
              >
                Dashboard
              </button>
              <div className="text-sm text-slate-400">
                {user?.email} <span className="text-accent">({userPlan.toUpperCase()})</span>
              </div>
              <button
                onClick={onLogout}
                className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={onLoginClick}
              className="px-6 py-2.5 bg-primary hover:bg-primaryDark text-white rounded-lg font-medium transition"
            >
              Login / Sign Up
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="md:hidden text-3xl text-textLight focus:outline-none"
        >
          {isMobileOpen ? '✕' : '☰'}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMobileOpen && (
        <div className="fixed inset-0 bg-dark/95 backdrop-blur-lg z-40 flex flex-col pt-20 px-6 md:hidden">
          <div className="flex flex-col items-center gap-8 text-xl font-medium mt-12">
            <button onClick={() => setIsMobileOpen(false)} className="absolute top-6 right-6 text-4xl">×</button>

            <a href="#features" onClick={() => setIsMobileOpen(false)} className="py-4">Features</a>
            <a href="#pricing" onClick={() => setIsMobileOpen(false)} className="py-4">Pricing</a>
            <a href="#how" onClick={() => setIsMobileOpen(false)} className="py-4">How It Works</a>
            <a href="#faq" onClick={() => setIsMobileOpen(false)} className="py-4">FAQ</a>

            {isLoggedIn ? (
              <>
                <button onClick={() => { setIsMobileOpen(false); onDashboardClick(); }} className="mt-8 w-full max-w-xs py-4 bg-primary rounded-xl">
                  Dashboard
                </button>
                <button onClick={() => { setIsMobileOpen(false); onLogout(); }} className="w-full max-w-xs py-4 bg-red-600 rounded-xl">
                  Logout
                </button>
                <div className="text-sm text-accent">Plan: {userPlan.toUpperCase()}</div>
              </>
            ) : (
              <button onClick={() => { setIsMobileOpen(false); onLoginClick(); }} className="mt-8 w-full max-w-xs py-4 bg-primary rounded-xl">
                Login / Sign Up
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}