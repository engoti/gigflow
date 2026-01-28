// src/App.js
import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [hasPaid, setHasPaid] = useState(false);           // tracks if user has "paid"
  const [isSignup, setIsSignup] = useState(true);          // toggle Sign Up vs Login tab
  const [isLoggedIn, setIsLoggedIn] = useState(false);     // tracks logged-in state

  // FAQ accordion state
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqItems = [
    {
      question: "What exactly do I get after paying?",
      answer: "You get lifetime access to our exclusive, vetted writing gigs database (80–150+ per month on Pro/Elite), direct client contacts, priority alerts, pitch templates, private Discord community, and all future updates. No recurring fees."
    },
    {
      question: "How do payments work?",
      answer: "We use NOWPayments for secure one-time crypto payments (supports BTC, USDT, ETH, and 300+ coins). After payment, refresh the page or contact support to activate your account."
    },
    {
      question: "Is there a refund policy?",
      answer: "Yes — 30-day money-back guarantee. If you're not satisfied within the first month, contact support with your transaction ID for a full refund (processed in crypto or fiat equivalent)."
    },
    {
      question: "Do I need to be a pro writer to use this?",
      answer: "No. We have gigs for beginners (Basic plan) up to experienced writers (Elite). All gigs are high-paying compared to public platforms like Upwork."
    },
    {
      question: "How do I contact clients?",
      answer: "After login, you get direct email addresses, client names, and brief details. You pitch directly — no bidding or middleman."
    },
    {
      question: "What if a client doesn't pay?",
      answer: "We vet clients and only list serious opportunities. We also provide invoice templates and tips to protect yourself. If issues arise, our Discord community can help."
    },
    {
      question: "Can I cancel or downgrade?",
      answer: "Since it's a one-time lifetime payment, there is no subscription to cancel. You keep access forever."
    }
  ];

  return (
    <div className="min-h-screen bg-dark text-textLight">

      {/* Navbar */}
      <Navbar 
        onLoginClick={() => setShowLogin(true)}
        isLoggedIn={isLoggedIn}
        onDashboardClick={() => alert("Full dashboard coming soon! (Demo)")}
      />

      {/* Hero */}
      <Hero onUnlockClick={() => setShowPayment(true)} />

      {/* Pricing */}
      <section id="pricing" className="py-20 bg-darkAlt">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-6">
            Simple, One-Time Pricing
          </h2>
          <p className="text-xl text-center text-slate-400 mb-16">
            Choose your access level. Lifetime updates included. No recurring fees.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Basic Plan */}
            <div className="bg-slate-800/50 border border-slate-700 rounded-3xl p-8 flex flex-col">
              <h3 className="text-2xl font-bold mb-4 text-center">Basic</h3>
              <div className="text-5xl font-bold text-center mb-2">
                $19<span className="text-xl text-slate-400"> one-time</span>
              </div>
              <p className="text-slate-400 text-center mb-8 mt-2">
                Perfect for beginners
              </p>

              <ul className="space-y-4 mb-10 flex-grow">
                <li className="flex items-center gap-3">
                  <span className="text-accent">✓</span> 20–30 gigs/month
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-accent">✓</span> Email alerts
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-accent">✓</span> Basic filters
                </li>
                <li className="flex items-center gap-3 text-slate-500 line-through">
                  <span>✗</span> Direct client contacts
                </li>
                <li className="flex items-center gap-3 text-slate-500 line-through">
                  <span>✗</span> Tools & templates
                </li>
              </ul>

              <button 
                onClick={() => setShowPayment(true)}
                className="mt-auto w-full py-4 bg-slate-700 hover:bg-slate-600 text-white rounded-xl transition"
              >
                Choose Basic
              </button>
            </div>

            {/* Pro Plan */}
            <div className="bg-gradient-to-b from-indigo-900/40 to-slate-900 border-2 border-primary rounded-3xl p-8 flex flex-col relative scale-105 shadow-2xl">
              <div className="absolute -top-3 right-6 bg-primary text-white text-sm px-4 py-1 rounded-full">
                Most Popular
              </div>
              <h3 className="text-3xl font-bold mb-4 text-center text-white">Pro</h3>
              <div className="text-6xl font-bold text-center mb-2">
                $49<span className="text-2xl text-slate-300"> one-time</span>
              </div>
              <p className="text-slate-300 text-center mb-8 mt-2">
                Full access – recommended
              </p>

              <ul className="space-y-4 mb-10 flex-grow text-white">
                <li className="flex items-center gap-3">
                  <span className="text-accent">✓</span> 80–150+ gigs/month
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-accent">✓</span> Direct client contacts
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-accent">✓</span> Priority alerts
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-accent">✓</span> Pitch templates & tools
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-accent">✓</span> Private Discord
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-accent">✓</span> Lifetime updates
                </li>
              </ul>

              <button
                onClick={() => setShowPayment(true)}
                className="mt-auto w-full py-5 bg-accent hover:bg-emerald-600 text-black font-bold text-xl rounded-xl transition shadow-lg"
              >
                Unlock Pro Now
              </button>
            </div>

            {/* Elite Plan */}
            <div className="bg-slate-800/50 border border-slate-700 rounded-3xl p-8 flex flex-col">
              <h3 className="text-2xl font-bold mb-4 text-center">Elite</h3>
              <div className="text-5xl font-bold text-center mb-2">
                $99<span className="text-xl text-slate-400"> one-time</span>
              </div>
              <p className="text-slate-400 text-center mb-8 mt-2">
                For serious full-time writers
              </p>

              <ul className="space-y-4 mb-10 flex-grow">
                <li className="flex items-center gap-3">
                  <span className="text-accent">✓</span> Everything in Pro
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-accent">✓</span> VIP client intros (1–2/mo)
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-accent">✓</span> Personal pitch reviews
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-accent">✓</span> Early access to hidden gigs
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-accent">✓</span> 1-on-1 onboarding call
                </li>
              </ul>

              <button 
                onClick={() => setShowPayment(true)}
                className="mt-auto w-full py-4 bg-primary hover:bg-primaryDark text-white rounded-xl transition"
              >
                Choose Elite
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            Why Serious Writers Choose GigFlow
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8 hover:border-primary transition-all duration-300 hover:shadow-xl">
              <div className="text-4xl mb-4">💎</div>
              <h3 className="text-2xl font-bold mb-4 text-primary">Exclusive, High-Paying Gigs</h3>
              <p className="text-slate-300">
                Hand-vetted opportunities from serious clients (SaaS, finance, health, tech). Average rates $0.20–$0.80/word — 3–5× higher than public platforms.
              </p>
            </div>

            <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8 hover:border-primary transition-all duration-300 hover:shadow-xl">
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="text-2xl font-bold mb-4 text-primary">No Bidding Wars</h3>
              <p className="text-slate-300">
                Direct client contacts — no competing with 50+ proposals. First-come, first-served on premium briefs.
              </p>
            </div>

            <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8 hover:border-primary transition-all duration-300 hover:shadow-xl">
              <div className="text-4xl mb-4">📩</div>
              <h3 className="text-2xl font-bold mb-4 text-primary">Daily Fresh Opportunities</h3>
              <p className="text-slate-300">
                New gigs delivered straight to your inbox + searchable dashboard. Never miss high-value projects again.
              </p>
            </div>

            <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8 hover:border-primary transition-all duration-300 hover:shadow-xl">
              <div className="text-4xl mb-4">🛠️</div>
              <h3 className="text-2xl font-bold mb-4 text-primary">Pro Tools & Templates</h3>
              <p className="text-slate-300">
                Cold-pitch scripts, invoice templates, client CRM lite, rate calculators — everything built for serious freelancers.
              </p>
            </div>

            <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8 hover:border-primary transition-all duration-300 hover:shadow-xl">
              <div className="text-4xl mb-4">👥</div>
              <h3 className="text-2xl font-bold mb-4 text-primary">Private Community</h3>
              <p className="text-slate-300">
                Join our Discord for peer support, client feedback, monthly AMAs with top writers, and exclusive networking.
              </p>
            </div>

            <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8 hover:border-primary transition-all duration-300 hover:shadow-xl">
              <div className="text-4xl mb-4">🔒</div>
              <h3 className="text-2xl font-bold mb-4 text-primary">One-Time, Lifetime Access</h3>
              <p className="text-slate-300">
                Pay once — keep full access forever, including all future updates and new gig sources. No monthly fees.
              </p>
            </div>
          </div>

          <div className="text-center mt-16">
            <button
              onClick={() => setShowPayment(true)}
              className="px-10 py-5 bg-accent hover:bg-emerald-600 text-black font-bold text-xl rounded-xl shadow-2xl transition transform hover:scale-105"
            >
              Unlock These Benefits Now – From $19
            </button>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how" className="py-20 bg-dark">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            How GigFlow Works – Simple & Fast
          </h2>

          <div className="grid md:grid-cols-4 gap-8 md:gap-12 relative">
            <div className="relative text-center">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/20 flex items-center justify-center text-3xl font-bold text-primary">
                1
              </div>
              <h3 className="text-2xl font-bold mb-4">Choose Your Plan</h3>
              <p className="text-slate-300">
                Pick Basic ($19), Pro ($49), or Elite ($99) – one-time payment, no subscriptions.
              </p>
            </div>

            <div className="hidden md:block absolute top-10 left-1/4 right-1/4 h-0.5 bg-slate-700" />

            <div className="relative text-center">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/20 flex items-center justify-center text-3xl font-bold text-primary">
                2
              </div>
              <h3 className="text-2xl font-bold mb-4">Pay Securely</h3>
              <p className="text-slate-300">
                Pay once with crypto (BTC, USDT, ETH + 300+ coins) via NOWPayments – instant confirmation.
              </p>
            </div>

            <div className="hidden md:block absolute top-10 left-2/4 right-2/4 h-0.5 bg-slate-700" />

            <div className="relative text-center">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/20 flex items-center justify-center text-3xl font-bold text-primary">
                3
              </div>
              <h3 className="text-2xl font-bold mb-4">Get Instant Access</h3>
              <p className="text-slate-300">
                Return to the site, refresh, or contact support – your account is activated immediately.
              </p>
            </div>

            <div className="hidden md:block absolute top-10 left-3/4 right-3/4 h-0.5 bg-slate-700" />

            <div className="relative text-center">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/20 flex items-center justify-center text-3xl font-bold text-primary">
                4
              </div>
              <h3 className="text-2xl font-bold mb-4">Start Applying</h3>
              <p className="text-slate-300">
                Log in → browse exclusive gigs → contact clients directly → get paid high rates.
              </p>
            </div>
          </div>

          <div className="text-center mt-16">
            <button
              onClick={() => setShowPayment(true)}
              className="px-10 py-5 bg-accent hover:bg-emerald-600 text-black font-bold text-xl rounded-xl shadow-2xl transition transform hover:scale-105"
            >
              Get Started Now – From $19
            </button>
            <p className="mt-6 text-slate-400">
              One-time payment • Lifetime access • No hidden fees
            </p>
          </div>
        </div>
      </section>

      {/* FAQ section */}
      <section id="faq" className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <div 
                key={index}
                className="bg-slate-800/50 border border-slate-700 rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-5 text-left flex justify-between items-center font-medium text-lg hover:bg-slate-700/50 transition"
                >
                  <span>{item.question}</span>
                  <span className="text-2xl text-accent">
                    {openFaq === index ? '−' : '+'}
                  </span>
                </button>

                {openFaq === index && (
                  <div className="px-6 pb-5 text-slate-300 border-t border-slate-700">
                    <p>{item.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-slate-400 mb-4">
              Still have questions?
            </p>
            <button
              onClick={() => alert("Contact support: support@gigflow.pro (demo)")}
              className="px-8 py-4 bg-primary hover:bg-primaryDark text-white font-medium rounded-xl transition"
            >
              Contact Support
            </button>
          </div>
        </div>
      </section>

      {/* Dashboard Preview */}
      {isLoggedIn && (
        <section className="py-16 bg-gradient-to-b from-darkAlt to-dark">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Welcome to Your GigFlow Dashboard
              </h2>
              <p className="text-xl text-slate-300">
                You now have full access to exclusive writing gigs
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 relative">
              <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-10 rounded-xl">
                <div className="text-center px-8">
                  <h3 className="text-2xl font-bold text-accent mb-4">
                    Full Dashboard Unlocked
                  </h3>
                  <p className="text-slate-200 mb-6">
                    See all premium gigs, apply directly, and track earnings.
                  </p>
                  <button className="px-8 py-4 bg-accent hover:bg-emerald-600 text-black font-bold rounded-xl transition">
                    Explore Gigs Now
                  </button>
                </div>
              </div>

              <div className="bg-slate-800/70 border border-slate-600 rounded-2xl p-6 blur-sm pointer-events-none">
                <p className="text-accent font-semibold mb-2">Fintech Blog</p>
                <h4 className="text-xl font-bold mb-3">DeFi Trends 2026 – 2000 words</h4>
                <p className="text-slate-400 mb-4">$0.55/word • Payable via PayPal</p>
                <p className="text-sm text-slate-500">Client: US-based crypto startup</p>
              </div>

              <div className="bg-slate-800/70 border border-slate-600 rounded-2xl p-6 blur-sm pointer-events-none">
                <p className="text-accent font-semibold mb-2">SaaS Company</p>
                <h4 className="text-xl font-bold mb-3">Email Sequence for AI Feature Launch</h4>
                <p className="text-slate-400 mb-4">$0.70/word • Up to 3500 words</p>
                <p className="text-sm text-slate-500">Recurring potential</p>
              </div>

              <div className="bg-slate-800/70 border border-slate-600 rounded-2xl p-6 blur-sm pointer-events-none">
                <p className="text-accent font-semibold mb-2">Health Affiliate</p>
                <h4 className="text-xl font-bold mb-3">Ultimate Sleep Optimization Guide – 4500 words</h4>
                <p className="text-slate-400 mb-4">$0.42/word • SEO optimized</p>
                <p className="text-sm text-slate-500">High-traffic site</p>
              </div>
            </div>

            <div className="text-center mt-12 text-slate-400">
              <p>More gigs loading... (full access unlocked after login)</p>
            </div>
          </div>
        </section>
      )}

      {/* Payment modal */}
      {showPayment && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 px-4">
          <div className="bg-slate-900 rounded-2xl p-8 md:p-10 max-w-lg w-full relative overflow-hidden">
            <button
              onClick={() => setShowPayment(false)}
              className="absolute top-4 right-6 text-3xl text-slate-400 hover:text-white transition"
            >
              ×
            </button>

            <h2 className="text-3xl font-bold mb-2 text-center">Choose Your Plan</h2>
            <p className="text-center text-slate-400 mb-10">
              Pay once with cryptocurrency via NOWPayments<br />
              (BTC, USDT, ETH + 300+ coins supported)
            </p>

            <div className="space-y-6">
              <a
                href="https://nowpayments.io/payment/?iid=6382545246"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setShowPayment(false)}
                className="block w-full py-5 px-6 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-xl text-center transition text-white font-medium"
              >
                <div className="text-xl font-bold mb-1">Basic – $19 one-time</div>
                <div className="text-sm text-slate-400">
                  Pay Now → Opens NOWPayments in new tab
                </div>
              </a>

              <a
                href="https://nowpayments.io/payment/?iid=6313323438"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setShowPayment(false)}
                className="block w-full py-6 px-6 bg-gradient-to-r from-indigo-600 to-indigo-800 hover:from-indigo-500 hover:to-indigo-700 rounded-xl text-center transition shadow-lg"
              >
                <div className="text-2xl font-bold mb-1 text-white">Pro – $49 one-time</div>
                <div className="text-base text-indigo-200 font-medium">
                  Recommended • Pay Now → Opens NOWPayments
                </div>
              </a>

              <a
                href="https://nowpayments.io/payment/?iid=5061273629"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setShowPayment(false)}
                className="block w-full py-5 px-6 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-xl text-center transition text-white font-medium"
              >
                <div className="text-xl font-bold mb-1">Elite – $99 one-time</div>
                <div className="text-sm text-slate-400">
                  Pay Now → Opens NOWPayments in new tab
                </div>
              </a>
            </div>

            <div className="mt-10 text-center text-sm text-slate-400">
              <p>After successful payment:</p>
              <p className="mt-2">
                Return to this page and <span className="text-accent font-medium">refresh</span>,<br />
                or contact support to activate your access.
              </p>
              <p className="mt-4 text-slate-500">
                All payments processed securely by NOWPayments
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Login / Signup modal */}
      {showLogin && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 px-4">
          <div className="bg-slate-900 rounded-2xl p-8 md:p-10 max-w-md w-full relative">

            <button
              onClick={() => setShowLogin(false)}
              className="absolute top-5 right-6 text-3xl text-slate-400 hover:text-white transition"
            >
              ×
            </button>

            <h2 className="text-3xl font-bold mb-6 text-center">
              {hasPaid ? "Welcome Back" : "Get Started"}
            </h2>

            <div className="flex mb-8 border-b border-slate-700">
              <button
                onClick={() => setIsSignup(true)}
                className={`flex-1 py-3 font-medium text-center transition ${
                  isSignup ? "text-accent border-b-2 border-accent font-bold" : "text-slate-400 hover:text-slate-300"
                }`}
              >
                Sign Up
              </button>
              <button
                onClick={() => setIsSignup(false)}
                className={`flex-1 py-3 font-medium text-center transition ${
                  !isSignup ? "text-accent border-b-2 border-accent font-bold" : "text-slate-400 hover:text-slate-300"
                }`}
              >
                Login
              </button>
            </div>

            {isSignup && (
              <div>
                {hasPaid ? (
                  <div className="text-center py-8">
                    <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-emerald-500/20 flex items-center justify-center">
                      <svg className="w-12 h-12 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-accent">Payment Confirmed!</h3>
                    <p className="text-slate-300 mb-8">
                      Create your account to start.
                    </p>

                    <form className="space-y-6">
                      <div>
                        <label className="block text-sm text-slate-300 mb-2">Email</label>
                        <input
                          type="email"
                          placeholder="you@example.com"
                          className="w-full p-4 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-primary"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm text-slate-300 mb-2">Password</label>
                        <input
                          type="password"
                          placeholder="••••••••"
                          className="w-full p-4 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-primary"
                          required
                        />
                      </div>

                      <button
                        type="submit"
                        onClick={(e) => {
                          e.preventDefault();
                          setIsLoggedIn(true);
                          setHasPaid(true);
                          setShowLogin(false);
                          alert("Account created! Welcome to your dashboard.");
                        }}
                        className="w-full py-5 bg-accent hover:bg-emerald-600 text-black font-bold text-xl rounded-xl transition"
                      >
                        Create Account
                      </button>
                    </form>
                  </div>
                ) : (
                  <div className="text-center">
                    <p className="text-slate-300 mb-6 text-lg">
                      Sign up requires a one-time payment
                    </p>
                    <p className="text-slate-400 mb-8">
                      Choose your plan below
                    </p>

                    <div className="space-y-4">
                      <a
                        href="https://nowpayments.io/payment/?iid=6382545246"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setShowLogin(false)}
                        className="block w-full py-4 px-6 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-xl text-center transition text-white font-medium"
                      >
                        Basic – $19
                      </a>

                      <a
                        href="https://nowpayments.io/payment/?iid=6313323438"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setShowLogin(false)}
                        className="block w-full py-5 px-6 bg-gradient-to-r from-indigo-600 to-indigo-800 hover:from-indigo-500 hover:to-indigo-700 rounded-xl text-center transition text-white font-bold shadow-lg"
                      >
                        Pro – $49 (Recommended)
                      </a>

                      <a
                        href="https://nowpayments.io/payment/?iid=5061273629"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setShowLogin(false)}
                        className="block w-full py-4 px-6 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-xl text-center transition text-white font-medium"
                      >
                        Elite – $99
                      </a>
                    </div>

                    <p className="mt-8 text-sm text-slate-500">
                      After payment, return here to complete signup.
                    </p>
                  </div>
                )}
              </div>
            )}

            {!isSignup && (
              <form className="space-y-6">
                <div>
                  <label className="block text-sm text-slate-300 mb-2">Email</label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    className="w-full p-4 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-primary"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm text-slate-300 mb-2">Password</label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full p-4 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-primary"
                    required
                  />
                </div>

                <div className="text-right mt-2">
                  <button
                    type="button"
                    onClick={() => alert("Forgot your password? Enter your email and we'll send a reset link (demo).")}
                    className="text-accent hover:underline text-sm"
                  >
                    Forgot password?
                  </button>
                </div>

                <button
                  type="submit"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsLoggedIn(true);
                    setHasPaid(true);
                    setShowLogin(false);
                    alert("Logged in successfully! Welcome back.");
                  }}
                  className="w-full py-5 bg-accent hover:bg-emerald-600 text-black font-bold text-xl rounded-xl transition"
                >
                  Login
                </button>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
}

export default App;