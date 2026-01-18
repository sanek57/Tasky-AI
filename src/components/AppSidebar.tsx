// Node Modules
import { Link, useLoaderData, useLocation } from 'react-router'

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
  useSidebar,
  SidebarMenuAction,
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
import { TaskFormDialog } from './TaskFormDialog'
import { ProjectFormDialog } from './ProjectFormDialog'

// Assets
import {
  ChevronRight,
  CirclePlus,
  Hash,
  MoreHorizontal,
  Plus,
} from 'lucide-react'

// Constants
import { SIDEBAR_LINKS } from '@/constants'

// Hooks
import { useProjectContext } from '@/hooks/useProjectContext'
import { ProjectActionMenu } from './ProjectActionMenu'

// Types
import type { AppLoaderData } from '@/routes/loaders/appLoader'

export const AppSidebar = () => {
  const location = useLocation()
  const { isMobile, setOpenMobile } = useSidebar()
  const projects = useProjectContext()

  const { taskCounts } = useLoaderData() as AppLoaderData

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
                <TaskFormDialog>
                  <SidebarMenuButton className='text-primary!'>
                    <CirclePlus /> Add task
                  </SidebarMenuButton>
                </TaskFormDialog>
              </SidebarMenuItem>

              {/* Sidebar links */}
              {SIDEBAR_LINKS.map(item => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={location.pathname === item.href}
                    onClick={() => {
                      if (isMobile) setOpenMobile(false) // автоскрытие на маленьких экранах
                    }}
                  >
                    <Link to={item.href}>
                      <item.icon />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                  {/* Show tasks count in inbox menu items */}
                  {item.href === '/app/inbox' && taskCounts.inboxTasks && (
                    <SidebarMenuBadge>{taskCounts.inboxTasks}</SidebarMenuBadge>
                  )}
                  {item.href === '/app/today' && taskCounts.todayTasks && (
                    <SidebarMenuBadge>{taskCounts.todayTasks}</SidebarMenuBadge>
                  )}
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

            {/* Tooltip - Project create button*/}
            <Tooltip
              disableHoverableContent
              delayDuration={500}
            >
              <ProjectFormDialog method='POST'>
                <TooltipTrigger asChild>
                  <SidebarGroupAction aria-label='Add project'>
                    <Plus />
                  </SidebarGroupAction>
                </TooltipTrigger>
              </ProjectFormDialog>
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
                  {projects?.rows
                    ?.slice(0, 5)
                    .map(({ $id, name, color_name, color_hex }) => (
                      <SidebarMenuItem key={$id}>
                        <SidebarMenuButton
                          asChild
                          isActive={
                            location.pathname === `/app/projects/${$id}`
                          }
                          onClick={() => {
                            if (isMobile) setOpenMobile(false)
                          }}
                        >
                          <Link to={`/app/projects/${$id}`}>
                            <Hash color={color_hex} />
                            <span>{name}</span>
                          </Link>
                        </SidebarMenuButton>
                        <ProjectActionMenu
                          defaultFormData={{
                            id: $id,
                            name,
                            color_name,
                            color_hex,
                          }}
                        >
                          <SidebarMenuAction
                            aria-label='More actions'
                            showOnHover
                            className='bg-sidebar-accent'
                          >
                            <MoreHorizontal />
                          </SidebarMenuAction>
                        </ProjectActionMenu>
                      </SidebarMenuItem>
                    ))}

                  {projects !== null && projects.total > 5 && (
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        asChild
                        className='text-muted-foreground'
                        isActive={location.pathname === '/app/projects'}
                        onClick={() => {
                          if (isMobile) setOpenMobile(false)
                        }}
                      >
                        <Link to={`/app/projects`}>
                          <MoreHorizontal /> All projects
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )}

                  {!projects?.total && (
                    <SidebarMenuItem>
                      <p className='text-muted-foreground text-sm p-2'>
                        Click + to add some projects
                      </p>
                    </SidebarMenuItem>
                  )}
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
