import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import emailjs from '@emailjs/browser';

emailjs.init("1Ay1s6EjozEEWRxbk"); // Replace with your actual public key

// Import react-slick CSS files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
