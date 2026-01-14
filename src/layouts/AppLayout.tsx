// Node Modules
import { Outlet } from 'react-router'
import { SidebarProvider } from '@/components/ui/sidebar'

// Components
import { AppSidebar } from '@/components/AppSidebar'
import { TooltipProvider } from '@/components/ui/tooltip'
import { Toaster } from '@/components/ui/sonner'

export const AppLayout = () => {
  return (
    <>
      <SidebarProvider>
        <TooltipProvider
          delayDuration={500}
          disableHoverableContent
        >
          <AppSidebar />

          <main className='flex-1'>
            <Outlet />
          </main>
        </TooltipProvider>
      </SidebarProvider>
      <Toaster position='top-center' />
    </>
  )
}
