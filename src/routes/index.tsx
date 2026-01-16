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
import { InboxPage } from '@/pages/InboxPage'
import { TodayTaskPage } from '@/pages/TodayTaskPage'
import { CompletedTaskPage } from '@/pages/CompletedTaskPage'
import { UpcomingTaskPage } from '@/pages/UpcomingTaskPage'
import { ProjectsPage } from '@/pages/ProjectsPage'

// Actions
import { appAction } from '@/routes/actions/appAction'
import { projectAction } from './actions/projectAction'

// Loaders
import { inboxTaskLoader } from '@/routes/loaders/inboxLoader'
import { todayTaskLoader } from './loaders/todayTaskLoader'
import { upcomingTaskLoader } from './loaders/upcomingTaskLoader'
import { completedTaskLoader } from './loaders/completedTaskLoader'
import { projectsLoader } from './loaders/projectsLoader'

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

const appRouteChildren: RouteObject[] = [
  {
    path: 'inbox',
    element: <InboxPage />,
    loader: inboxTaskLoader,
  },
  {
    path: 'today',
    element: <TodayTaskPage />,
    loader: todayTaskLoader,
  },
  {
    path: 'upcoming',
    element: <UpcomingTaskPage />,
    loader: upcomingTaskLoader,
  },
  {
    path: 'completed',
    element: <CompletedTaskPage />,
    loader: completedTaskLoader,
  },{
    path: 'projects',
    element: <ProjectsPage/>,
    action: projectAction,
    loader: projectsLoader
  }
]

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <RootErrorBoundary />,
    children: rootRouteChildren,
    loader: async () => {
      await new Promise(r => {
        setTimeout(r, 1000)
      })
    },
  },
  {
    path: '/app',
    element: <AppLayout />,
    children: appRouteChildren,
    action: appAction,
  },
])
