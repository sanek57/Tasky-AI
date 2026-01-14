// Node Modules
import { Outlet } from 'react-router'
import { SidebarProvider } from '@/components/ui/sidebar'

// Components
import { AppSidebar } from '@/components/AppSidebar'
import { TooltipProvider } from '@/components/ui/tooltip'

export const AppLayout = () => {
  return (
    <SidebarProvider>
      <TooltipProvider>
        <AppSidebar />

        <main className='flex-1'>
          <Outlet />
        </main>
      </TooltipProvider>
    </SidebarProvider>
  )
}
