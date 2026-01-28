// src/components/Navbar.jsx
import React, { useState } from 'react';

export default function Navbar({ onLoginClick }) {
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

        {/* Desktop Links + Login */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-textLight hover:text-primary transition">
            Features
          </a>
          <a href="#pricing" className="text-textLight hover:text-primary transition">
            Pricing
          </a>
          <a href="#how" className="text-textLight hover:text-primary transition">
            How It Works
          </a>
          <a href="#faq" className="text-textLight hover:text-primary transition">
            FAQ
          </a>

          <button
            onClick={onLoginClick}
            className="px-6 py-2.5 bg-primary hover:bg-primaryDark text-white rounded-lg font-medium transition"
          >
            Login / Sign Up
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="md:hidden text-3xl text-textLight focus:outline-none"
          aria-label="Toggle menu"
        >
          {isMobileOpen ? '✕' : '☰'}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-dark/95 backdrop-blur-lg z-40 flex flex-col pt-20 px-6 animate-fadeIn md:hidden"
          onClick={() => setIsMobileOpen(false)} // close on outside click
        >
          {/* Prevent closing when clicking inside menu */}
          <div 
            className="flex flex-col items-center gap-8 text-xl font-medium mt-12"
            onClick={(e) => e.stopPropagation()} // stop propagation
          >
            {/* Close button inside menu */}
            <button
              onClick={() => setIsMobileOpen(false)}
              className="absolute top-6 right-6 text-4xl text-slate-300 hover:text-white"
            >
              ×
            </button>

            <a 
              href="#features" 
              onClick={() => setIsMobileOpen(false)}
              className="text-textLight hover:text-primary transition py-4 w-full text-center"
            >
              Features
            </a>
            <a 
              href="#pricing" 
              onClick={() => setIsMobileOpen(false)}
              className="text-textLight hover:text-primary transition py-4 w-full text-center"
            >
              Pricing
            </a>
            <a 
              href="#how" 
              onClick={() => setIsMobileOpen(false)}
              className="text-textLight hover:text-primary transition py-4 w-full text-center"
            >
              How It Works
            </a>
            <a 
              href="#faq" 
              onClick={() => setIsMobileOpen(false)}
              className="text-textLight hover:text-primary transition py-4 w-full text-center"
            >
              FAQ
            </a>

            {/* Login / Sign Up in mobile menu */}
            <button
              onClick={() => {
                setIsMobileOpen(false);
                onLoginClick();
              }}
              className="mt-8 px-10 py-4 bg-primary hover:bg-primaryDark text-white rounded-xl font-medium transition text-lg w-full max-w-xs"
            >
              Login / Sign Up
            </button>
          </div>
        </div>
      )}
    </header>
  );
}