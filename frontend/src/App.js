import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import SpanishHub from './SpanishHub';
import AdminPanel from './components/AdminPanel';

function App() {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u ?? null));
    return unsub;
  }, []);

  if (user === undefined) return null;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SpanishHub />} />
        <Route path="/admin" element={<AdminPanel user={user} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
