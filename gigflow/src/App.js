// src/App.js
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import { supabase, getProfile, updatePaidStatus } from './lib/supabase';

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  
  // Auth & Profile State
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSignup, setIsSignup] = useState(true);

  const [hasPaid, setHasPaid] = useState(false);
  const [userPlan, setUserPlan] = useState('basic');

  // FAQ State (adjust as needed for your existing FAQ)
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  // Load auth + profile
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        const currentUser = session?.user ?? null;
        setUser(currentUser);

        if (currentUser) {
          await loadUserProfile(currentUser);
        } else {
          setHasPaid(false);
          setUserPlan('basic');
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const loadUserProfile = async (currentUser) => {
    if (!currentUser) return;
    
    const { data, error } = await getProfile(currentUser.id);
    if (data) {
      setHasPaid(data.has_paid || false);
      setUserPlan(data.plan || 'basic');
    } else if (error) {
      console.error("Profile load error:", error);
    }
  };

  const isLoggedIn = !!user;

  // Auth Handlers
  const handleSignUp = async (email, password) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: window.location.origin },
    });

    if (error) alert(error.message);
    else {
      alert("Check your email for the confirmation link!");
      setShowLogin(false);
    }
  };

  const handleLogin = async (email, password) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) alert(error.message);
    else setShowLogin(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setHasPaid(false);
    setUserPlan('basic');
  };

  // Payment Success - Sync to Supabase
  const handlePaymentSuccess = async (paymentId = null) => {
    if (!user) {
      alert("Please log in first.");
      return;
    }

    const { error } = await updatePaidStatus(user.id, true, 'pro', paymentId);
    
    if (error) {
      console.error("Payment sync error:", error);
      alert("Payment recorded, but profile update failed. Contact support.");
    } else {
      setHasPaid(true);
      setUserPlan('pro');
      alert("✅ Payment successful! Your account has been upgraded to Pro.");
    }
    
    setShowPayment(false);
  };

  return (
    <div className="min-h-screen bg-dark text-textLight">
      {/* Navbar */}
      <Navbar 
        onLoginClick={() => setShowLogin(true)}
        isLoggedIn={isLoggedIn}
        user={user}
        userPlan={userPlan}
        onDashboardClick={() => alert("Full dashboard coming soon!")}
        onLogout={handleLogout}
      />

      {/* Hero Section */}
      <Hero 
        onUnlockClick={() => setShowPayment(true)} 
        isLoggedIn={isLoggedIn}
        hasPaid={hasPaid}
      />

      {/* === Your existing sections go here === */}
      {/* Features, Pricing, How it Works, Testimonials, FAQ, Footer, etc. */}

      {/* Example: Keep your FAQ section and other components unchanged */}

      {/* Payment Modal */}
      {showPayment && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 px-4">
          <div className="bg-slate-900 rounded-2xl p-8 md:p-10 max-w-lg w-full relative">
            <button
              onClick={() => setShowPayment(false)}
              className="absolute top-4 right-6 text-3xl text-slate-400 hover:text-white"
            >
              ×
            </button>

            <h2 className="text-3xl font-bold mb-2 text-center">Upgrade Your Plan</h2>
            <p className="text-center text-slate-400 mb-8">
              One-time payment via cryptocurrency
            </p>

            <div className="space-y-4">
              {/* Update these links with your actual NOWPayments links */}
              <a 
                href="https://nowpayments.io/payment/?iid=6382545246" 
                target="_blank" 
                rel="noopener noreferrer"
                onClick={() => setShowPayment(false)}
                className="block w-full py-5 px-6 bg-slate-800 hover:bg-slate-700 rounded-xl text-center transition"
              >
                Basic Plan — $19
              </a>

              <a 
                href="https://nowpayments.io/payment/?iid=6313323438" 
                target="_blank" 
                rel="noopener noreferrer"
                onClick={() => setShowPayment(false)}
                className="block w-full py-6 px-6 bg-gradient-to-r from-indigo-600 to-indigo-800 hover:from-indigo-700 rounded-xl text-center transition font-bold"
              >
                Pro Plan — $49 (Recommended)
              </a>

              <a 
                href="https://nowpayments.io/payment/?iid=5061273629" 
                target="_blank" 
                rel="noopener noreferrer"
                onClick={() => setShowPayment(false)}
                className="block w-full py-5 px-6 bg-slate-800 hover:bg-slate-700 rounded-xl text-center transition"
              >
                Elite Plan — $99
              </a>
            </div>

            {/* Manual Activation */}
            <div className="mt-10 pt-6 border-t border-slate-700 text-center">
              <p className="text-sm text-slate-400 mb-3">Already paid?</p>
              <button
                onClick={handlePaymentSuccess}
                className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 rounded-xl font-semibold text-white"
              >
                ✅ I Have Completed Payment – Activate My Account
              </button>
              <p className="text-xs text-slate-500 mt-3">
                This will update your profile instantly
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Login / Signup Modal */}
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
              {isLoggedIn ? "My Account" : isSignup ? "Create Account" : "Welcome Back"}
            </h2>

            {!isLoggedIn && (
              <div className="flex mb-8 border-b border-slate-700">
                <button
                  onClick={() => setIsSignup(true)}
                  className={`flex-1 py-3 font-medium transition ${
                    isSignup ? "text-accent border-b-2 border-accent" : "text-slate-400"
                  }`}
                >
                  Sign Up
                </button>
                <button
                  onClick={() => setIsSignup(false)}
                  className={`flex-1 py-3 font-medium transition ${
                    !isSignup ? "text-accent border-b-2 border-accent" : "text-slate-400"
                  }`}
                >
                  Login
                </button>
              </div>
            )}

            {isLoggedIn ? (
              <div className="text-center py-8 space-y-6">
                <p>Welcome, <strong>{user.email}</strong></p>
                <p className="text-accent">Plan: <strong>{userPlan.toUpperCase()}</strong></p>
                <button
                  onClick={handleLogout}
                  className="w-full py-4 bg-red-600 hover:bg-red-700 rounded-xl font-medium"
                >
                  Logout
                </button>
              </div>
            ) : isSignup ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSignUp(e.target.email.value, e.target.password.value);
                }}
                className="space-y-6"
              >
                <div>
                  <label className="block text-sm text-slate-300 mb-2">Email</label>
                  <input name="email" type="email" required className="w-full p-4 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500" placeholder="you@example.com" />
                </div>
                <div>
                  <label className="block text-sm text-slate-300 mb-2">Password</label>
                  <input name="password" type="password" required className="w-full p-4 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500" placeholder="••••••••" />
                </div>
                <button type="submit" className="w-full py-5 bg-accent hover:bg-emerald-600 text-black font-bold rounded-xl">
                  Create Account
                </button>
              </form>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleLogin(e.target.email.value, e.target.password.value);
                }}
                className="space-y-6"
              >
                <div>
                  <label className="block text-sm text-slate-300 mb-2">Email</label>
                  <input name="email" type="email" required className="w-full p-4 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500" placeholder="you@example.com" />
                </div>
                <div>
                  <label className="block text-sm text-slate-300 mb-2">Password</label>
                  <input name="password" type="password" required className="w-full p-4 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500" placeholder="••••••••" />
                </div>
                <button type="submit" className="w-full py-5 bg-accent hover:bg-emerald-600 text-black font-bold rounded-xl">
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