import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import AuthDataProvider from './Context/AuthDataProvider'
import { router } from './router/router'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthDataProvider>
      <RouterProvider router={router} />
    </AuthDataProvider>
  </StrictMode>,
)
