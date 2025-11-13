// Node Modules
import { Outlet } from 'react-router'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'

// Components
import { AppSidebar } from '@/components/AppSidebar'
import { TooltipProvider } from '@/components/ui/tooltip'

export const AppLayout = () => {
  return (
    <SidebarProvider>
      <TooltipProvider>
        <AppSidebar />
        <SidebarTrigger />
        <div className=''>AppLayout</div>
        <Outlet />
      </TooltipProvider>
    </SidebarProvider>
  )
}
