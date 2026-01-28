// src/components/Hero.jsx
import React from 'react';

export default function Hero({ onUnlockClick }) {
  return (
    <section className="py-24 md:py-32 text-center bg-gradient-to-b from-dark to-darkAlt">
      <div className="max-w-5xl mx-auto px-6">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          Unlock <span className="text-accent">High-Paying</span><br />Writing Gigs
        </h1>
        <p className="text-xl md:text-2xl text-slate-300 mb-10 max-w-3xl mx-auto">
          Pay once → instant access to exclusive clients. No Upwork-style bidding.
        </p>
        <button
          onClick={onUnlockClick}
          className="px-10 py-5 bg-accent hover:bg-emerald-600 text-black font-bold text-xl rounded-xl shadow-2xl transition transform hover:scale-105"
        >
          Get Instant Access – $49
        </button>
      </div>
    </section>
  );
}