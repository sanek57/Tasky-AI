// Node Modules
import { Outlet, useLoaderData, useNavigation } from 'react-router'
import { SidebarProvider } from '@/components/ui/sidebar'

// Components
import { AppSidebar } from '@/components/AppSidebar'
import { TooltipProvider } from '@/components/ui/tooltip'
import { Toaster } from '@/components/ui/sonner'

// Custom modules
import { cn } from '@/lib/utils'
import {
  ProjectContextProvider,
} from '@/components/ProjectContextProvider'
import type { AppLoaderData } from '@/routes/loaders/appLoader'

export const AppLayout = () => {
  const navigation = useNavigation()
  const isLoading = navigation.state === 'loading' && !navigation.formData

  const { projects } = useLoaderData<AppLoaderData>()

  return (
    <>
      <ProjectContextProvider project={projects}>
        <SidebarProvider>
          <TooltipProvider
            delayDuration={500}
            disableHoverableContent
          >
            <AppSidebar />

            <main
              className={cn(
                'flex-1 transition-opacity',
                isLoading && 'opacity-50 pointer-events-none',
              )}
            >
              <Outlet />
            </main>
          </TooltipProvider>
        </SidebarProvider>
        <Toaster position='top-center' />
      </ProjectContextProvider>
    </>
  )
}
