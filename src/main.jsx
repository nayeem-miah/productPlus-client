import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <h3 className='text-rose-400 btn'>text</h3>
  </StrictMode>,
)
