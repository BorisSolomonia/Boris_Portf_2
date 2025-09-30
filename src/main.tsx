import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './styles/index.css'

const defaultTitle = 'Boris - Renaissance Fintech Visionary'
const defaultDescription = "Boris's Renaissance-inspired fintech portfolio - A visionary approach to financial technology and ERP solutions"

const appTitle = import.meta.env?.VITE_APP_TITLE ?? defaultTitle
const appDescription = import.meta.env?.VITE_APP_DESCRIPTION ?? defaultDescription

if (typeof document !== 'undefined') {
  if (appTitle) {
    document.title = appTitle
  }

  const descriptionMeta = document.querySelector('meta[name="description"]')
  if (descriptionMeta && appDescription) {
    descriptionMeta.setAttribute('content', appDescription)
  }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
