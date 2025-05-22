import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

const cssContext = import.meta.glob('./assets/*.css', { eager: true });
Object.values(cssContext); // Ensure all CSS is evaluated


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
