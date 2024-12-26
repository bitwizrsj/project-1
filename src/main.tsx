import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import emailjs from '@emailjs/browser';

emailjs.init("1Ay1s6EjozEEWRxbk"); // Replace with your actual public key


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
