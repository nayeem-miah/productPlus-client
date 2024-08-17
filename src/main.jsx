import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import router from './Route/Router'
import { RouterProvider } from 'react-router-dom'
import AuthProvider from './Providers/AuthProvider'
import { Toaster } from 'react-hot-toast';
import { HelmetProvider } from 'react-helmet-async'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <HelmetProvider>
        <RouterProvider router={router} />
      </HelmetProvider>
      <Toaster />
    </AuthProvider>
  </StrictMode>,
)