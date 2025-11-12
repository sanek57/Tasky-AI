// node modules
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router'

// CSS link
import './index.css'

// Routes
import { router } from './routes'

createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />,
)
