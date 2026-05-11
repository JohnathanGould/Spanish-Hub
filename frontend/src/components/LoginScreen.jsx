import React, { useState } from 'react';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../firebase';

export default function LoginScreen({ onGuest }) {
  const [loading, setLoading] = useState(false);
  const handleSignIn = async () => {
    setLoading(true);
    try { await signInWithPopup(auth, googleProvider); }
    catch (e) { console.error(e); setLoading(false); }
  };
  return (
    <div className="app-outer">
      <div className="app-container flex items-center justify-center p-6">
        <div className="login-glass max-w-sm w-full text-center overflow-hidden">

          {/* Milo banner — full width hero image */}
          <div className="w-full">
            <img
              src="/milo-banner.jpg"
              alt="Milo Speaks Spanish"
              className="w-full object-cover"
              style={{ maxHeight: '200px', objectPosition: 'center' }}
            />
          </div>

          <div className="p-8 pt-6">
            <h1 className="font-serif text-3xl font-bold mb-2" style={{ color: 'hsl(var(--foreground))' }}>
              Milo Speaks Spanish
            </h1>
            <p className="text-sm mb-2" style={{ color: 'hsl(var(--muted-foreground))' }}>
              Learn · Practice · Master
            </p>
            <p className="text-sm mb-8" style={{ color: 'hsl(var(--muted-foreground))' }}>
              Sign in to track your mastery, unlock streaks, and save your progress.
            </p>

            <button
              data-testid="google-signin-btn"
              onClick={handleSignIn}
              disabled={loading}
              className="w-full py-3 px-6 rounded-xl font-semibold text-base transition-all duration-200 mb-3"
              style={{ background: 'hsl(var(--primary))', color: 'white', boxShadow: '0 4px 14px rgba(198,11,30,0.35)' }}
            >
              {loading ? 'Signing in…' : 'Sign in with Google'}
            </button>

            <button
              data-testid="guest-continue-btn"
              onClick={onGuest}
              className="w-full py-2.5 px-6 rounded-xl font-medium text-sm transition-all border"
              style={{ background: 'transparent', color: 'hsl(var(--muted-foreground))', borderColor: 'hsl(var(--border))' }}
            >
              Continue as guest
            </button>

            <p className="text-xs mt-4" style={{ color: 'hsl(var(--muted-foreground))' }}>
              15 drills · 14 lessons · 300+ words · Free to learn 🐾
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
