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
  const [isSignup, setIsSignup] = useState(true);
  const [hasPaid, setHasPaid] = useState(false);     // Keep - passed to Hero
  const [userPlan, setUserPlan] = useState('basic');

  // Remove toggleFaq if not used yet
  // const [openFaq, setOpenFaq] = useState(null);

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
      alert("Payment recorded but sync failed. Contact support.");
    } else {
      setHasPaid(true);
      setUserPlan('pro');
      alert("✅ Account upgraded to Pro!");
    }
    setShowPayment(false);
  };

  return (
    <div className="min-h-screen bg-dark text-textLight">
      {/* Rest of your component remains the same */}
      <Navbar 
        onLoginClick={() => setShowLogin(true)}
        isLoggedIn={isLoggedIn}
        user={user}
        userPlan={userPlan}
        onDashboardClick={() => alert("Dashboard coming soon!")}
        onLogout={handleLogout}
      />

      <Hero onUnlockClick={() => setShowPayment(true)} />

      {/* Payment Modal and Login Modal stay the same as last version */}

      {/* ... Payment Modal ... */}
      {/* ... Login Modal ... */}

    </div>
  );
}

export default App;