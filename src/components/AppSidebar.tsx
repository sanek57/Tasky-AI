// Node Modules
import { Link } from 'react-router'

// Components
import {
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  Sidebar,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuBadge,
  SidebarGroupLabel,
  SidebarGroupAction,
} from '@/components/ui/sidebar'
import { Logo } from '@/components/Logo'
import { UserButton } from '@clerk/clerk-react'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'

// Assets
import { ChevronRight, CirclePlus, Plus } from 'lucide-react'

// Constants
import { SIDEBAR_LINKS } from '@/constants'

export const AppSidebar = () => {
  return (
    <Sidebar>
      <SidebarHeader>
        <Link
          to={'/app/inbox'}
          className='pt-2'
        >
          <Logo />
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {/* Task create */}
              <SidebarMenuItem>
                <SidebarMenuButton className='text-primary!'>
                  <CirclePlus /> Add task
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* Sidebar links */}
              {SIDEBAR_LINKS.map(item => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton asChild>
                    <Link to={item.href}>
                      <item.icon />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                  <SidebarMenuBadge>0</SidebarMenuBadge>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* All projects */}
        <Collapsible
          defaultOpen
          className='group/collapsible'
        >
          <SidebarGroup>
            <SidebarGroupLabel
              asChild
              className='text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
            >
              <CollapsibleTrigger>
                <ChevronRight className='me-2 transition-transform group-data-[state=open]/collapsible:rotate-90' />
                Projects
              </CollapsibleTrigger>
            </SidebarGroupLabel>

            {/* Tooltip */}
            <Tooltip
              disableHoverableContent
              delayDuration={500}
            >
              <TooltipTrigger asChild>
                <SidebarGroupAction aria-label='Add project'>
                  <Plus />
                </SidebarGroupAction>
              </TooltipTrigger>
              <TooltipContent
                side='right'
                className='bg-primary text-foreground'
              >
                Add project
              </TooltipContent>
            </Tooltip>

            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <p className='text-muted-foreground text-sm p-2'>
                      Click + to add some projects
                    </p>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>
      </SidebarContent>

      <SidebarFooter>
        <UserButton
          showName
          appearance={{
            elements: {
              rootBox: 'w-full!',
              userButtonTrigger:
                'shadow-none! w-full! justify-start! p-2! rounded-md! hover:bg-sidebar-accent!',
              userButtonBox: 'flex-row-reverse! shadow-none! gap-2!',
              userButtonOuterIdentifier: 'ps-0!',
              popoverBox: 'pointer-events-auto!',
            },
          }}
        />
      </SidebarFooter>
    </Sidebar>
  )
}
