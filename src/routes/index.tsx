// node modules
import { createBrowserRouter } from 'react-router'

// Layouts
import { RootLayout } from '@/layouts/RootLayout'

// Pages
import { HomePage } from '@/pages/HomePage'
import { RegisterPage } from '@/pages/RegisterPage'

// Actions

// Loaders

// Error
import { RootErrorBoundary } from '@/pages/RootErrorBoundary'

// Types
import { type RouteObject } from 'react-router'

const rootRouteChildren: RouteObject[] = [
  {
    index: true,
    element: <HomePage />,
  },
  {
    path: 'register',
    element: <RegisterPage />,
  },
]

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <RootErrorBoundary />,
    children: rootRouteChildren,
  },
])
