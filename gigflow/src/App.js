// src/App.js
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import { supabase, getProfile, updatePaidStatus } from './lib/supabase';

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  
  // Auth & Profile
  const [user, setUser] = useState(null);
  const [isSignup, setIsSignup] = useState(true);
  const [hasPaid, setHasPaid] = useState(false);
  const [userPlan, setUserPlan] = useState('basic');

  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  // Auth listener
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

  const handleSignUp = async (email, password) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: window.location.origin }
    });
    if (error) alert(error.message);
    else {
      alert("Check your email for confirmation link!");
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
      alert("Payment recorded but sync failed. Contact support.");
    } else {
      setHasPaid(true);
      setUserPlan('pro');
      alert("✅ Account upgraded to Pro!");
    }
    setShowPayment(false);
  };

  // Keep your original FAQ items here (copy from your previous App.js)

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

      <Hero onUnlockClick={() => setShowPayment(true)} />

      {/* Your existing Pricing, Features, How it Works, FAQ sections stay here */}

      {/* Payment Modal */}
      {showPayment && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 px-4">
          <div className="bg-slate-900 rounded-2xl p-8 max-w-lg w-full relative">
            <button onClick={() => setShowPayment(false)} className="absolute top-4 right-6 text-3xl">×</button>
            
            <h2 className="text-3xl font-bold text-center mb-8">Upgrade Your Access</h2>
            
            {/* Your payment links */}
            <div className="space-y-4">
              <a href="https://nowpayments.io/..." target="_blank" className="block py-5 bg-slate-800 hover:bg-slate-700 rounded-xl text-center">Basic - $19</a>
              <a href="https://nowpayments.io/..." target="_blank" className="block py-6 bg-gradient-to-r from-indigo-600 to-indigo-800 rounded-xl text-center font-bold">Pro - $49</a>
              <a href="https://nowpayments.io/..." target="_blank" className="block py-5 bg-slate-800 hover:bg-slate-700 rounded-xl text-center">Elite - $99</a>
            </div>

            <div className="mt-10 text-center">
              <button
                onClick={handlePaymentSuccess}
                className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 rounded-xl font-semibold"
              >
                ✅ I Have Paid – Activate Account
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Login Modal - (same as before) */}
      {showLogin && ( /* ... your login modal code ... */ )}

    </div>
  );
}

export default App;