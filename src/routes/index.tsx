// node modules
import { createBrowserRouter } from 'react-router'

// Layouts
import { RootLayout } from '@/layouts/RootLayout'

// Pages
import { HomePage } from '@/pages/HomePage'

// Actions

// Loaders

// Error

// Types
import { type RouteObject } from 'react-router'

const rootRouteChildren: RouteObject[] = [
  {
    index: true,
    element: <HomePage />,
  },
]

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <span>404. You bad boy. Yooups...</span>,
    children: rootRouteChildren,
  },
])
