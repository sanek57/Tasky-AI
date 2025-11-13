// node modules
import { createBrowserRouter } from 'react-router'

// Layouts
import { RootLayout } from '@/layouts/RootLayout'
import { AppLayout } from '@/layouts/AppLayout'

// Pages
import { HomePage } from '@/pages/HomePage'
import { RegisterPage } from '@/pages/RegisterPage'
import { LoginPage } from '@/pages/LoginPage'
import { AuthSyncPage } from '@/pages/AuthSyncPage'

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
  {
    path: 'login',
    element: <LoginPage />,
  },
  {
    path: 'auth-sync',
    element: <AuthSyncPage />,
  },
]

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <RootErrorBoundary />,
    children: rootRouteChildren,
  },
  {
    path: '/app',
    element: <AppLayout />,
  },
])
