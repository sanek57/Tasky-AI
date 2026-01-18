// Node modules
import React, { type FC } from 'react'

// Components
import {
  DropdownMenuContent,
  type DropdownMenuProps,
} from '@radix-ui/react-dropdown-menu'
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { ProjectFormDialog } from './ProjectFormDialog'
import { Button } from './ui/button'
import { ProjectDeleteButton } from './ProjectDeleteButton'

// Assets
import { Edit } from 'lucide-react'

// Types
import type { Project } from '@/types'

interface ProjectActionMenuProps extends DropdownMenuProps {
  defaultFormData: Project
}

export const ProjectActionMenu: FC<ProjectActionMenuProps> = ({
  children,
  defaultFormData,
  ...props
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent {...props} className='z-20'>
        <DropdownMenuItem asChild>
          <ProjectFormDialog
            method='PUT'
            defaultFormData={defaultFormData}
          >
            <Button
              variant='ghost'
              size='sm'
              className='w-full justify-start px-2'
            >
              <Edit /> Edit
            </Button>
          </ProjectFormDialog>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <ProjectDeleteButton defaultFormData={defaultFormData}/>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
