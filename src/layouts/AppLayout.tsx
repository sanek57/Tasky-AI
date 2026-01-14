// Node Modules
import { Outlet, useNavigation } from 'react-router'
import { SidebarProvider } from '@/components/ui/sidebar'

// Components
import { AppSidebar } from '@/components/AppSidebar'
import { TooltipProvider } from '@/components/ui/tooltip'
import { Toaster } from '@/components/ui/sonner'

// Custom modules
import { cn } from '@/lib/utils'

export const AppLayout = () => {
  const navigation = useNavigation()
  const isLoading = navigation.state === 'loading' && !navigation.formData

  return (
    <>
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
    </>
  )
}
