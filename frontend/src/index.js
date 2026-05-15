import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { playTap } from "./utils/helpers";
import posthog from 'posthog-js';

posthog.init(process.env.REACT_APP_POSTHOG_KEY, {
  api_host: 'https://us.i.posthog.com',
  session_recording: { enabled: true },
});

// Global tap sound on every button
document.addEventListener('click', (e) => {
  if (e.target.closest('button')) playTap();
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

// Register service worker for PWA / offline support (production only)
if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js').catch((err) => {
      console.warn('SW registration failed:', err);
    });
  });
}