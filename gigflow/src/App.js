// src/App.js
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import { supabase, getProfile, updatePaidStatus } from './lib/supabase';

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  
  const [user, setUser] = useState(null);
  const [isSignup, setIsSignup] = useState(true);
  const [hasPaid, setHasPaid] = useState(false);
  const [userPlan, setUserPlan] = useState('basic');

  // Auth + Profile Listener
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        const currentUser = session?.user ?? null;
        setUser(currentUser);

        if (currentUser) {
          const { data } = await getProfile(currentUser.id);
          if (data) {
            setHasPaid(data.has_paid || false);
            setUserPlan(data.plan || 'basic');
          }
        } else {
          setHasPaid(false);
          setUserPlan('basic');
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const isLoggedIn = !!user;
  const hasFullAccess = isLoggedIn && hasPaid;

  const handleSignUp = async (email, password) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: window.location.origin }
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

  const handlePaymentSuccess = async () => {
    if (!user) return alert("Please log in first");
    
    const { error } = await updatePaidStatus(user.id, true, 'pro');
    if (error) {
      alert("Payment recorded but sync failed.");
    } else {
      setHasPaid(true);
      setUserPlan('pro');
      alert("✅ Account upgraded to Pro! Refresh if needed.");
    }
    setShowPayment(false);
  };

  return (
    <div className="min-h-screen bg-dark text-textLight">
      <Navbar 
        onLoginClick={() => setShowLogin(true)}
        isLoggedIn={isLoggedIn}
        user={user}
        userPlan={userPlan}
        onDashboardClick={() => alert("Dashboard coming soon!")}
        onLogout={handleLogout}
      />

      <Hero 
        onUnlockClick={() => setShowPayment(true)} 
        isLoggedIn={isLoggedIn} 
        hasPaid={hasPaid} 
      />

      {/* === PUBLIC SECTIONS (Visible to everyone) === */}
      {/* Features, How it Works, Testimonials, FAQ, etc. */}

      {/* === PROTECTED CONTENT (Only for Paid Users) === */}
      {hasFullAccess ? (
        <div className="py-20 bg-slate-950">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold mb-6">🎉 Welcome to Full Access!</h2>
            <p className="text-xl text-slate-300">You now have Pro access. All gigs and tools are unlocked.</p>
            
            {/* Put your main GigFlow content / Dashboard here */}
            <div className="mt-12 bg-slate-900 p-10 rounded-2xl">
              <h3 className="text-2xl mb-4">Your Gig Leads Dashboard</h3>
              <p className="text-slate-400">Real gig data and tools will appear here...</p>
              {/* Add your main app content here */}
            </div>
          </div>
        </div>
      ) : isLoggedIn ? (
        <div className="py-20 text-center">
          <h2 className="text-3xl font-bold mb-4">Upgrade Required</h2>
          <p className="text-slate-400 mb-8">You are logged in but need to complete payment for full access.</p>
          <button 
            onClick={() => setShowPayment(true)}
            className="bg-accent text-black px-10 py-4 rounded-xl font-bold text-lg"
          >
            Upgrade to Pro Now
          </button>
        </div>
      ) : null}

      {/* Payment Modal */}
      {showPayment && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 px-4">
          <div className="bg-slate-900 rounded-2xl p-8 md:p-10 max-w-lg w-full relative">
            <button onClick={() => setShowPayment(false)} className="absolute top-4 right-6 text-3xl text-slate-400 hover:text-white">×</button>
            <h2 className="text-3xl font-bold text-center mb-8">Upgrade Your Access</h2>
            
            <div className="space-y-4">
              <a href="https://nowpayments.io/payment/?iid=6382545246" target="_blank" rel="noopener noreferrer" className="block w-full py-5 px-6 bg-slate-800 hover:bg-slate-700 rounded-xl text-center">Basic — $19</a>
              <a href="https://nowpayments.io/payment/?iid=6313323438" target="_blank" rel="noopener noreferrer" className="block w-full py-6 px-6 bg-gradient-to-r from-indigo-600 to-indigo-800 rounded-xl text-center font-bold">Pro — $49 (Recommended)</a>
              <a href="https://nowpayments.io/payment/?iid=5061273629" target="_blank" rel="noopener noreferrer" className="block w-full py-5 px-6 bg-slate-800 hover:bg-slate-700 rounded-xl text-center">Elite — $99</a>
            </div>

            <div className="mt-10 text-center">
              <button onClick={handlePaymentSuccess} className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 rounded-xl font-semibold">
                ✅ I Have Completed Payment – Activate
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Login Modal - (same as before) */}
      {showLogin && (
        /* Keep your existing login modal code here */
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 px-4">
          {/* ... your full login modal ... */}
        </div>
      )}
    </div>
  );
}

export default App;